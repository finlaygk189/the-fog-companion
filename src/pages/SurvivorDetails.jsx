import { Link, useParams } from "react-router-dom";
import survivors from "../data/survivors.json";
import perks from "../data/perks.json";
import PerkCard from "../components/PerkCard";
import "../styles/survivor-details.css";

function SurvivorDetails() {
  const { survivorId } = useParams();

  const survivor = survivors.find(
    (currentSurvivor) => currentSurvivor.id === survivorId
  );

  if (!survivor) {
    return (
      <main className="survivor-details">
        <section className="survivor-not-found">
          <h1>Survivor not found</h1>

          <p>
            The Survivor you requested does not exist in the current database.
          </p>

          <Link className="details-back-link" to="/survivors">
            Return to Survivors
          </Link>
        </section>
      </main>
    );
  }

  const uniquePerks = survivor.perkIds
    .map((perkId) => perks.find((perk) => perk.id === perkId))
    .filter(Boolean);

  return (
    <main className="survivor-details">
      <Link className="details-back-link" to="/survivors">
        ← Back to Survivors
      </Link>

      <header className="survivor-details__header">
        {survivor.image && (
          <img
            className="survivor-details__image"
            src={survivor.image}
            alt={survivor.name}
          />
        )}

        <div>
          <p className="survivor-details__role">{survivor.role}</p>

          <h1>{survivor.name}</h1>

          <p className="survivor-details__description">
            {survivor.description}
          </p>
        </div>
      </header>

      <section className="survivor-details__perks">
        <div className="section-heading">
          <p>UNIQUE PERKS</p>
          <h2>{survivor.name}'s perks</h2>
        </div>

        <div className="survivor-perk-grid">
          {uniquePerks.map((perk) => (
            <PerkCard
              key={perk.id}
              perk={perk}
              survivorName={survivor.name}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SurvivorDetails;