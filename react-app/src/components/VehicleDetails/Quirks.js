import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";

function Quirks({ vehicleIsLoaded, sessionUser, vehicle, vehicleId, OpenModalButton, DeleteItemModal }) {
	const dispatch = useDispatch();
	const [newQuirk, setNewQuirk] = useState(false);
	const [newQuirkData, setNewQuirkData] = useState("");
	const [editQuirk, setEditQuirk] = useState(false);
	const [updateQuirkId, setUpdateQuirkId] = useState();
	const [updateQuirk, setUpdateQuirk] = useState("");
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (editQuirk && sessionUser) {
			const editQuirk = await fetch(`/api/quirks/${updateQuirkId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: sessionUser.id,
					vehicle_id: vehicleId,
					quirk: updateQuirk,
				}),
			});
			const data = await editQuirk.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId));
				setEditQuirk(!editQuirk);
			}
		}

		console.log(newQuirkData);
		if (!editQuirk && sessionUser) {
			const newQuirk = await fetch(`/api/vehicles/${vehicleId}/quirks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					quirk: newQuirkData,
				}),
			});
			const data = newQuirk.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId));
				setNewQuirk(!newQuirk);
			}
		}
	};

	return (
		<>
			<div className="vehicle-details-title">
				<div style={{ display: `inline-flex`, alignItems: `center` }}>
					<span className="title green-text mid-bold">|</span>&nbsp;
					<span className="title">Quirks and Features</span>&nbsp;&nbsp;
					<span style={{ fontSize: `12px` }}>{vehicle?.quirks?.length}</span>
                    <i style={{fontSize: `32px`}} className="fa-solid fa-angle-right" />				</div>
				<div>
					<button
						className="no-button green-link"
						onClick={() => {
							setNewQuirk(!newQuirk);
						}}
					>
						+ Quirk or Feature
					</button>
				</div>
			</div>
			<div className="vehicle-user-reviews-container">
				{vehicleIsLoaded && newQuirk ? (
					<div
						style={{
							padding: `.75rem`,
							marginBottom: `8px`,
							borderBottom: `1px solid #00000060`,
							display: `inline-flex`,
							alignItems: `center`,
							justifyContent: `space-between`,
							width: `100%`,
						}}
					>
						<i className="green-text fa-solid fa-certificate" />
						&nbsp;
						<form
							style={{ display: `inline-flex`, width: `100%`, alignItems: `center` }}
							onSubmit={handleSubmit}
						>
							<input
								style={{ width: `100%` }}
								value={newQuirkData}
								onChange={(e) => setNewQuirkData(e.target.value)}
							></input>
							&nbsp;
							<button
								className="green-background mid-bold"
								style={{ margin: `0px, 6px`, width: `4rem` }}
								type="submit"
							>
								Submit
							</button>
							{errors?.quirk ? <span>{errors.quirk}</span> : null}
						</form>
					</div>
				) : null}
				{vehicleIsLoaded &&
					Object.values(vehicle.quirks)
						.reverse()
						.map(({ id, quirk, user_id }) => (
							<div key={id}>
								{editQuirk && updateQuirkId === id ? (
									<div
										style={{
											padding: `.75rem`,
											marginBottom: `8px`,
											borderBottom: `1px solid #00000060`,
											display: `inline-flex`,
											alignItems: `center`,
											justifyContent: `space-between`,
											width: `100%`,
										}}
									>
										<i className="green-text fa-solid fa-certificate" />
										&nbsp;
										<form style={{ display: `inline-flex`, width: `100%`, alignItems: `center` }} onSubmit={handleSubmit}>
											<input
												id={id}
                                                style={{ width: `100%` }}
												value={updateQuirk}
												onChange={(e) => setUpdateQuirk(e.target.value)}
											></input>
											<button className="green-background mid-bold"
								style={{ margin: `0px, 6px`, width: `4rem` }} type="submit">Submit</button>
											{errors?.quirk ? <span>{errors.quirk}</span> : null}
										</form>
									</div>
								) : (
									<div
										style={{
											display: `inline-flex`,
											justifyContent: `space-between`,
											width: `100%`,
											padding: `.75rem`,
											marginBottom: `8px`,
											borderBottom: `1px solid #00000060`,
										}}
									>
										<div>
											<i className="green-text fa-solid fa-certificate" />
											&nbsp;{quirk}
										</div>
										{sessionUser && sessionUser.id === user_id ? (
											<div>
												<button
													className="no-button mid-bold"
													onClick={() => {
														setEditQuirk(!editQuirk);
														setUpdateQuirkId(id);
														setUpdateQuirk(quirk);
													}}
												>
													Update
												</button>
												<OpenModalButton
													buttonText="Delete Quirk"
													buttonClass="no-button mid-bold"
													modalComponent={<DeleteItemModal quirkId={id} />}
												/>
											</div>
										) : null}
									</div>
								)}
							</div>
						))}
			</div>
		</>
	);
}

export default Quirks;
