import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
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

  // TODO Refactor -- Do we really need to know if the user is logged in to show the menu?
  // If the user isn't logged in they will not see this menu anyways, might be easier to simplify.
  return (
    <>
      <button onClick={openMenu}>
        <i className="font-mid-large fa-solid fa-circle-user" />{" "}
        <i className="font-small fa-solid fa-caret-down" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {showMenu ? (
          <>
            <li className="cursor-pointer hover-background">
              {user.full_name}
            </li>
            <li className="cursor-pointer hover-background">{user.email}</li>
            <li
              className="cursor-pointer hover-background"
              onClick={handleLogout}
            >
              Sign out
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => history.push("/login")}>Sign In</button>
            </li>
            <li>
              <button onClick={() => history.push("/signup")}>
                Create a New Account
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
