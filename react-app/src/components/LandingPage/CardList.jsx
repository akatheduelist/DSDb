import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LandingPage.css";

export default function TopTen({
  query,
  subQuery,
  cardTitle,
  cardDescription,
}) {
  const history = useHistory();
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await fetch(`${query}`);
      const data = await results.json();
      if (data.errors) {
        // TODO Display Errors
        console.log(data.errors);
      } else {
        setCardList(data);
      }
    }
    fetchData();
  }, [query]);

  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: true,
  };

  return (
    <div className="list-card">
      <div style={{ display: `inline-flex`, alignItems: `center` }}>
        <span className="title green-text mid-bold">|</span>&nbsp;
        <span className="title">{cardTitle}</span>&nbsp;&nbsp;
        <i style={{ fontSize: `32px` }} className="fa-solid fa-angle-right" />
      </div>
      <div style={{ margin: `.5rem 0 1rem 0` }} className="mid-grey">
        {cardDescription}
      </div>
      <Slider {...settings}>
        {cardList?.subQuery?.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="list-card-container light-border-radius">
                <div className="list-card-img">
                  <a href={`/vehicles/${item?.vehicle?.id}`}>
                    <img
                      style={{
                        width: `9.5rem`,
                        height: `14rem`,
                        objectFit: `cover`,
                      }}
                      src={item?.vehicle?.images[1]?.image_url}
                      alt={item?.vehicle?.model}
                    />
                  </a>
                </div>
                <div className="list-card-text">
                  <div className="list-card-top">
                    <span>
                      <i
                        style={{ fontSize: `14px` }}
                        className="green-text fa-solid fa-star"
                      />
                      &nbsp;{item?.dougscore_total}
                    </span>
                    <span>
                      <span style={{ fontSize: `12px` }}>#</span>
                      <span style={{ fontSize: `18px` }}>{idx + 1}</span>
                    </span>
                  </div>
                  <div className="list-card-title">
                    <span>
                      {item?.vehicle?.make} {item?.vehicle?.model}
                    </span>
                  </div>
                  <div className="list-card-bottom">
                    <div>
                      <a href={item?.vehicle?.dougscore?.video_link}>
                        <i
                          style={{ fontSize: `14px` }}
                          className="white-text fa-solid fa-play"
                        />
                        &nbsp;Review
                      </a>
                    </div>
                    <div>
                      <i
                        onClick={() =>
                          history.push(`/vehicles/${item?.vehicle?.id}`)
                        }
                        className="cursor-pointer fa-solid fa-circle-info"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
