import { Link } from "react-router-dom";

function SurvivorCard({ survivor, perks }) {
  const survivorPerks = survivor.perkIds
    .map((perkId) => perks.find((perk) => perk.id === perkId))
    .filter(Boolean);

  return (
    <article className="survivor-card">
      {survivor.image && (
        <img
          className="survivor-card__image"
          src={survivor.image}
          alt={survivor.name}
        />
      )}

      <div className="survivor-card__header">
        <span className="survivor-card__role">
          {survivor.role}
        </span>
      </div>

      <h2>{survivor.name}</h2>

      <p className="survivor-card__description">
        {survivor.description}
      </p>

      <div className="survivor-card__perks">
        <h3>Unique Perks</h3>

        <ul>
          {survivorPerks.map((perk) => (
            <li key={perk.id}>{perk.name}</li>
          ))}
        </ul>
      </div>

      <Link
        className="survivor-card__link"
        to={`/survivors/${survivor.id}`}
      >
        View Survivor
      </Link>
    </article>
  );
}

export default SurvivorCard;