import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/dsdb_logo.svg"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<nav className="nav-bar">
			<div className="nav-bar-content">
					<a href="/"><img className="nav-bar-logo" src={logo} /></a>
					<span>Menu</span>
				<div class="nav-bar-search-container">
						<input class="nav-bar-search-input" placeholder="Search DSDb"></input>
				</div>
				<div class="nav-bar-separator"></div>
				<div class="nav-bar-user">
					<ul>
						{isLoaded && sessionUser ? (
							<li>
								<ProfileButton user={sessionUser}>ME</ProfileButton>
							</li>
						) : <NavLink to="/login" style={{ fontSize: `14px`}} className="white-text mid-bold">Signin</NavLink>}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
