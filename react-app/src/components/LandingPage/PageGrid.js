import "./LandingPage.css";


function PageGrid({ allVehicles, isLoaded }) {
    return (
        <>
			<div className="page-grid-container">
				<div className="page-grid-content">
					<div className="page-grid-top">
						<div className="page-grid-top-image">
                                {isLoaded && 
							        <div className="page-grid-top-hero-video">
                                    <a href={`vehicles/${(Object.values(allVehicles)[Math.floor(Math.random() * Object.values(allVehicles).length)].id)}`}><img src={(Object.values(allVehicles)[Math.floor(Math.random() * Object.values(allVehicles).length)].images[0].image_url)} /></a>
                                    </div>
                                }
						</div>
						<div className="page-grid-top-right">
							<h2>Up next</h2>
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
			</div>
		</>
	);
}

export default PageGrid;
