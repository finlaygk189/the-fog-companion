import { useEffect, useState } from "react";
import perks from "../data/perks.json";
import PerkCard from "../components/PerkCard";
import survivors from "../data/survivors.json";
import "../styles/generator.css";

function Generator() {
  const [generatedBuild, setGeneratedBuild] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [message, setMessage] = useState("");

  const [savedBuilds, setSavedBuilds] = useState(() => {
    const storedBuilds = localStorage.getItem("savedBuilds");

    return storedBuilds ? JSON.parse(storedBuilds) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedBuilds", JSON.stringify(savedBuilds));
  }, [savedBuilds]);

  function shuffleArray(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function generateBuild() {
    const availablePerks =
      selectedCategory === "All"
        ? perks
        : perks.filter((perk) => perk.tags.includes(selectedCategory))

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

  function getSurvivorName(survivorId) {
  return (
    survivors.find((survivor) => survivor.id === survivorId)?.name ?? null
  );
}

  function saveBuild() {
    if (generatedBuild.length !== 4) {
      return;
    }

    const newBuild = {
      id: Date.now(),
      category: selectedCategory,
      perks: generatedBuild,
    };

    setSavedBuilds((currentBuilds) => [...currentBuilds, newBuild]);
    setMessage("Build saved successfully.");
  }

  function deleteBuild(buildId) {
    setSavedBuilds((currentBuilds) =>
      currentBuilds.filter((build) => build.id !== buildId)
    );
  }

  return (
    <main className="generator-page">
      <header className="generator-header">
        <p className="generator-header__eyebrow">BUILD CREATOR</p>
        <h1>Build Generator</h1>
        <p>Select a category and generate four unique survivor perks.</p>
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

              <button
                className="save-build-button"
                type="button"
                onClick={saveBuild}
              >
                Save Build
              </button>
            </div>

            <div className="generated-build">
              {generatedBuild.map((perk) => (
                <PerkCard
                key={perk.id}
                perk={perk}
                survivorName={getSurvivorName(perk.survivorId)}
              />
              ))}
            </div>
          </section>
        )
      )}

      <section className="saved-builds">
        <h2>Saved Builds</h2>

        {savedBuilds.length === 0 ? (
          <p className="saved-builds__empty">
            You have not saved any builds yet.
          </p>
        ) : (
          savedBuilds.map((build, index) => (
            <article className="saved-build" key={build.id}>
              <div className="saved-build__header">
                <div>
                  <h3>Saved Build {index + 1}</h3>
                  <p>
                    Category:{" "}
                    {build.category === "All"
                      ? "Completely Random"
                      : build.category}
                  </p>
                </div>

                <button
                  className="delete-build-button"
                  type="button"
                  onClick={() => deleteBuild(build.id)}
                >
                  Delete
                </button>
              </div>

              <div className="saved-build__perks">
                {build.perks.map((perk) => (
                  <span key={perk.id}>{perk.name}</span>
                ))}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Generator;