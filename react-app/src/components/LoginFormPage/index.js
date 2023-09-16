import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import logo from "../../images/dsdb_logo.svg";
import "./LoginForm.css";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

    if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	return (
		<>
			<div className="signup-component-container">
				<div className="signup-top-logo center">
					<a href="/">
						<img
							style={{ width: `107px` }}
							src={logo}
						/>
					</a>
				</div>
				{Object.values(errors).length && (
					<div className="error-box bottom-spacing center">
						<div>
							<i
								style={{ fontSize: `32px` }}
								className="error fa-solid fa-triangle-exclamation"
							></i>
						</div>
						<div style={{ paddingLeft: `13px` }}>
							<span
								style={{ fontSize: `22px` }}
								className="error"
							>
								There was a problem
							</span>
							<ul>
								{Object.values(errors)?.map((error, idx) => (
									<li
										style={{ fontSize: `14px` }}
										className="arial"
										key={idx}
									>
										{error}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
				<form
					className="signup-form"
					onSubmit={handleSubmit}
					noValidate
				>
					<h1>Sign in</h1>
					<label>
						Email
						<input
							type="text"
							className="bottom-spacing"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{/* {errors.email ? <span>{errors.email}</span> : null} */}
					</label>
					<label>
						Password
						<input
							type="password"
							className="bottom-spacing"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<button
						className="green-background bottom-spacing"
						type="submit"
					>
						Sign In
					</button>
					<button
						className="green-background bottom-spacing"
						type="submit"
						onClick={() => {
							setEmail("demo@aa.io");
							setPassword("password");
						}}
					>
						Demo User
					</button>
					<br />
					<div style={{textAlign: `center`}}>
						<span
							style={{ fontSize: `14px` }}
							className="arial"
						>
							New to DSDb?
						</span>
					</div>
					<button type="submit">Create your DSDb account</button>
				</form>
			</div>
		</>
	);
}

export default LoginFormPage;
