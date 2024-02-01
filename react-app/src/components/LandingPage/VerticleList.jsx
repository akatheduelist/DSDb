import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function VerticleList({ isLoaded, apiQuery, subQuery, verticleListTitle, verticleListDescription }) {
  const [listImg, setListImg] = useState("")
  const [topTen, setTopTen] = useState([])

  useEffect(() => {
    async function fetchData() {
      const results = await fetch(`${apiQuery}`)
      const data = await results.json()
      if (data.errors) {
        console.log(data.errors)
      } else {
        setTopTen(data[subQuery])
        setListImg(data[subQuery][0]?.vehicle?.images[0]?.image_url)
      }
    }
    fetchData()
  }, [isLoaded])

  console.log(verticleListTitle)
  return (
    <>
      <div className="flex flex-col max-w-xl drop-shadow-xl mx-auto my-14">
        <span className='text-3xl font-medium'>{verticleListTitle}</span>
        <p className="mb-2 text-slate-400">{verticleListDescription}</p>
        {/* <div className="flex justify-center">
          <img className="h-64 w-full mb-4 rounded-lg flex-none object-cover drop-shadow-xl" src={listImg} alt="" />
        </div> */}
        <div className="max-h-80 overflow-auto">
          <ul role="list" className="divide-y divide-gray-100">
            {topTen?.map((item, index) => (
              <li key={item.vehicle_id} className="flex justify-between gap-x-6 py-2">
                <div className="flex items-center min-w-0 gap-x-4">
                  {index === 0 ? (
                    <span className="text-2xl">
                      🥇
                    </span>
                  ) : (null)}
                  {index === 1 ? (
                    <span className="text-2xl">
                      🥈
                    </span>
                  ) : (null)}
                  {index === 2 ? (
                    <span className="text-2xl">
                      🥉
                    </span>
                  ) : (null)}
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{item?.vehicle?.year} {item?.vehicle?.make} {item?.vehicle?.model}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item?.vehicle?.description}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">#{index + 1}</p>
                  {index === 0 ? (
                    <p className="mt-1 text-xs leading-5">
                      🥇
                    </p>
                  ) : (null)}
                  {index === 1 ? (
                    <p className="mt-1 text-xs leading-5">
                      🥈
                    </p>
                  ) : (null)}
                  {index === 2 ? (
                    <p className="mt-1 text-xs leading-5">
                      🥉
                    </p>
                  ) : (null)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
