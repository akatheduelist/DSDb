import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './LandingPage.css'

export default function Coolest({ isLoaded }) {
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [coolest, setCoolest] = useState([])

  useEffect(() => {
    async function fetchData() {
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
    <>
      <div className='w-full'>
        <div className="inline-flex items-center">
          <span className='text-3xl font-medium'>Ice Cold</span>&nbsp;&nbsp;
          <i className='fa-solid fa-angle-right' />
        </div>
        <div className='mt-2 mb-4 text-slate-400'>
          Whats cooler than being cool? These cars have the highest coolfactor
          rating.
        </div>
        <Slider {...settings}>
          {coolest?.coolest?.map((cool, idx) => {
            return (
              <div key={idx}>
                <div className='flex-column justify-center w-36 rounded-md'>
                  <Link to={`/vehicles/${cool?.vehicle?.id}`}>
                    <img
                      className='w-40 h-56 object-cover'
                      src={cool?.vehicle?.images[1]?.image_url}
                      alt={cool?.vehicle?.model}
                    />
                  </Link>
                  <div className='flex-column justify-between h-full px-1 py-2'>
                    <div className='flex items-center justify-between w-full'>
                      <span>
                        <i
                          className='green-text text-sm fa-solid fa-star'
                        />
                        &nbsp;{cool?.dougscore_total}
                      </span>
                      <span>
                        <span className="text-xs">#</span>
                        <span className="text-base">{idx + 1}</span>
                      </span>
                    </div>
                    <div className=''>
                      <Link to={`/vehicles/${cool?.vehicle?.id}`}>
                        {cool?.vehicle?.make} {cool?.vehicle?.model}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}
