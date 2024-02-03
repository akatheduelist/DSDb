import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import logo from "../../images/dsdb_logo.svg";
import Error from "../Error";
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
			}
		} else {
			const confirmPassword = {
				...errors,
				confirm_password: "Confirm Password field must be the same as the Password field",
			};
			setErrors(confirmPassword);
		}
	};

	return (
		<>
			{Object.values(errors).length > 0 ? (<Error errors={errors} />) : null}
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto w-auto"
						src={logo}
						alt="DSDb Logo"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create an account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit} noValidate>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Your name
							</label>
							<div className="mt-2">
								<input
									id="name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
									name="name"
									type="text"
									autoComplete="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								{errors.name ? <span className="text-sm text-red-700">{errors.name}</span> : null}
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email
							</label>
							<div className="mt-2">
								<input
									id="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
									name="email"
									type="email"
									autoComplete="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
																{errors.email ? <span className="text-sm text-red-700">{errors.email}</span> : null}

							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
							<div className="mt-2">
								<input
									id="password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
									name="password"
									type="password"
									autoComplete="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								{errors.password ? <span className="text-sm text-red-700">{errors.password}</span> : null}
							</div>
						</div>


						<div>
							<label htmlFor="repassword" className="block text-sm font-medium leading-6 text-gray-900">
								Re-enter password
							</label>
							<div className="mt-2">
								<input
									id="repassword"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
									name="repassword"
									type="password"
									autoComplete="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
								{errors.confirm_password ? <span className="text-sm text-red-700">{errors.confirm_password}</span> : null}
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
							>
								Create your DSDb account
							</button>
						</div>
						<p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400">
						Sign in with your DSDb account
            </Link>
          </p>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupFormPage;
