import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  PresentationChartLineIcon,
  FireIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";

export default function CardList({
  isLoaded,
  apiQuery,
  subQuery,
  cardListTitle,
  cardListDescription,
}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await fetch(`${apiQuery}`);
      const data = await results.json();
      if (data.errors) {
        // TODO Error Handle
        console.log(data.errors);
      } else {
        setList(data[subQuery]);
      }
    }
    fetchData();
  }, [isLoaded, apiQuery, subQuery]);

  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: true,
  };

  return (
    <>
      <div className="inline-flex items-center">
        <span className="text-3xl font-medium">{cardListTitle}</span>
        &nbsp;&nbsp;
        <i className="fa-solid fa-angle-right" />
      </div>
      <div className="mt-1 mb-4 text-slate-400">{cardListDescription}</div>
      <Slider {...settings}>
        {list?.map((item, idx) => {
          return (
            <div key="{idx}">
              <div className="bg-gray-100 w-44 py-1 mx-2 rounded-md">
                <div className="flex justify-center">
                  <Link to={`/vehicles/${item?.vehicle?.id}`}>
                    <img
                      className="w-40 h-56 rounded-md object-cover drop-shadow-md"
                      src={item?.vehicle?.images[1]?.image_url}
                      alt={item?.vehicle?.model}
                    />
                  </Link>
                </div>
                <div className="flex justify-between px-3 my-2">
                  <div className="inline-flex items-center">
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
                    )}
                    <span className="text-lg">
                      &nbsp;{item?.dougscore_total}
                      <span className="text-xs text-gray-500">/100</span>
                    </span>
                  </div>

                  <span>
                    <span className="text-xs text-gray-500">#</span>
                    <span className="text-lg">{idx + 1}</span>
                  </span>
                </div>
                <div className="px-3 h-12">
                  <Link to={`/vehicles/${item?.vehicle?.id}`}>
                    {item?.vehicle?.make} {item?.vehicle?.model}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
