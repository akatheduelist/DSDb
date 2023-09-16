import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<>
			<button style={{ fontSize: `14px`}} className="no-button white-text mid-bold" onClick={openMenu}>
				{user.username}
			</button>
			<ul
				className={ulClassName}
				ref={ulRef}
			>
				{user ? (
					<>
						<li>{user.full_name}</li>
						<li>{user.email}</li>
						<li>
							<button onClick={handleLogout}>Log Out</button>
						</li>
					</>
				) : (
					<>
						{/* <OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormPage />}
						/> */}
						<button onClick={() => history.push("/login")}>Sign In</button>

						{/* <OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    /> */}
						<button onClick={() => history.push("/signup")}>Create a New Account</button>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
