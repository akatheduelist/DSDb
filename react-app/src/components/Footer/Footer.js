import { useHistory, Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
	const history = useHistory();

	return (
		<>
			<footer className="footer-container center">
				<div className="footer-top">
					<button
						className="big-green-button small-bold"
						onClick={() => history.push("/login")}
					>
						Sign in for more access
					</button>
				</div>
				<div className="footer-social-icons">
					<Link
						to={{ pathname: "https://google.com/" }}
						target="_blank"
					>
						<i class="fa-brands fa-tiktok" />
					</Link>
					<Link
						to={{ pathname: "https://google.com/" }}
						target="_blank"
					>
						<i class="fa-brands fa-instagram" />
					</Link>
					<Link
						to={{ pathname: "https://google.com/" }}
						target="_blank"
					>
						<i class="fa-brands fa-twitter" />
					</Link>
					<Link
						to={{ pathname: "https://google.com/" }}
						target="_blank"
					>
						<i class="fa-brands fa-youtube" />
					</Link>
					<Link
						to={{ pathname: "https://google.com/" }}
						target="_blank"
					>
						<i class="fa-brands fa-square-facebook" />
					</Link>
				</div>
				<div className="footer-links-container">
					<div className="footer-links">
						react-slick
						<i class="fa-solid fa-arrow-up-right-from-square" /> slick-carousel
						<i class="fa-solid fa-arrow-up-right-from-square" />
					</div>
					<div className="footer-links">
						unsplash
						<i class="fa-solid fa-arrow-up-right-from-square" />
					</div>
					<div className="footer-links">
						requests
						<i class="fa-solid fa-arrow-up-right-from-square" />
					</div>
					<div className="footer-links">
						<span style={{ fontSize: `12px`, color: `#ffffff60`}}>
							2023 by Daniel Lewis <a href="https://github.com/akatheduelist">@akatheduelist</a> on GitHub
						</span>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
