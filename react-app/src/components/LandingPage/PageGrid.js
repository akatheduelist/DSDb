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
						<div className="page-grid-top-right overflow-hidden">
							<span
								style={{ marginBottom: `1rem` }}
								className="small-title green-text"
							>
								Up next
							</span>
							<div className="dark-grey-background">
								{/* {isLoaded &&
									Object.values(allVehicles).map((vehicle) => (
										<div
											className="up-next-card"
											key={vehicle.id}
										>
											<a href={`/vehicles/${vehicle.id}`}>
												{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}{" "}
												{vehicle.vehicle_country}
											</a>
											<span>Dougscore: {vehicle.dougscore.dougscore_total}</span>
										</div>
									))} */}
							</div>
							<span
								style={{ marginTop: `1rem`, paddingLeft: `16px`, paddingTop: `16px` }}
								className="small-title green-text"
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
