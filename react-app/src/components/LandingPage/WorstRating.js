import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LandingPage.css";

export default function WorstRating({ isLoaded }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [bottomTen, setBottomTen] = useState([]);

	useEffect(async () => {
		if (isLoaded) {
			const bottomTenResults = await fetch(`/api/dougscores/worstrating`);
			const data = await bottomTenResults.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				setBottomTen(data);
			}
		}
	}, []);

	const settings = {
		slidesToShow: 7,
		slidesToScroll: 1,
		infinite: true,
	};

	return (
		<div className="list-card">
							<div style={{ display: `inline-flex`, alignItems: `center` }}>
								<span className="title green-text mid-bold">|</span>&nbsp;
								<span className="title">Total Stinkers</span>&nbsp;&nbsp;
                                <i style={{fontSize: `32px`}} className="fa-solid fa-angle-right" />							</div>
                            <div style={{ margin: `.5rem 0 1rem 0`}}className="mid-grey">
                                Cars with the absolute worst Dougscore.
                            </div>
			<Slider {...settings}>
				{bottomTen?.bottom_ten?.map((worst, idx) => {
					return (
						<div key={worst.id}>
							<div className="list-card-container light-border-radius">
								<div className="list-card-img">
                                <a href={`/vehicles/${worst?.vehicle?.id}`}><img
										style={{ width: `9.5rem`, height: `14rem`, objectFit: `cover` }}
										src={worst?.vehicle?.images[1]?.image_url}
									/></a>
								</div>
								<div className="list-card-text">
									<div className="list-card-top">
                                    <span><i
											style={{ fontSize: `14px` }}
											className="green-text fa-solid fa-star"
										/>
										&nbsp;{worst?.dougscore_total}</span>
                                        <span><span style={{fontSize: `12px`}}>#</span><span style={{fontSize: `18px`}}>{idx + 1}</span></span>
									</div>
										<div className="list-card-title">
											<span>
												{worst?.vehicle?.make} {worst?.vehicle?.model}
											</span>
										</div>
									<div className="list-card-bottom">
										<div>
											<a href={worst?.vehicle?.dougscore?.video_link}>
												<i
													style={{ fontSize: `14px` }}
													className="white-text fa-solid fa-play"
												/>
												&nbsp;Review
											</a>
										</div>
										<div>
											<i
												onClick={() => history.push(`/vehicles/${worst?.vehicle?.id}`)}
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
