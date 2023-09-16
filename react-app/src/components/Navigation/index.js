import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/dsdb_logo.svg";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<nav className="nav-bar">
			<div className="nav-bar-content">
				<span>
					<a href="/">
						<img
							className="nav-bar-logo"
							src={logo}
						/>
					</a>
				</span>
				<span className="hover-background cursor-pointer border-radius" style={{ padding: `8px 16px`, fontSize: `15px` }}>
					<i class="fa-solid fa-bars" /> Menu
				</span>
				<div class="nav-bar-search-container">
					<input
						class="nav-bar-search-input"
						placeholder="Search DSDb"
					></input>
				</div>
                <span  className="hover-background cursor-pointer border-radius" style={{ padding: `8px 16px`, fontSize: `17px`, fontFamily: `impact` }}>DSDb<span className="green-text">Pro</span></span>
				<div class="nav-bar-separator"></div>
				<div>
                <span className="hover-background cursor-pointer border-radius" style={{ padding: `8px 16px`, fontSize: `15px` }}>
						<i class="fa-solid fa-bookmark" />{"  "}Watchlist
					</span>
				</div>
				<div class="nav-bar-user">
					<ul>
						{isLoaded && sessionUser ? (
							<li>
								<ProfileButton user={sessionUser} />
							</li>
						) : (
                            <span className="hover-background cursor-pointer border-radius" style={{ padding: `8px 16px`, fontSize: `15px` }}>
							<NavLink
								to="/login"
								className="white-text"
							>
								Sign In
							</NavLink>
                            </span>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
