import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar__title">The Fog Companion</h2>

      <Link className="navbar__link" to="/">
        Home
      </Link>

      <Link className="navbar__link" to="/survivors">
        Survivors
      </Link>

      <Link className="navbar__link" to="/perks">
        Perks
      </Link>

      <Link className="navbar__link" to="/generator">
        Generator
      </Link>
    </nav>
  );
}

export default Navbar;