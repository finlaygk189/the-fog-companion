function PerkCard({ perk }) {
  return (
    <article className="perk-card">
      <div className="perk-card__header">
        <span className="perk-card__category">{perk.category}</span>
        <span className="perk-card__id">#{perk.id}</span>
      </div>

      <h2>{perk.name}</h2>

      <p className="perk-card__survivor">
        Survivor: {perk.survivor}
      </p>

      <p className="perk-card__summary">
        {perk.summary}
      </p>
    </article>
  );
}

export default PerkCard;