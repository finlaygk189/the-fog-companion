# Development Notes

## React

React is a JavaScript library for building user interfaces using reusable components.

---

## Component

A component is a reusable piece of the user interface.

Examples:
- Navbar
- SurvivorCard
- PerkCard

---

## Page

A page represents a complete screen in the application.

Examples:
- Home
- Survivors
- Perks
- Generator

---

## Data

Data should be stored separately from the user interface.

Example:

perks.json contains all perk information.

Perks.jsx displays the information to the user.

---

## React State

State stores information that can change while the application is running.

The build generator uses state to store the four currently selected perks. Updating the state causes React to display the new build automatically.

## Array Methods

- `sort()` rearranges array items.
- `slice(0, 4)` takes the first four items.
- `map()` converts each perk object into a visible PerkCard component.

---

## Deployment

The application was deployed using Vercel and connected to the GitHub repository.

The deployment automatically rebuilds when new changes are pushed to the main branch.

Live application:
[ADD LIVE URL]

Repository:
https://github.com/finlaygk189/the-fog-companion