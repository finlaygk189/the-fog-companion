import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const projectRoot = path.resolve(currentDirectory, "..");

function readJson(relativePath) {
  const fullPath = path.join(projectRoot, relativePath);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Could not read ${relativePath}:`);
    console.error(error.message);
    process.exit(1);
  }
}

function findDuplicates(items, property) {
  const valuesSeen = new Set();
  const duplicateValues = new Set();

  for (const item of items) {
    const value = item[property];

    if (valuesSeen.has(value)) {
      duplicateValues.add(value);
    }

    valuesSeen.add(value);
  }

  return [...duplicateValues];
}

const survivors = readJson("src/data/survivors.json");
const perks = readJson("src/data/perks.json");

let hasErrors = false;

console.log("\nValidating The Fog Companion data...\n");
console.log(`Survivors found: ${survivors.length}`);
console.log(`Perks found: ${perks.length}\n`);

// Check duplicate Survivor IDs
const duplicateSurvivorIds = findDuplicates(survivors, "id");

if (duplicateSurvivorIds.length > 0) {
  hasErrors = true;
  console.error("Duplicate Survivor IDs:");
  duplicateSurvivorIds.forEach((id) => console.error(`  - ${id}`));
}

// Check duplicate perk IDs
const duplicatePerkIds = findDuplicates(perks, "id");

if (duplicatePerkIds.length > 0) {
  hasErrors = true;
  console.error("Duplicate perk IDs:");
  duplicatePerkIds.forEach((id) => console.error(`  - ${id}`));
}

const survivorIds = new Set(survivors.map((survivor) => survivor.id));
const perkIds = new Set(perks.map((perk) => perk.id));

// Check every Survivor perk ID exists
for (const survivor of survivors) {
  if (!Array.isArray(survivor.perkIds)) {
    hasErrors = true;
    console.error(`${survivor.name} does not have a valid perkIds array.`);
    continue;
  }

  for (const perkId of survivor.perkIds) {
    if (!perkIds.has(perkId)) {
      hasErrors = true;
      console.error(
        `${survivor.name} references missing perk: ${perkId}`
      );
    }
  }
}

// Check every perk references a valid Survivor
for (const perk of perks) {
  if (perk.survivorId !== null && !survivorIds.has(perk.survivorId)) {
    hasErrors = true;
    console.error(
      `${perk.name} references missing Survivor: ${perk.survivorId}`
    );
  }

  if (!Array.isArray(perk.tags) || perk.tags.length === 0) {
    hasErrors = true;
    console.error(`${perk.name} has no valid tags.`);
  }
}

// Check each Survivor has exactly three unique perks
for (const survivor of survivors) {
  if (!Array.isArray(survivor.perkIds)) {
    continue;
  }

  const uniquePerkIds = new Set(survivor.perkIds);

  if (survivor.perkIds.length !== 3) {
    hasErrors = true;
    console.error(
      `${survivor.name} has ${survivor.perkIds.length} perks instead of 3.`
    );
  }

  if (uniquePerkIds.size !== survivor.perkIds.length) {
    hasErrors = true;
    console.error(`${survivor.name} has duplicate perks.`);
  }
}

// Check ownership matches in both directions
for (const survivor of survivors) {
  for (const perkId of survivor.perkIds ?? []) {
    const perk = perks.find((currentPerk) => currentPerk.id === perkId);

    if (perk && perk.survivorId !== survivor.id) {
      hasErrors = true;
      console.error(
        `${perk.name} is listed for ${survivor.name}, but its survivorId is ${perk.survivorId}.`
      );
    }
  }
}

if (hasErrors) {
  console.error("\nData validation failed. Fix the errors above.\n");
  process.exit(1);
}

console.log("All data relationships are valid.");
console.log("No duplicate IDs were found.");
console.log("Every Survivor has three valid perks.\n");