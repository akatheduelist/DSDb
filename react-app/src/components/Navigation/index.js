import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/dsdb_logo.svg";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await fetch("/api/vehicles/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search,
      }),
    });
    const data = await result.json();
    if (data.errors) {
      window.alert(Object.values(data.errors));
    } else {
      history.push({ pathname: "/search", state: { search: data } });
    }
  };

  return (
    <nav className="nav-bar">
      <a href="/">
        <img className="nav-bar-logo" src={logo} alt="DSDb logo" />
      </a>
      <form className="nav-bar-search" onSubmit={handleSearch}>
        <input
          className="nav-bar-search-input"
          placeholder="Search DSDb"
          name="searched"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i
          onClick={handleSearch}
          className="nav-bar-search-button cursor-pointer fa-solid fa-magnifying-glass"
        />
      </form>
      <div className="nav-bar-user">
        <ul>
          {isLoaded && sessionUser ? (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          ) : (
            <>
              <NavLink to="/login" className="">
                Sign In
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
