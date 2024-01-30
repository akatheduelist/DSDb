import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './LandingPage.css'

export default function Coolest ({ isLoaded }) {
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [coolest, setCoolest] = useState([])

  useEffect(() => {
    async function fetchData () {
      const coolestResults = await fetch(`/api/dougscores/coolest`)
      const data = await coolestResults.json()
      if (data.errors) {
        setErrors(data.errors)
      } else {
        setCoolest(data)
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
    <div className='w-full'>
      <div className="inline-flex items-center">
        <span className='text-3xl font-medium'>Ice Cold</span>&nbsp;&nbsp;
        <i
          style={{ fontSize: `32px` }}
          className='fa-solid fa-angle-right'
        />{' '}
      </div>
      <div style={{ margin: `.5rem 0 1rem 0` }} className='mid-grey'>
        Whats cooler than being cool? These cars have the highest coolfactor
        rating.
      </div>
      <Slider {...settings}>
        {coolest?.coolest?.map((cool, idx) => {
          return (
            <div key={idx}>
              <div className='list-card-container light-border-radius'>
                <div className='list-card-img'>
                  <a href={`/vehicles/${cool?.vehicle?.id}`}>
                    <img
                      style={{
                        width: `9.5rem`,
                        height: `14rem`,
                        objectFit: `cover`
                      }}
                      src={cool?.vehicle?.images[1]?.image_url}
                      alt={cool?.vehicle?.model}
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
                      &nbsp;{cool?.dougscore_total}
                    </span>
                    <span>
                      <span style={{ fontSize: `12px` }}>#</span>
                      <span style={{ fontSize: `18px` }}>{idx + 1}</span>
                    </span>
                  </div>
                  <div className='list-card-title'>
                    <span>
                      {cool?.vehicle?.make} {cool?.vehicle?.model}
                    </span>
                  </div>
                  <div className='list-card-bottom'>
                    <div>
                      <a href={cool?.vehicle?.dougscore?.video_link}>
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
                          history.push(`/vehicles/${cool?.vehicle?.id}`)
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
