import { useState } from "react";
import survivors from "../data/survivors.json";
import SurvivorCard from "../components/SurvivorCard";
import "../styles/survivors.css";

function Survivors() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSurvivors = survivors.filter((survivor) => {
    const searchableText =
      `${survivor.name} ${survivor.role} ${survivor.perks.join(" ")}`.toLowerCase();

    return searchableText.includes(searchTerm.toLowerCase());
  });

  return (
    <main className="survivors-page">
      <header className="page-header">
        <p className="page-header__eyebrow">CHARACTER DATABASE</p>
        <h1>Survivors</h1>
        <p>
          Browse survivors, their roles and their unique perks.
        </p>
      </header>

      <input
        className="survivor-search"
        type="search"
        placeholder="Search survivors or perks..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <p className="survivor-results">
        Showing {filteredSurvivors.length} of {survivors.length} survivors
      </p>

      <section className="survivor-grid">
        {filteredSurvivors.map((survivor) => (
          <SurvivorCard
            key={survivor.id}
            survivor={survivor}
          />
        ))}
      </section>

      {filteredSurvivors.length === 0 && (
        <p className="no-results">
          No survivors matched your search.
        </p>
      )}
    </main>
  );
}

export default Survivors;