import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Footer.css";

function Footer() {
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<>
			<footer className="footer-container center">
				<div className="footer-top">
					{sessionUser ? null : <button
						className="big-green-button small-bold"
						onClick={() => history.push("/login")}
					>
						Sign in for more access
					</button>}
				</div>
				<div className="footer-social-icons">
					<Link
						to={{ pathname: "https://www.tiktok.com/@thisisdougdemuro" }}
						target="_blank"
					>
						<i className="fa-brands fa-tiktok" />
					</Link>
					<Link
						to={{ pathname: "https://www.instagram.com/dougdemuro/" }}
						target="_blank"
					>
						<i className="fa-brands fa-instagram" />
					</Link>
					<Link
						to={{ pathname: "https://twitter.com/DougDeMuro" }}
						target="_blank"
					>
						<i className="fa-brands fa-twitter" />
					</Link>
					<Link
						to={{ pathname: "https://www.youtube.com/@DougDeMuro" }}
						target="_blank"
					>
						<i className="fa-brands fa-youtube" />
					</Link>
					<Link
						to={{ pathname: "https://www.facebook.com/ddemuro/" }}
						target="_blank"
					>
						<i className="fa-brands fa-square-facebook" />
					</Link>
				</div>
				<div className="footer-links-container">
                        <div className="footer-links">
                            <span>Created using...</span>
                        </div>
					<div className="footer-links">
						react-slick
                        <Link
							to={{ pathname: "https://www.npmjs.com/package/react-slick" }}
							target="_blank"
						>
							<i className="fa-solid fa-arrow-up-right-from-square" />
						</Link>
                        slick-carousel
						<Link
							to={{ pathname: "https://www.npmjs.com/package/slick-carousel" }}
							target="_blank"
						>
							<i className="fa-solid fa-arrow-up-right-from-square" />
						</Link>{" "}
					</div>
					<div className="footer-links">
						unsplash
                        <Link
							to={{ pathname: "https://unsplash.com/" }}
							target="_blank"
						>
							<i className="fa-solid fa-arrow-up-right-from-square" />
						</Link>{" "}
					</div>
					<div className="footer-links">
						requests
                        <Link
							to={{ pathname: "https://pypi.org/project/requests/" }}
							target="_blank"
						>
							<i className="fa-solid fa-arrow-up-right-from-square" />
						</Link>{" "}
                        Dougscore
                        <Link
							to={{ pathname: "https://docs.google.com/spreadsheets/d/1HcFstlJdQMlMEWhbdKXZWdAzR5RFMtj3kywLQcgkGPw/edit#gid=0" }}
							target="_blank"
						>
							<i className="fa-solid fa-arrow-up-right-from-square" />
						</Link>{" "}
					</div>
					<div className="footer-links">
						<span style={{ fontSize: `12px`, color: `#ffffff60` }}>
							2023 by Daniel Lewis <a href="https://github.com/akatheduelist">@akatheduelist</a> on GitHub
						</span>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
