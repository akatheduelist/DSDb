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
                            <GridCard allVehicles={allVehicles} />
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
						<div className="page-grid-title">
							<span className="title">Featured Today</span>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PageGrid;
