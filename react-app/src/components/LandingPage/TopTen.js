import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './LandingPage.css'

export default function TopTen ({ isLoaded }) {
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [topTen, setTopTen] = useState([])

  useEffect(() => {
    async function fetchData () {
      const topTenResults = await fetch(`/api/dougscores/topten`)
      const data = await topTenResults.json()
      if (data.errors) {
        setErrors(data.errors)
      } else {
        setTopTen(data)
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
        <span className='title'>Top Ten</span>&nbsp;&nbsp;
        <i style={{ fontSize: `32px` }} className='fa-solid fa-angle-right' />
      </div>
      <div style={{ margin: `.5rem 0 1rem 0` }} className='mid-grey'>
        Cars with the highest total Dougscore.
      </div>
      <Slider {...settings}>
        {topTen?.top_ten?.map((top, idx) => {
          return (
            <div key={idx}>
              <div className='list-card-container light-border-radius'>
                <div className='list-card-img'>
                  <a href={`/vehicles/${top?.vehicle?.id}`}>
                    <img
                      style={{
                        width: `9.5rem`,
                        height: `14rem`,
                        objectFit: `cover`
                      }}
                      src={top?.vehicle?.images[1]?.image_url}
                      alt={top?.vehicle?.model}
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
                      &nbsp;{top?.dougscore_total}
                    </span>
                    <span>
                      <span style={{ fontSize: `12px` }}>#</span>
                      <span style={{ fontSize: `18px` }}>{idx + 1}</span>
                    </span>
                  </div>
                  <div className='list-card-title'>
                    <span>
                      {top?.vehicle?.make} {top?.vehicle?.model}
                    </span>
                  </div>
                  <div className='list-card-bottom'>
                    <div>
                      <a href={top?.vehicle?.dougscore?.video_link}>
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
                          history.push(`/vehicles/${top?.vehicle?.id}`)
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
