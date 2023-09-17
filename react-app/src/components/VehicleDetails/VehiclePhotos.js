import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./VehicleDetails.css";

export default function VehiclePhotos({ vehicle }) {

	const settings = {
		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: false,
	};

	return (
		<>
			<Slider {...settings}>
				{Object.values(vehicle.images).map((image, idx) => {
					return (
						<div>
							<img
								style={{ width: `10rem`, height: `10rem`, objectFit: `cover` }}
                                className="border-radius"
								src={image.image_url}
							/>
						</div>
					);
				})}
				<div></div>
				<div style={{ width: `10rem`, height: `10rem`, objectFit: `cover` }}></div>
				<div style={{ width: `10rem`, height: `10rem`, objectFit: `cover` }}></div>
			</Slider>
		</>
	);
}