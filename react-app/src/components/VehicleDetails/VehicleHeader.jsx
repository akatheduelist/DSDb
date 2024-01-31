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
    {
      name: 'Daily Score', description: [`Features ${vehicle?.dougscore?.daily_features}`,
      `Comfort ${vehicle?.dougscore?.daily_comfort}`,
      `Quality ${vehicle?.dougscore?.daily_quality}`,
      `Practicality ${vehicle?.dougscore?.daily_practicality}`,
      `Value ${vehicle?.dougscore?.daily_value}`
      ]
    },
    {
      name: 'Weekend Score', description: [`Styling ${vehicle?.dougscore?.weekend_styling}`,
      `Acceleration ${vehicle?.dougscore?.weekend_acceleration}`,
      `Handling ${vehicle?.dougscore?.weekend_handling}`,
      `Fun Factor ${vehicle?.dougscore?.weekend_funfactor}`,
      `Cool Factor ${vehicle?.dougscore?.weekend_coolfactor}`
      ]
    },
  ]
  // console.log("sessionUser", sessionUser)
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{vehicle?.year} {vehicle?.make} {vehicle?.model}</h2>
            <p className="mt-4 text-gray-500">
              {vehicle?.description}
            </p>
            <div className="flex">
              <div>
              {Object.values(vehicle?.tags).map(({ tag, id }) => (
                <div key={id}>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {tag}
                    {sessionUser ? (
                  <button
                    onClick={() => deleteTag(id)}
                  >
                    &nbsp;
                    <i
                      className='text-red-700 fa-solid fa-delete-left'
                    />
                  </button>
                    ): null}
                  </span>
                </div>
              ))}
              </div>
              {newTag ? (
                <>
                  <form
                    style={{
                      display: `inline-flex`,
                      alignItems: `center`,
                      paddingLeft: `12px`
                    }}
                    onSubmit={handleTag}
                  >
                    <select
                      value={newTagData}
                      onChange={e => setNewTagData(e.target.value)}
                    >
                      <option style={{ height: `100%` }} disabled>
                        Select a tag
                      </option>
                      {Object.values(tags?.vehicle_tags).map(({ tag, id }) => (
                        <option key={id} value={id}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <button
                      style={{ marginLeft: `4px` }}
                      className='green-background small-bold'
                      type='submit'
                    >
                      Submit
                    </button>
                  </form>
                </>
              ) : null}
              {sessionUser && !newTag ? (
                <button
                  style={{ marginLeft: `1rem` }}
                  className='no-button green-text small-bold'
                  onClick={() => {
                    setNewTag(!newTag)
                  }}
                >
                  + Add Tag
                </button>
              ) : null}
            </div>
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
            <a href={vehicle?.images[0]?.image_url}>
              <img
                src={vehicle?.images[0]?.image_url}
                alt={vehicle?.model}
                className="h-64 w-64 object-cover rounded-lg bg-gray-100"
              />
            </a>
            <a href={vehicle?.images[1]?.image_url}>
              <img
                src={vehicle?.images[1]?.image_url}
                alt={vehicle?.model}
                className="h-64 w-64 object-cover rounded-lg bg-gray-100"
              />
            </a>
            <a href={vehicle?.images[2]?.image_url}>
              <img
                src={vehicle?.images[2]?.image_url}
                alt={vehicle?.model}
                className="h-64 w-64 object-cover rounded-lg bg-gray-100"
              />
            </a>
            <a href={vehicle?.images[3]?.image_url}>
              <img
                src={vehicle?.images[3]?.image_url}
                alt={vehicle?.model}
                className="h-64 w-64 object-cover rounded-lg bg-gray-100"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default VehicleHeader
