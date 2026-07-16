import { Link } from "react-router-dom";

function PerkCard({ perk, survivorName }) {
  return (
    <Link
      className="perk-card"
      to={`/perks/${perk.id}`}
      aria-label={`View ${perk.name}`}
    >
      {perk.image && (
        <img
          className="perk-card__image"
          src={perk.image}
          alt={`${perk.name} perk icon`}
        />
      )}

      <div className="perk-card__header">
        <span className="perk-card__category">
          {perk.tags.join(" • ")}
        </span>
      </div>

      <h2>{perk.name}</h2>

      <p className="perk-card__survivor">
        {survivorName
          ? `Survivor: ${survivorName}`
          : "General Survivor Perk"}
      </p>

      <p className="perk-card__summary">
        {perk.summary}
      </p>

      <span className="perk-card__link">
        View Perk
      </span>
    </Link>
  );
}

export default PerkCard;