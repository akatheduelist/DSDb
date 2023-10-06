import { useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useHistory } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './LandingPage.css'

export default function GridCard ({ allVehicles }, isLoaded, Redirect) {
  const history = useHistory()
  const [sliderPosition, setSliderPosition] = useState(null)

  const settings = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    vertical: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <>
      <button className='no-button' onClick={sliderPosition?.slickPrev}>
        <i
          style={{ fontSize: `22px` }}
          className='cursor-pointer green-text fa-solid fa-caret-up'
        ></i>
      </button>
      <Slider ref={setSliderPosition} {...settings}>
        {isLoaded &&
          Object.values(allVehicles).map(vehicle => (
            <div key={vehicle.id}>
              <div className='up-next-card' key={vehicle.id}>
                <Link
                  to={`/vehicles/${vehicle?.id}`}
                  target='_blank'
                >
                  <img
                    style={{ width: `5rem`, borderRadius: `1px` }}
                    src={vehicle?.images[1]?.image_url}
                    alt={vehicle?.model}
                  />
                </Link>
                <div style={{ paddingLeft: `1rem`, paddingTop: `1rem` }}>
                  <div
                    style={{ display: `inline-flex`, alignItems: `flex-end` }}
                    className='bottom-spacing'
                  >
                    <Link
                      to={{ pathname: vehicle?.dougscore?.video_link }}
                      target='_blank'
                    >
                      <i
                        style={{ fontSize: `34px`, fontWeight: `200` }}
                        className='cursor-pointer fa-regular fa-circle-play'
                      />
                    </Link>
                    <span style={{ marginLeft: `8px` }}>
                      {vehicle?.dougscore?.video_time}
                    </span>
                  </div>
                  <div
                    className='cursor-pointer'
                    onClick={() => history.push(`/vehicles/${vehicle?.id}`)}
                  >
                    <span>
                      {vehicle.year} {vehicle.make} {vehicle.model}{' '}
                    </span>
                  </div>
                  Dougscore: {vehicle.dougscore.dougscore_total}
                </div>
              </div>
            </div>
          ))}
      </Slider>
      <button className='no-button' onClick={sliderPosition?.slickNext}>
        <i
          style={{ fontSize: `22px` }}
          className='cursor-pointer green-text fa-solid fa-caret-down'
        ></i>
      </button>
    </>
  )
}
