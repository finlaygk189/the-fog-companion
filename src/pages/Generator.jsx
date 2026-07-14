import { useState } from "react";
import perks from "../data/perks.json";
import PerkCard from "../components/PerkCard";
import "../styles/generator.css";

function Generator() {
  const [generatedBuild, setGeneratedBuild] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [message, setMessage] = useState("");

  function shuffleArray(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function generateBuild() {
    const availablePerks =
      selectedCategory === "All"
        ? perks
        : perks.filter((perk) => perk.category === selectedCategory);

    if (availablePerks.length < 4) {
      setGeneratedBuild([]);
      setMessage(
        `There are only ${availablePerks.length} perks available in this category.`
      );
      return;
    }

    const randomBuild = shuffleArray(availablePerks).slice(0, 4);

    setGeneratedBuild(randomBuild);
    setMessage("");
  }

  return (
    <main className="generator-page">
      <header className="generator-header">
        <p className="generator-header__eyebrow">BUILD CREATOR</p>
        <h1>Build Generator</h1>

        <p>
          Select a category and generate four unique survivor perks.
        </p>
      </header>

      <section className="generator-controls">
        <label htmlFor="category">Build category</label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="All">Completely Random</option>
          <option value="Chase">Chase</option>
          <option value="Aura Reading">Aura Reading</option>
          <option value="Exhaustion">Exhaustion</option>
          <option value="Endgame">Endgame</option>
        </select>

        <button
          className="generate-button"
          type="button"
          onClick={generateBuild}
        >
          Generate Build
        </button>
      </section>

      {message && <p className="generator-message">{message}</p>}

      {generatedBuild.length === 0 && !message ? (
        <section className="generator-empty">
          <h2>No build generated yet</h2>
          <p>Select a category and press the button.</p>
        </section>
      ) : (
        generatedBuild.length > 0 && (
          <section>
            <div className="generated-build__heading">
              <h2>Your Build</h2>
              <p>
                Category:{" "}
                {selectedCategory === "All"
                  ? "Completely Random"
                  : selectedCategory}
              </p>
            </div>

            <div className="generated-build">
              {generatedBuild.map((perk) => (
                <PerkCard key={perk.id} perk={perk} />
              ))}
            </div>
          </section>
        )
      )}
    </main>
  );
}

export default Generator;