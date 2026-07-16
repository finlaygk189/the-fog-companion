function PerkCard({ perk, survivorName }) {
  return (
    <article className="perk-card">
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

      <p className="perk-card__summary">{perk.summary}</p>
    </article>
  );
}

export default PerkCard;