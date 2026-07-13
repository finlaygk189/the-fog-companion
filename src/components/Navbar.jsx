import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>DBD Companion</h2>

      <Link to="/">Home</Link>
      <Link to="/survivors">Survivors</Link>
      <Link to="/perks">Perks</Link>
      <Link to="/generator">Generator</Link>
    </nav>
  );
}

export default Navbar;