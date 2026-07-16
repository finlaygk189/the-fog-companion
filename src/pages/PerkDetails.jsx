import { Link, useParams } from "react-router-dom";
import perks from "../data/perks.json";
import survivors from "../data/survivors.json";
import "../styles/perk-details.css";

function PerkDetails() {
  const { perkId } = useParams();

  const perk = perks.find(
    (currentPerk) => currentPerk.id === perkId
  );

  if (!perk) {
    return (
      <main className="perk-details">
        <section className="perk-not-found">
          <h1>Perk not found</h1>
          <p>
            The requested perk does not exist in the current database.
          </p>

          <Link className="details-back-link" to="/perks">
            Return to Perks
          </Link>
        </section>
      </main>
    );
  }

  const survivor = survivors.find(
    (currentSurvivor) =>
      currentSurvivor.id === perk.survivorId
  );

  return (
    <main className="perk-details">
      <Link className="details-back-link" to="/perks">
        ← Back to Perks
      </Link>

      <article className="perk-details__card">
        <div className="perk-details__content">
          <p className="perk-details__eyebrow">
            SURVIVOR PERK
          </p>

          <h1>{perk.name}</h1>

          <p className="perk-details__owner">
            {survivor
              ? `Unique perk of ${survivor.name}`
              : "General Survivor perk"}
          </p>

          <p className="perk-details__summary">
            {perk.summary}
          </p>

          <div className="perk-details__tags">
            {perk.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          {survivor && (
            <Link
              className="perk-details__survivor-link"
              to={`/survivors/${survivor.id}`}
            >
              View {survivor.name}
            </Link>
          )}
        </div>
      </article>
    </main>
  );
}

export default PerkDetails;