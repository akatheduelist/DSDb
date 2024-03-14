import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

export default function Quirks() {
  const vehicle = useSelector((state) => state.vehicle.currentVehicle);

  return (
    <div className="p-6">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Quirks and Features
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          These are the items tha Doug found particularly quirky about the {vehicle?.make} {vehicle?.model}...
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {vehicle.quirks.map(({ id, quirk }) => (
            <div
              key={id}
              className="px-4 py-4 sm:flex sm:gap-4 sm:px-0"
            >
              <div className="text-sm font-medium leading-6 text-gray-900">
                Quirk #{id}
              </div>
              <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {quirk}
              </div>
            </div>
          ))}
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full Video Transcript
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        {vehicle?.id}_{vehicle?.year}_{vehicle?.make}_
                        {vehicle?.model}.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-emerald-500 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
