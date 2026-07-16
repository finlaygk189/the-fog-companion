import { useEffect, useState } from "react";
import perks from "../data/perks.json";
import survivors from "../data/survivors.json";
import PerkCard from "../components/PerkCard";
import "../styles/perks.css";

const PERKS_PER_PAGE = 24;

function Perks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  function getSurvivorName(survivorId) {
    const survivor = survivors.find(
      (currentSurvivor) => currentSurvivor.id === survivorId
    );

    return survivor?.name ?? null;
  }

  const tags = [
    "All",
    ...new Set(perks.flatMap((perk) => perk.tags)),
  ].sort((firstTag, secondTag) => {
    if (firstTag === "All") return -1;
    if (secondTag === "All") return 1;

    return firstTag.localeCompare(secondTag);
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
      searchTerm.trim().toLowerCase()
    );

    const matchesTag =
      selectedTag === "All" || perk.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPerks.length / PERKS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * PERKS_PER_PAGE;
  const visiblePerks = filteredPerks.slice(
    startIndex,
    startIndex + PERKS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedTag("All");
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="perks-page">
      <header className="page-header">
        <p className="page-header__eyebrow">SURVIVOR DATABASE</p>

        <h1>Perks</h1>

        <p>
          Search Survivor perks by name, character, description or category.
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
          disabled={searchTerm === "" && selectedTag === "All"}
        >
          Clear Filters
        </button>
      </section>

      <div className="perk-results-row">
        <p className="perk-results">
          Showing {visiblePerks.length} of {filteredPerks.length} matching perks
        </p>

        <p className="perk-page-count">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {visiblePerks.length > 0 ? (
        <>
          <section className="perk-grid">
            {visiblePerks.map((perk) => (
              <PerkCard
                key={perk.id}
                perk={perk}
                survivorName={getSurvivorName(perk.survivorId)}
              />
            ))}
          </section>

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Perk pages">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </>
      ) : (
        <section className="no-results">
          <h2>No perks found</h2>
          <p>Try changing your search term or selected category.</p>

          <button type="button" onClick={clearFilters}>
            Reset Filters
          </button>
        </section>
      )}
    </main>
  );
}

export default Perks;