import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(name, email, password));
			if (data) {
				setErrors(data);
                console.log(errors)
			}
		} else {
            const confirmPassword = {...errors, "confirm_password": "Confirm Password field must be the same as the Password field"}
			setErrors(confirmPassword);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Your name
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					{errors.name ? <span>{errors.name}</span> : null}
				</label>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{errors.email ? <span>{errors.email}</span> : null}
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{errors.password ? <span>{errors.password}</span> : null}
				</label>
				<label>
					Re-enter Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					{errors.password ? <span>{errors.password}</span> : null}
                    {errors.confirm_password ? <span>{errors.confirm_password}</span> : null}
				</label>
				<button type="submit">Create your DSDb account</button>
			</form>
		</>
	);
}

export default SignupFormPage;
