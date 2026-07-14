import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <h2>The Fog Companion</h2>
        <p>Dead by Daylight toolkit</p>
      </div>

      <nav className="sidebar__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/survivors"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          Survivors
        </NavLink>

        <NavLink
          to="/perks"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          Perks
        </NavLink>

        <NavLink
          to="/generator"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          Build Generator
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;