import { useHistory, Redirect } from "react-router-dom";
import GridCard from "./GridCard";
import "./LandingPage.css";

function PageGrid({ allVehicles, isLoaded, randomVehicle }) {
	const history = useHistory();

	return (
		<>
			<div className="page-grid-container">
				<div className="page-grid-content">
					<div className="page-grid-top">
						<div
							className="page-grid-top-image cursor-pointer border-radius"
							onClick={() => history.push(`/vehicles/${randomVehicle?.id}`)}
						>
							{isLoaded && (
								<img
									className="page-grid-top-hero-video"
									src={randomVehicle.images[0].image_url}
								/>
							)}
						</div>
						<div className="page-grid-top-right">
							<span
								style={{ marginBottom: `1rem` }}
								className="small-title green-text"
							>
								Up next
							</span>
							<div className="up-next-card-container overflow-hidden border-radius">
								{isLoaded &&
									Object.values(allVehicles).map((vehicle) => (
										<div
											className="up-next-card"
											key={vehicle.id}
										>
											<div
												style={{
													display: `flex`,
													flexDirection: `column`,
													justifyContent: `flex-end`,
												}}
											>
												<img
													style={{ width: `5rem` }}
													src={vehicle?.images[1]?.image_url}
												/>
											</div>
											<div style={{ paddingLeft: `1rem`, paddingTop: `1rem` }}>
												<div style={{ display: `inline-flex`, alignItems: `flex-end`}} className="bottom-spacing">
                                                    <i style={{ fontSize: `34px`, fontWeight: `200`}} class="cursor-pointer fa-regular fa-circle-play" onClick={() => {<Redirect to={vehicle?.dougscore?.video_link} />}} />
													<span style={{ marginLeft: `8px`}}>{vehicle?.dougscore?.video_time}</span>
												</div>
                                                <div className="cursor-pointer" onClick={() => history.push(`/vehicles/${vehicle?.id}`)}>
													<span>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}{" "}
													{vehicle.vehicle_country}</span>
                                                </div>
												Dougscore: {vehicle.dougscore.dougscore_total}
											</div>
										</div>
									))}
							</div>
							<span
								style={{ paddingLeft: `16px`, paddingTop: `16px` }}
								className="small-title cursor-pointer"
							>
								Browse vehicles &#8250;
							</span>
						</div>
					</div>
				</div>
				<div className="page-grid-content">
					<div className="page-grid-top">
						<div className="page-grid-top-image">
							<div className="page-grid-title">
								<span className="title">Featured Today</span>
								<div>
									<GridCard />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PageGrid;
