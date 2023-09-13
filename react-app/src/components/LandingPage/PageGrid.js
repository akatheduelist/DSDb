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
						<div className="page-grid-top-right overflow-auto">
							<div className="page-grid-title">
								<span className="title">Up next</span>
							</div>
							{isLoaded &&
								Object.values(allVehicles).map((vehicle) => (
									<div key={vehicle.id}>
										<a href={`/vehicles/${vehicle.id}`}>
											{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}{" "}
											{vehicle.vehicle_country}
										</a>
										<span>Dougscore: {vehicle.dougscore.dougscore_total}</span>
									</div>
								))}
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
