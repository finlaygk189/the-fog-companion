import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="hero__eyebrow">ENTER THE FOG</p>

        <h1 className="hero__title">
          Build smarter.
          <br />
          Survive longer.
        </h1>

        <p className="hero__description">
          Browse survivor perks, explore characters and generate new builds for
          your next trial.
        </p>

        <div className="hero__actions">
          <Link className="button button--primary" to="/generator">
            Generate a Build
          </Link>

          <Link className="button button--secondary" to="/perks">
            Browse Perks
          </Link>
        </div>
      </section>

      <section className="quick-access">
        <div className="section-heading">
          <p>QUICK ACCESS</p>
          <h2>Explore the companion</h2>
        </div>

        <div className="dashboard-grid">
          <Link className="dashboard-card" to="/survivors">
            <span className="dashboard-card__number">01</span>
            <h3>Survivors</h3>
            <p>Explore survivors and their unique teachable perks.</p>
          </Link>

          <Link className="dashboard-card" to="/perks">
            <span className="dashboard-card__number">02</span>
            <h3>Perks</h3>
            <p>Search and browse the survivor perk collection.</p>
          </Link>

          <Link className="dashboard-card" to="/generator">
            <span className="dashboard-card__number">03</span>
            <h3>Build Generator</h3>
            <p>Create a random survivor build for your next match.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;