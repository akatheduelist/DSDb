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
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [goodBad, setGoodBad] = useState("");
  const [higherLower, setHigherLower] = useState("");

  useEffect(() => {
    if (!Object.values(tags).length) dispatch(getTags());
    setDescription(vehicle?.description);
    totalScoreAnalysis(vehicle);
  }, [dispatch, tags, vehicle, vehicle?.description]);

  const handleDescription = async () => {
    // TO-DO Move to dispatch
    if (editDescription && sessionUser) {
      const data = await fetch(`/api/vehicles/${vehicle?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
        }),
      });
      if (data.errors) {
        setErrors(data.errors);
      } else {
        dispatch(getVehicle(vehicle?.id)).then(() =>
          setEditDescription(!editDescription)
        );
      }
    }
  };

  const deleteTag = (vehicle, tagId) => {
    if (sessionUser) dispatch(deleteVehicleTag(vehicle.id, tagId));
  };

  const handleTag = async (id) => {
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

      if (data.errors) {
        setErrors(data.errors);
      } else {
        dispatch(getVehicle(vehicle?.id));
      }
    }
  };

  function totalScoreAnalysis(vehicle) {
    if (vehicle.dougscore.dougscore_total >= 72) {
      setGoodBad("stellar 👑 ");
      setHigherLower("as one of the highest 🏆");
    }
    if (
      vehicle.dougscore.dougscore_total < 72 &&
      vehicle.dougscore.dougscore_total >= 68
    ) {
      setGoodBad("🚀 outstanding");
      setHigherLower("a cut above the rest 🤌");
    }
    if (
      vehicle.dougscore.dougscore_total < 68 &&
      vehicle.dougscore.dougscore_total > 62
    ) {
      setGoodBad("😎 above average");
      setHigherLower("higher than normal 🫶");
    }
    if (
      vehicle.dougscore.dougscore_total < 62 &&
      vehicle.dougscore.dougscore_total >= 48
    ) {
      setGoodBad("😐 pretty average");
      setHigherLower("right in the middle 👀");
    }
    if (
      vehicle.dougscore.dougscore_total < 48 &&
      vehicle.dougscore.dougscore_total >= 40
    ) {
      setGoodBad("🫠 not great");
      setHigherLower("lower than normal 💔");
    }
    if (
      vehicle.dougscore.dougscore_total < 40 &&
      vehicle.dougscore.dougscore_total >= 35
    ) {
      setGoodBad("🤢 horrible");
      setHigherLower("a far outlier (in a bad way) 🙅");
    }
    if (vehicle.dougscore.dougscore_total < 35) {
      setGoodBad("🤮 craptastic");
      setHigherLower("in the mariana trench 🚨");
    }
    return;
  }
  const features = [
    {
      name: `Daily Score: ${vehicle?.dougscore?.daily_total}`,
      description: [
        `Features: ${vehicle?.dougscore?.daily_features}`,
        `Comfort: ${vehicle?.dougscore?.daily_comfort}`,
        `Quality: ${vehicle?.dougscore?.daily_quality}`,
        `Practicality: ${vehicle?.dougscore?.daily_practicality}`,
        `Value: ${vehicle?.dougscore?.daily_value}`,
      ],
    },
    {
      name: `Weekend Score: ${vehicle?.dougscore?.weekend_total}`,
      description: [
        `Styling: ${vehicle?.dougscore?.weekend_styling}`,
        `Acceleration: ${vehicle?.dougscore?.weekend_acceleration}`,
        `Handling: ${vehicle?.dougscore?.weekend_handling}`,
        `Fun Factor: ${vehicle?.dougscore?.weekend_funfactor}`,
        `Cool Factor: ${vehicle?.dougscore?.weekend_coolfactor}`,
      ],
    },
    {
      name: `Total Score: ${vehicle?.dougscore?.dougscore_total}`,
      description: [
        `This is a ${goodBad} overall DougScore, and it ranks ${higherLower} compared to the median score.`,
      ],
    },
  ];

  return (
    <>
      {Object.values(errors).length ? <Error errors={errors} /> : null}
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className="py-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {vehicle?.year} {vehicle?.make} {vehicle?.model}
            </h2>
            <h4 className="text-lg tracking-tight text-gray-800">
              Ranked #{vehicle?.id} by Doug
            </h4>

            <div className="flex flex-col justify-between mt-3">
              <label
                htmlFor="description"
                className="block text-sm text-gray-400"
              >
                Description
              </label>

              <div className="h-24 mr-4">
                {sessionUser && editDescription ? (
                  <textarea
                    id="description"
                    name="description"
                    type="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-lg bg-gray-100 border border-emerald-200 p-2 h-full text-gray-900 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40"
                  >
                    {description}
                  </textarea>
                ) : (
                  <p className="text-gray-600">{vehicle?.description}</p>
                )}
              </div>
              <div className="flex justify-between items-start mt-1">
                <p className="text-xs text-gray-400">
                  All edits will be reviewed by the community{" "}
                  <span className="underline decoration-dashed">before</span>{" "}
                  posting.
                </p>
                {sessionUser && editDescription ? (
                  <button
                    onClick={() => {
                      handleDescription();
                    }}
                    className="flex w-22 mr-4 items-center justify-between px-2 py-2 tracking-wide text-white transition-colors duration-300 transform bg-emerald-400 rounded-lg hover:bg-emerald-300 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-80"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    <span className="mx-1 text-sm font-medium">Submit</span>
                  </button>
                ) : (
                  <button
                    className="flex w-22 mr-4 items-center justify-between px-2 py-2 tracking-wide text-white transition-colors duration-300 transform bg-emerald-400 rounded-lg hover:bg-emerald-300 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-80"
                    onClick={() =>
                      setErrors({
                        test: "You must be logged in to edit a description.",
                      })
                    }
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    <span className="mx-1 text-sm font-medium">Edit</span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-1">
              <label
                htmlFor="Description"
                className="block text-sm text-gray-400"
              >
                Tags
              </label>
              <div className="flex flex-wrap p-1 gap-1">
                {Object.values(vehicle?.tags).map(({ tag, id }) => (
                  <div key={id}>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
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
                      <Menu.Button className="inline-flex items-center rounded-md bg-emerald-400 hover:bg-emerald-300 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-emerald-300">
                        New Tag
                        <ChevronDownIcon
                          className="-mr-1 h-4 w-5 text-white"
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
                      <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {Object.values(tags).length
                            ? Object.values(tags.vehicle_tags).map(
                                ({ tag, id }) => (
                                  <Menu.Item
                                    key={id}
                                    className="cursor-pointer"
                                  >
                                    <span
                                      onClick={() => handleTag(id)}
                                      className="hover:bg-gray-100 hover:text-gray-900 text-gray-700 block px-4 py-1 text-sm"
                                    >
                                      {tag}
                                    </span>
                                  </Menu.Item>
                                )
                              )
                            : null}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button className="inline-flex items-center rounded-md bg-emerald-400 hover:bg-emerald-300 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-emerald-300"
                    onClick={() => setErrors({notLoggedIn: "You must be logged in to add a tag."})}
                  >
                    New Tag
                    <ChevronDownIcon
                      className="-mr-1 h-4 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 gap-x-6">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  {feature.description.map((description, idx) => (
                    <dd key={idx} className="mt-2 text-medium text-gray-500">
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
