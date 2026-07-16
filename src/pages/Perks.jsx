import { useState } from "react";
import perks from "../data/perks.json";
import survivors from "../data/survivors.json";
import PerkCard from "../components/PerkCard";
import "../styles/perks.css";

function Perks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  function getSurvivorName(survivorId) {
    const survivor = survivors.find(
      (currentSurvivor) => currentSurvivor.id === survivorId
    );

    return survivor?.name ?? null;
  }

  const tags = [
    "All",
    ...new Set(perks.flatMap((perk) => perk.tags)),
  ].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;

    return a.localeCompare(b);
  });

  const filteredPerks = perks.filter((perk) => {
    const survivorName = getSurvivorName(perk.survivorId) ?? "General";

    const searchableText = [
      perk.name,
      survivorName,
      perk.tags.join(" "),
      perk.summary,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(
      searchTerm.toLowerCase()
    );

    const matchesTag =
      selectedTag === "All" || perk.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  function clearFilters() {
    setSearchTerm("");
    setSelectedTag("All");
  }

  return (
    <main className="perks-page">
      <header className="page-header">
        <p className="page-header__eyebrow">
          SURVIVOR DATABASE
        </p>

        <h1>Perks</h1>

        <p>
          Search Survivor perks by name, character, description or
          category.
        </p>
      </header>

      <section className="perk-filters">
        <input
          className="perk-search"
          type="search"
          placeholder="Search perks..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          className="perk-tag-filter"
          value={selectedTag}
          onChange={(event) => setSelectedTag(event.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === "All" ? "All categories" : tag}
            </option>
          ))}
        </select>

        <button
          className="clear-filter-button"
          type="button"
          onClick={clearFilters}
          disabled={
            searchTerm.length === 0 && selectedTag === "All"
          }
        >
          Clear Filters
        </button>
      </section>

      <p className="perk-results">
        Showing {filteredPerks.length} of {perks.length} perks
      </p>

      {filteredPerks.length > 0 ? (
        <section className="perk-grid">
          {filteredPerks.map((perk) => (
            <PerkCard
              key={perk.id}
              perk={perk}
              survivorName={getSurvivorName(perk.survivorId)}
            />
          ))}
        </section>
      ) : (
        <section className="no-results">
          <h2>No perks found</h2>

          <p>
            Try changing your search term or selecting another
            category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
          >
            Reset Filters
          </button>
        </section>
      )}
    </main>
  );
}

export default Perks;