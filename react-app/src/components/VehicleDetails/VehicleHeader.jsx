import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVehicle, deleteVehicleTag } from '../../store/vehicle'
import { getTags } from '../../store/tags'

function VehicleHeader({ vehicle, sessionUser }) {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)
  const [newTag, setNewTag] = useState(false)
  const [newTagData, setNewTagData] = useState('')
  const [editDescription, setEditDescription] = useState(false)
  const [updateDescription, setUpdateDescription] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getTags())
  }, [dispatch])

  const handleDescription = async e => {
    e.preventDefault()
    // TO-DO Move to dispatch
    if (editDescription && sessionUser) {
      const data = await fetch(`/api/vehicles/${vehicle?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: updateDescription
        })
      })
      if (data.errors) {
        setErrors(data.errors)
      } else {
        dispatch(getVehicle(vehicle?.id))
        setEditDescription(!editDescription)
      }
    }
  }

  const deleteTag = id => {
    if (sessionUser) dispatch(deleteVehicleTag(id))
  }

  const handleTag = async e => {
    e.preventDefault()
    // TO-DO Move to dispatch
    if (newTag && sessionUser) {
      const data = await fetch(`/api/vehicles/${vehicle?.id}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tag_id: newTagData
        })
      })
      if (data.errors) {
        setErrors(data.errors)
      } else {
        dispatch(getVehicle(vehicle?.id))
        setNewTag(!newTag)
      }
    }
  }

  const features = [
    { name: 'Daily Score', description: [ `Features ${vehicle?.dougscore?.daily_features}`, 
                                          `Comfort ${vehicle?.dougscore?.daily_comfort}`,
                                          `Quality ${vehicle?.dougscore?.daily_quality}`,
                                          `Practicality ${vehicle?.dougscore?.daily_practicality}`,
                                          `Value ${vehicle?.dougscore?.daily_value}`
                                        ] },
    { name: 'Weekend Score', description: [ `Styling ${vehicle?.dougscore?.weekend_styling}`, 
                                            `Acceleration ${vehicle?.dougscore?.weekend_acceleration}`,
                                            `Handling ${vehicle?.dougscore?.weekend_handling}`,
                                            `Fun Factor ${vehicle?.dougscore?.weekend_funfactor}`,
                                            `Cool Factor ${vehicle?.dougscore?.weekend_coolfactor}`
                                          ] },
  ]

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{vehicle?.year} {vehicle?.make} {vehicle?.model}</h2>
            <p className="mt-4 text-gray-500">
              {vehicle?.description}
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  {feature.description.map((description) => (
                    <dd className="mt-2 text-sm text-gray-500">{description}</dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default VehicleHeader
