function VehicleHeader({ vehicle, sessionUser }) {
	return (
		<>
			<div
				style={{
					backgroundImage: vehicle?.images[1] ? `url(${vehicle?.images[1]?.image_url})` : `none`,
				}}
				className="vehicle-header-container"
			>
				<div
					style={{
						background: `#1f1f1f90`,
						backdropFilter: `blur(40px) saturate(100%)`,
						width: `100%`,
						height: `100%`,
						display: `flex`,
						flexDirection: `column`,
						justifyContent: `center`,
					}}
				>
					<div className="vehicle-header-content">
						<div className="vehicle-header-title">
							<span className="big-title">
								{vehicle?.make} {vehicle?.model}
							</span>
							<span className="mid-grey mid-bold">
								{vehicle?.year} <span>&#183;</span> {vehicle?.vehicle_country}
							</span>
						</div>
						<div className="vehicle-header-rating">
							<div className="rating-title mid-grey mid-bold">DOUGS RATING</div>
							<div className="vehicle-header-rating-content">
								<i
									style={{ fontSize: `22px`, marginRight: `6px` }}
									className="green-text fa-solid fa-star"
								/>
								<span
									style={{ fontSize: `22px` }}
									className="mid-bold"
								>
									{vehicle?.dougscore?.dougscore_total}
								</span>
								<span className="mid-grey">/10</span>
							</div>
						</div>
						<div className="vehicle-header-rating">
							<div className="rating-title mid-grey mid-bold">YOUR RATING</div>
							{sessionUser && vehicle?.reviews?.find((review) => review?.user_id === sessionUser?.id) ? (
								<div className="vehicle-header-rating-content">
									<i
										style={{ fontSize: `22px`, marginRight: `6px` }}
										className="green-text fa-solid fa-star"
									/>
									<span
										style={{ fontSize: `22px` }}
										className="mid-bold"
									>
										{vehicle?.reviews?.find((review) => review?.user_id === sessionUser?.id).rating}
									</span>
									<span className="mid-grey">/10</span>
								</div>
							) : (
								<div
									style={{ fontSize: `22px`, padding: `6px` }}
									className="green-text mid-bold"
								>
									<i class="fa-regular fa-star" /> <span style={{ fontWeight: `500` }}>Rate</span>
								</div>
							)}
						</div>
						<div className="vehicle-header-rating">
							<div className="rating-title mid-grey mid-bold">POPULARITY</div>
							{vehicle?.reviews ? (
								<div
									style={{ fontSize: `22px`, padding: `6px` }}
									className="mid-bold"
								>
									<i className="green-text fa-solid fa-fire" />{" "}
									<span>{vehicle?.reviews?.length}</span>
								</div>
							) : (
								<div
									style={{ fontSize: `22px`, padding: `6px` }}
									className="mid-bold"
								>
									<i className="green-text fa-regular fa-face-meh" />
									<span>Not enough data...</span>
								</div>
							)}
						</div>
					</div>
					<div className="vehicle-header-details">
						<div className="vehicle-header-details-poster">
							{vehicle.images[1] ? (
								<>
										<img
											className="vehicle-header-poster-img light-border-radius"
											src={vehicle?.images[1]?.image_url}
										/>
									<div className="vehicle-header-poster-img-text">
										<div style={{ color: `#1f1f1f88`, position: `absolute`, top: `25%`, fontSize: `22px`, textAlign: `center`}}><span className="title">{vehicle?.model}</span></div>
									</div>
								</>
							) : null}
						</div>
						<div className="vehicle-header-video-pane light-border-radius">
							<img
								className="vehicle-header-video-thumbnail"
								src={vehicle?.images[0].image_url}
							/>
						</div>
						<div className="vehicle-header-pv-container">
							<div className="header-details-pv"><i class="fa-solid fa-film" /></div>
							<div className="header-details-pv"><i class="fa-solid fa-photo-film" /></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default VehicleHeader;
