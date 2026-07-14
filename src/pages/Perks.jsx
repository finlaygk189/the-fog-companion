import { useState } from "react";
import perks from "../data/perks.json";
import PerkCard from "../components/PerkCard";
import "../styles/perks.css";

function Perks() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPerks = perks.filter((perk) => {
    const searchableText =
      `${perk.name} ${perk.survivor} ${perk.category}`.toLowerCase();

    return searchableText.includes(searchTerm.toLowerCase());
  });

  return (
    <main className="perks-page">
      <header className="page-header">
        <p className="page-header__eyebrow">SURVIVOR DATABASE</p>
        <h1>Perks</h1>
        <p>
          Search survivor perks by name, character or category.
        </p>
      </header>

      <input
        className="perk-search"
        type="search"
        placeholder="Search perks..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <p className="perk-results">
        Showing {filteredPerks.length} of {perks.length} perks
      </p>

      <section className="perk-grid">
        {filteredPerks.map((perk) => (
          <PerkCard key={perk.id} perk={perk} />
        ))}
      </section>

      {filteredPerks.length === 0 && (
        <p className="no-results">
          No perks matched your search.
        </p>
      )}
    </main>
  );
}

export default Perks;