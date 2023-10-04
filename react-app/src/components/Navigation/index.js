import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import logo from '../../images/dsdb_logo.svg'

function Navigation ({ isLoaded }) {
    const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  const [search, setSearch] = useState('')

  const handleSearch = async e => {
    e.preventDefault()
    const result = await fetch('/api/vehicles/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search
      })
    })
    const data = await result.json()
    if (data.errors) {
        window.alert(data.errors)
    } else {
        history.push({pathname: '/search', state: { search: data }})
    }
  }

  return (
    <nav className='nav-bar'>
      <div className='nav-bar-content'>
        <span>
          <a href='/'>
            <img className='nav-bar-logo' src={logo} alt='DSDb logo' />
          </a>
        </span>
        <span
          onClick={() => window.alert('Feature coming soon...')}
          className='hover-background cursor-pointer border-radius'
          style={{ padding: `8px 16px`, fontSize: `15px` }}
        >
          <i className='fa-solid fa-bars' /> Menu
        </span>
        <div className='nav-bar-search-container'>
          <form className='nav-bar-search' onSubmit={handleSearch}>
            <input
              className='nav-bar-search-input'
              placeholder='Search DSDb'
              name='searched'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className='nav-bar-search-button' type='submit'><i className="fa-solid fa-magnifying-glass" /></button>
          </form>
        </div>
        <span
          onClick={() => window.alert('Feature coming soon...')}
          className='hover-background cursor-pointer border-radius'
          style={{
            padding: `8px 16px`,
            fontSize: `17px`,
            fontFamily: `impact`
          }}
        >
          DSDb<span className='green-text'>Pro</span>
        </span>
        <div className='nav-bar-separator'></div>
        <div>
          <span
            onClick={() => window.alert('Feature coming soon...')}
            className='hover-background cursor-pointer border-radius'
            style={{ padding: `8px 16px`, fontSize: `15px` }}
          >
            <i className='fa-solid fa-bookmark' />
            {'  '}Watchlist
          </span>
        </div>
        <div className='nav-bar-user'>
          <ul>
            {isLoaded && sessionUser ? (
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            ) : (
              <span
                className='hover-background cursor-pointer border-radius'
                style={{ padding: `8px 16px`, fontSize: `15px` }}
              >
                <NavLink to='/login' className='white-text'>
                  Sign In
                </NavLink>
              </span>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
