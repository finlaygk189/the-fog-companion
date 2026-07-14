import { useState } from "react";
import perks from "../data/perks.json";
import PerkCard from "../components/PerkCard";
import "../styles/generator.css";

function Generator() {
  const [generatedBuild, setGeneratedBuild] = useState([]);

  function generateBuild() {
    const shuffledPerks = [...perks].sort(() => Math.random() - 0.5);
    const randomBuild = shuffledPerks.slice(0, 4);

    setGeneratedBuild(randomBuild);
  }

  return (
    <main className="generator-page">
      <header className="generator-header">
        <p className="generator-header__eyebrow">BUILD CREATOR</p>
        <h1>Random Build Generator</h1>

        <p>
          Generate four unique survivor perks for your next trial.
        </p>
      </header>

      <button
        className="generate-button"
        type="button"
        onClick={generateBuild}
      >
        Generate Random Build
      </button>

      {generatedBuild.length === 0 ? (
        <section className="generator-empty">
          <h2>No build generated yet</h2>
          <p>Press the button to create your first random build.</p>
        </section>
      ) : (
        <section>
          <div className="generated-build__heading">
            <h2>Your Build</h2>
            <p>Four randomly selected survivor perks.</p>
          </div>

          <div className="generated-build">
            {generatedBuild.map((perk) => (
              <PerkCard key={perk.id} perk={perk} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Generator;