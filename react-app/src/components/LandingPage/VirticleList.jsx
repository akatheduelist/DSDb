import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function VirticleList({ isLoaded, apiQuery, subQuery, }) {
  const [topTen, setTopTen] = useState([])

  useEffect(() => {
    async function fetchData() {
      const results = await fetch(`${apiQuery}`)
      const data = await results.json()
      if (data.errors) {
        console.log(data.errors)
      } else {
        setTopTen(data[subQuery])
      }
    }
    fetchData()
  }, [isLoaded])
  console.log("TOPTEN", topTen)
  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: true
  }

  return (
    <>
    <div className="max-w-4xl max-h-96 overflow-auto mx-auto my-12">
      <h1>Top Ten</h1>
      <p>Cars with the highest total Dougscore.</p>
    <ul role="list" className="divide-y divide-gray-100">
      {topTen?.map((item, index) => (
        <li key={item.vehicle_id} className="flex justify-between gap-x-6 py-2">
          <div className="flex min-w-0 gap-x-4">
            {/* <img className="h-12 w-12 flex-none rounded-full object-cover bg-gray-50" src={item?.vehicle?.images[0].image_url} alt="" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{item?.vehicle?.year} {item?.vehicle?.make} {item?.vehicle?.model}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item?.vehicle?.description}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">#{index+1}</p>
            {item.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={item.lastSeenDateTime}>{item.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
    </div>
</>
  )
}
