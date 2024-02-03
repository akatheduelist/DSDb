import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle, deleteVehicleTag } from "../../store/vehicle";
import { getTags } from "../../store/tags";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Error from "../Error";

function VehicleHeader() {
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => state.vehicle.currentVehicle);
  const sessionUser = useSelector((state) => state.session.user);
  const tags = useSelector((state) => state.tags);
  const [editDescription, setEditDescription] = useState(false);
  const [updateDescription, setUpdateDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!Object.values(tags).length) dispatch(getTags());
  }, [dispatch]);

  const handleDescription = async (e) => {
    e.preventDefault();
    // TO-DO Move to dispatch
    if (editDescription && sessionUser) {
      const data = await fetch(`/api/vehicles/${vehicle?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: updateDescription,
        }),
      });
      if (data.errors) {
        setErrors(data.errors);
      } else {
        dispatch(getVehicle(vehicle?.id));
        setEditDescription(!editDescription);
      }
    }
  };

  const deleteTag = (vehicle, tagId) => {
    if (sessionUser) dispatch(deleteVehicleTag(vehicle.id, tagId));
  };

  const handleTag = async (id) => {
    // e.preventDefault()
    // TO-DO Move to dispatch
    if (sessionUser) {
      const data = await fetch(`/api/vehicles/${vehicle?.id}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag_id: id,
        }),
      });

      if (!data.ok) {
        setErrors(data.statusText);
      } else {
        dispatch(getVehicle(vehicle?.id));
      }
    }
  };

  const features = [
    {
      name: "Daily Score",
      description: [
        `Features ${vehicle?.dougscore?.daily_features}`,
        `Comfort ${vehicle?.dougscore?.daily_comfort}`,
        `Quality ${vehicle?.dougscore?.daily_quality}`,
        `Practicality ${vehicle?.dougscore?.daily_practicality}`,
        `Value ${vehicle?.dougscore?.daily_value}`,
      ],
    },
    {
      name: "Weekend Score",
      description: [
        `Styling ${vehicle?.dougscore?.weekend_styling}`,
        `Acceleration ${vehicle?.dougscore?.weekend_acceleration}`,
        `Handling ${vehicle?.dougscore?.weekend_handling}`,
        `Fun Factor ${vehicle?.dougscore?.weekend_funfactor}`,
        `Cool Factor ${vehicle?.dougscore?.weekend_coolfactor}`,
      ],
    },
    {
      name: "Quirks",
      description: [`Quirks`],
    },
  ];
  console.log("editDescription", editDescription);
  return (
    <>
      {Object.values(errors).length ? <Error errors={errors} /> : null}
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {vehicle?.year} {vehicle?.make} {vehicle?.model}
            </h2>
            <h4 className="text-lg tracking-tight text-gray-800">
              Ranked #{vehicle?.id} by Doug
            </h4>

            <div>
              {sessionUser && editDescription ? (
                <div>
                  <label
                    for="Description"
                    class="block text-sm text-gray-500 dark:text-gray-300"
                  >
                    Description
                  </label>

                  <textarea
                    placeholder="lorem..."
                    class="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  ></textarea>

                  <p class="mt-3 text-xs text-gray-400 dark:text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-gray-500">{vehicle?.description}</p>
              )}
              <button
                class="flex ml-auto items-center px-2 py-2 tracking-wide text-white transition-colors duration-300 transform bg-emerald-500 rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-80"
                onClick={() => setEditDescription(!editDescription)}
              >
                <PencilSquareIcon className="w-5 h-5" />
                <span class="mx-1 text-xs tracking-wide font-medium">
                  Edit Description
                </span>
              </button>
            </div>
            <div className="flex">
              {Object.values(vehicle?.tags).map(({ tag, id }) => (
                <div key={id}>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mx-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {tag}
                    {sessionUser ? (
                      <button onClick={() => deleteTag(vehicle, id)}>
                        &nbsp;
                        <i className="text-red-700 fa-solid fa-delete-left" />
                      </button>
                    ) : null}
                  </span>
                </div>
              ))}
              {sessionUser ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      New Tag
                      <ChevronDownIcon
                        className="-mr-1 h-4 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {Object.values(tags).length
                          ? Object.values(tags.vehicle_tags).map(
                            ({ tag, id }) => (
                              <Menu.Item key={id}>
                                <span
                                  onClick={() => handleTag(id)}
                                  className="hover:bg-gray-100 hover:text-gray-900 text-gray-700 block px-4 py-1 text-sm"
                                >
                                  {tag}
                                </span>
                              </Menu.Item>
                            ),
                          )
                          : null}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : null}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  {feature.description.map((description, idx) => (
                    <dd key={idx} className="mt-2 text-sm text-gray-500">
                      {description}
                    </dd>
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
                className="h-64 w-64 object-cover rounded-lg drop-shadow-lg bg-gray-100"
              />
            </a>
            <a href={vehicle?.images[1]?.image_url}>
              <img
                src={vehicle?.images[1]?.image_url}
                alt={vehicle?.model}
                className="h-64 w-64 object-cover rounded-lg drop-shadow-lg bg-gray-100"
              />
            </a>
            <a href={vehicle?.images[2]?.image_url}>
              <img
                src={vehicle?.images[2]?.image_url}
                alt={vehicle?.model}
                className="h-64 w-64 object-cover rounded-lg drop-shadow-lg bg-gray-100"
              />
            </a>
            <a href={vehicle?.images[3]?.image_url}>
              <img
                src={vehicle?.images[3]?.image_url}
                alt={vehicle?.model}
                className="h-64 w-64 object-cover rounded-lg drop-shadow-lg bg-gray-100"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleHeader;
