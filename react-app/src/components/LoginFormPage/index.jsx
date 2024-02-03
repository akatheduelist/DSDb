import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import Error from "../Error";
import logo from "../../images/dsdb_logo.svg";

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
		{Object.values(errors).length ? (<Error errors={errors} />) : null}
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
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
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-emerald-500 hover:text-emerald-400">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
                  name="password"
                  type="password"
                  autoComplete="current-password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                Sign in
              </button>
							<button
						className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
						type="submit"
						onClick={() => {
							setEmail("demo@aa.io");
							setPassword("password");
						}}
					>
						Demo User
					</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400">
						Create your DSDb account
            </Link>
          </p>
        </div>
      </div>
		</>
	);
}

export default LoginFormPage;
