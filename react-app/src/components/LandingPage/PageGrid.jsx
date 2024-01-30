import { Link } from "react-router-dom";
import GridCard from "./GridCard";
import "./LandingPage.css";

function PageGrid({ history, allVehicles, isLoaded, randomVehicle }) {
  return (
    <>
      <div className='page-grid-container'>
        <div className='page-grid-content'>
          <div className='page-grid-top'>
            <div
              className='page-grid-top-image cursor-pointer border-radius'
              onClick={() => history.push(`/vehicles/${randomVehicle?.id}`)}
            >
              <div className='page-grid-top-image-overlay'>
                <Link
                  to={{ pathname: randomVehicle?.dougscore?.video_link }}
                  target='_blank'
                >
                  <i
                    style={{ fontSize: `62px`, fontWeight: `100`, marginRight: `.5rem` }}
                    className='cursor-pointer fa-regular fa-circle-play'
                  />
                </Link>&nbsp;
                <span style={{ fontSize: `36px`, fontWeight: `300`}}>{randomVehicle?.year} {randomVehicle?.make} {randomVehicle?.model}</span>
              </div>
              {isLoaded && (
                <img
                  className='page-grid-top-hero-video'
                  src={randomVehicle.images[0].image_url}
                  alt={randomVehicle?.model}
                />
              )}
            </div>
            <div className='page-grid-top-right'>
              <span
                style={{ marginBottom: `1rem` }}
                className='small-title white-text'
              >
                Latest models
              </span>
              <div className='up-next-card-container overflow-hidden border-radius'>
                <GridCard allVehicles={allVehicles} />
              </div>
              <span
                style={{ paddingLeft: `16px`, paddingTop: `16px` }}
                className='small-title cursor-pointer'
              >
                Browse vehicles &#8250;
              </span>
            </div>
          </div>
        </div>

        <div className='page-grid-content'>
          <div className='page-grid-top'>
            <div className='page-grid-title'>
              <span className='title'>Featured Today</span>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageGrid;
