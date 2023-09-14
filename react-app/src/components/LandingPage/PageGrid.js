import GridCard from "./GridCard";
import "./LandingPage.css";

function PageGrid({ allVehicles, isLoaded, randomVehicle }) {
	return (
		<>
			<div className="page-grid-container">
				<div className="page-grid-content">
					<div className="page-grid-top">
						<div className="page-grid-top-image">
							{isLoaded && (
								<div className="page-grid-top-hero-video">
									<a href={`vehicles/${randomVehicle.id}`}>
										<img
											className="image-cover"
											src={randomVehicle.images[0].image_url}
										/>
									</a>
								</div>
							)}
						</div>
						<div className="page-grid-top-right">
							<span
								style={{ marginBottom: `1rem` }}
								className="small-title green-text"
							>
								Up next
							</span>
							<div className="up-next-card-container dark-grey-background overflow-hidden">
								{isLoaded &&
									Object.values(allVehicles).map((vehicle) => (
										<div
											className="up-next-card"
											key={vehicle.id}
										>
											<div style={{ display:`flex`, flexDirection: `column`, justifyContent: `flex-end`}}>
												<img
													style={{ width: `5rem` }}
													src={vehicle?.images[1]?.image_url}
												/>
											</div>
											<div style={{ paddingLeft: `1rem`, paddingTop: `1rem`}}>
												<div>
                                                    <a href={vehicle?.dougscore?.video_link}>PLAY</a> {vehicle?.dougscore?.video_time}
                                                </div>
                                                <a href={`/vehicles/${vehicle.id}`}>
													{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}{" "}
													{vehicle.vehicle_country}
												</a>
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
