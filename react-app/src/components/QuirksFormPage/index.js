import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getVehicleReviews } from "../../store/vehicle";
import "./QuirksForm.css";

function QuirksFormPage({ vehicleId }) {
	const dispatch = useDispatch();
    const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [quirk, setQuirk] = useState("");
	const [quirkImage, setQuirkImage] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await fetch(`/api/vehicles/${vehicleId}/quirks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				quirk,
				quirkImage,
			}),
		});
		if (data.errors) {
			setErrors(data.errors);
		} else {
            return <Redirect to='/' />
		}
		}
		return (
			<>
				<h1>Quirks and Features</h1>
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label>
						Quirk
						<input
							type="text"
							value={quirk}
							onChange={(e) => setQuirk(e.target.value)}
							required
						/>
					</label>
					<label>
						Image
						<input
							type="text"
							value={image}
							onChange={(e) => setQuirkImage(e.target.value)}
							required
						/>
					</label>
					<button type="submit">Submit</button>
				</form>
			</>
		);
	};

export default QuirksFormPage;
