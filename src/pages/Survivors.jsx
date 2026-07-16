import { useState } from "react";
import survivors from "../data/survivors.json";
import perks from "../data/perks.json";
import SurvivorCard from "../components/SurvivorCard";
import "../styles/survivors.css";

function Survivors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-ascending");
  const [selectedTag, setSelectedTag] = useState("All");

  function getSurvivorPerks(survivor) {
    return survivor.perkIds
      .map((perkId) => perks.find((perk) => perk.id === perkId))
      .filter(Boolean);
  }

  function getSurvivorPerkNames(survivor) {
    return getSurvivorPerks(survivor)
      .map((perk) => perk.name)
      .join(" ");
  }

  function getSurvivorTags(survivor) {
    return getSurvivorPerks(survivor).flatMap((perk) => perk.tags);
  }

  const tags = [
    "All",
    ...new Set(perks.flatMap((perk) => perk.tags)),
  ].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;

    return a.localeCompare(b);
  });

  const filteredSurvivors = survivors
    .filter((survivor) => {
      const searchableText = [
        survivor.name,
        survivor.role,
        survivor.description,
        getSurvivorPerkNames(survivor),
        getSurvivorTags(survivor).join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        searchTerm.toLowerCase()
      );

      const matchesTag =
        selectedTag === "All" ||
        getSurvivorTags(survivor).includes(selectedTag);

      return matchesSearch && matchesTag;
    })
    .sort((firstSurvivor, secondSurvivor) => {
      if (sortOption === "name-descending") {
        return secondSurvivor.name.localeCompare(firstSurvivor.name);
      }

      if (sortOption === "role-ascending") {
        return firstSurvivor.role.localeCompare(secondSurvivor.role);
      }

      return firstSurvivor.name.localeCompare(secondSurvivor.name);
    });

  function clearFilters() {
    setSearchTerm("");
    setSelectedTag("All");
    setSortOption("name-ascending");
  }

  const filtersAreActive =
    searchTerm !== "" ||
    selectedTag !== "All" ||
    sortOption !== "name-ascending";

  return (
    <main className="survivors-page">
      <header className="page-header">
        <p className="page-header__eyebrow">CHARACTER DATABASE</p>

        <h1>Survivors</h1>

        <p>
          Browse Survivors and filter them by name, role, unique perk
          or perk category.
        </p>
      </header>

      <section className="survivor-filters">
        <input
          className="survivor-search"
          type="search"
          placeholder="Search Survivors or perks..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          className="survivor-filter-select"
          value={selectedTag}
          onChange={(event) => setSelectedTag(event.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === "All" ? "All perk categories" : tag}
            </option>
          ))}
        </select>

        <select
          className="survivor-filter-select"
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
        >
          <option value="name-ascending">Name: A–Z</option>
          <option value="name-descending">Name: Z–A</option>
          <option value="role-ascending">Role: A–Z</option>
        </select>

        <button
          className="clear-survivor-filters"
          type="button"
          onClick={clearFilters}
          disabled={!filtersAreActive}
        >
          Clear Filters
        </button>
      </section>

      <p className="survivor-results">
        Showing {filteredSurvivors.length} of {survivors.length} Survivors
      </p>

      {filteredSurvivors.length > 0 ? (
        <section className="survivor-grid">
          {filteredSurvivors.map((survivor) => (
            <SurvivorCard
              key={survivor.id}
              survivor={survivor}
              perks={perks}
            />
          ))}
        </section>
      ) : (
        <section className="no-results">
          <h2>No Survivors found</h2>

          <p>
            Try changing your search term or selecting another category.
          </p>

          <button type="button" onClick={clearFilters}>
            Reset Filters
          </button>
        </section>
      )}
    </main>
  );
}

export default Survivors;