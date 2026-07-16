import { useState } from "react";
import survivors from "../data/survivors.json";
import perks from "../data/perks.json";
import SurvivorCard from "../components/SurvivorCard";
import "../styles/survivors.css";

function Survivors() {
  const [searchTerm, setSearchTerm] = useState("");

  function getSurvivorPerkNames(survivor) {
    return survivor.perkIds
      .map((perkId) => perks.find((perk) => perk.id === perkId)?.name)
      .filter(Boolean)
      .join(" ");
  }

  const filteredSurvivors = survivors.filter((survivor) => {
    const searchableText = [
      survivor.name,
      survivor.role,
      survivor.description,
      getSurvivorPerkNames(survivor),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm.toLowerCase());
  });

  return (
    <main className="survivors-page">
      <header className="page-header">
        <p className="page-header__eyebrow">CHARACTER DATABASE</p>
        <h1>Survivors</h1>

        <p>Browse Survivors, their roles and their unique perks.</p>
      </header>

      <input
        className="survivor-search"
        type="search"
        placeholder="Search survivors or perks..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <p className="survivor-results">
        Showing {filteredSurvivors.length} of {survivors.length} Survivors
      </p>

      <section className="survivor-grid">
        {filteredSurvivors.map((survivor) => (
          <SurvivorCard
            key={survivor.id}
            survivor={survivor}
            perks={perks}
          />
        ))}
      </section>

      {filteredSurvivors.length === 0 && (
        <p className="no-results">
          No Survivors matched your search.
        </p>
      )}
    </main>
  );
}

export default Survivors;