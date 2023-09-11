import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<nav className="nav-bar">
			<div className="nav-bar-content">
					<img src="https://placehold.co/64x32.png" />
					<span>Menu</span>
				<div class="nav-bar-search-container">
						<input class="nav-bar-search-input"></input>
				</div>
				<div class="nav-bar-dsdbpro">
					<span>DSDb Pro</span>
				</div>
				<div class="nav-bar-separator"></div>
				<div class="nav-bar-user">
					<ul>
						{isLoaded && (
							<li>
								<ProfileButton user={sessionUser} />
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
