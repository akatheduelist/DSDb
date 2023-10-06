import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './LandingPage.css'

export default function Fastest ({ isLoaded }) {
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [fastest, setFastest] = useState([])

  useEffect(() => {
    async function fetchData () {
      const fastestResults = await fetch(`/api/dougscores/fastest`)
      const data = await fastestResults.json()
      if (data.errors) {
        setErrors(data.errors)
      } else {
        setFastest(data)
      }
    }
    fetchData()
  }, [])

  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: true
  }

  return (
    <div className='list-card'>
      <div style={{ display: `inline-flex`, alignItems: `center` }}>
        <span className='title green-text mid-bold'>|</span>&nbsp;
        <span className='title'>Zoom Zoom</span>&nbsp;&nbsp;
        <i
          style={{ fontSize: `32px` }}
          className='fa-solid fa-angle-right'
        />{' '}
      </div>
      <div style={{ margin: `.5rem 0 1rem 0` }} className='mid-grey'>
        These cars have the highest acceleration rating out of any vehicle
        revied.
      </div>
      <Slider {...settings}>
        {fastest?.fastest?.map((fast, idx) => {
          return (
            <div key={idx}>
              <div className='list-card-container light-border-radius'>
                <div className='list-card-img'>
                  <a href={`/vehicles/${fast?.vehicle?.id}`}>
                    <img
                      style={{
                        width: `9.5rem`,
                        height: `14rem`,
                        objectFit: `cover`
                      }}
                      src={fast?.vehicle?.images[1]?.image_url}
                      alt={fast?.vehicle?.model}
                    />
                  </a>
                </div>
                <div className='list-card-text'>
                  <div className='list-card-top'>
                    <span>
                      <i
                        style={{ fontSize: `14px` }}
                        className='green-text fa-solid fa-star'
                      />
                      &nbsp;{fast?.dougscore_total}
                    </span>
                    <span>
                      <span style={{ fontSize: `12px` }}>#</span>
                      <span style={{ fontSize: `18px` }}>{idx + 1}</span>
                    </span>
                  </div>
                  <div className='list-card-title'>
                    <span>
                      {fast?.vehicle?.make} {fast?.vehicle?.model}
                    </span>
                  </div>
                  <div className='list-card-bottom'>
                    <div>
                      <a href={fast?.vehicle?.dougscore?.video_link}>
                        <i
                          style={{ fontSize: `14px` }}
                          className='white-text fa-solid fa-play'
                        />
                        &nbsp;Review
                      </a>
                    </div>
                    <div>
                      <i
                        onClick={() =>
                          history.push(`/vehicles/${fast?.vehicle?.id}`)
                        }
                        className='cursor-pointer fa-solid fa-circle-info'
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
