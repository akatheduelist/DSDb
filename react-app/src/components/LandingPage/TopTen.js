import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LandingPage.css";

export default function TopTen({ isLoaded }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [topTen, setTopTen] = useState([])

	useEffect(async () => {
		if (isLoaded) {
			const topTenResults = await fetch(`/api/dougscores/topten`);
            const data = await topTenResults.json();
            if (data.errors) {
				setErrors(data.errors);
			} else {
				setTopTen(data);
			}
		}
	}, []);

	const settings = {
		slidesToShow: 10,
		slidesToScroll: 1,
		infinite: true,
	};

	return (
		<>
			<span className="title">Top Ten</span>
			<Slider {...settings}>
				{topTen?.top_ten?.map((top, idx) => {
					return (
						<div>
                            <h1>{idx + 1} = {top.vehicle.year}</h1>
						</div>
					);
				})}
			</Slider>
		</>
	);
}
