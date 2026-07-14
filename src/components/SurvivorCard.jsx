function SurvivorCard({ survivor }) {
  return (
    <article className="survivor-card">
      <div className="survivor-card__header">
        <span className="survivor-card__role">{survivor.role}</span>
        <span className="survivor-card__id">#{survivor.id}</span>
      </div>

      <h2>{survivor.name}</h2>

      <p className="survivor-card__description">
        {survivor.description}
      </p>

      <div className="survivor-card__perks">
        <h3>Unique Perks</h3>

        <ul>
          {survivor.perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default SurvivorCard;