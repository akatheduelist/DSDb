import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PresentationChartLineIcon,
  FireIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";

export default function VerticalList({
  isLoaded,
  apiQuery,
  subQuery,
  verticalListTitle,
  verticalListDescription,
}) {
  const [topTen, setTopTen] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await fetch(`${apiQuery}`);
      const data = await results.json();
      if (data.errors) {
        // console.log(data.errors);
      } else {
        setTopTen(data[subQuery]);
      }
    }
    fetchData();
  }, [isLoaded, apiQuery, subQuery]);

  return (
    <>
      <div className="flex flex-col max-w-xl drop-shadow-xl mx-auto my-14">
        <span className="text-3xl font-medium">{verticalListTitle}</span>
        <p className="mb-2 text-slate-400">{verticalListDescription}</p>
        <div className="max-h-80 overflow-auto">
          <ul className="divide-y divide-gray-100">
            {topTen?.map((item, index) => (
              <li
                key={item.vehicle_id}
                className="flex justify-between gap-x-6 py-2"
              >
                <div className="flex items-center min-w-0 gap-x-4">
                  {index === 0 ? <span className="text-2xl">🥇</span> : null}
                  {index === 1 ? <span className="text-2xl">🥈</span> : null}
                  {index === 2 ? <span className="text-2xl">🥉</span> : null}
                  <div className="min-w-0 flex-auto">
                    <Link
                      to={`/vehicles/${item?.vehicle?.id}`}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      {item?.vehicle?.year} {item?.vehicle?.make}{" "}
                      {item?.vehicle?.model}
                    </Link>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {item?.vehicle?.description}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="flex justify-end gap-x-1 w-14">
                    {item?.dougscore_total > 70 ? (
                      <FireIcon className="h-5" />
                    ) : item?.dougscore_total <= 70 &&
                      item?.dougscore_total > 60 ? (
                      <FaceSmileIcon className="h-5" />
                    ) : item?.dougscore_total < 50 &&
                      item?.dougscore_total >= 40 ? (
                      <FaceFrownIcon className="h-5" />
                    ) : item?.dougscore_total < 40 ? (
                      <HandThumbDownIcon className="h-5" />
                    ) : (
                      <PresentationChartLineIcon className="h-5" />
                    )}{" "}
                    #{index + 1}
                  </div>
                  <span className="text-sm">
                    &nbsp;{item?.dougscore_total}
                    <span className="text-xs text-gray-500">/100</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
