# Frontend Mentor Project Tracker

This document is the implementation tracker for this repository.

Use it to record what is done, what is in progress, what is blocked, and what should be improved next.

## Project Context

- Repository goal: maintain a complete Frontend Mentor learning and portfolio journey.
- Current focus: React portfolio shell at root while preserving existing challenge folders and published links.
- Constraint: existing challenge implementations should not be restructured unless required for bug fixes or enhancements.

## Current Milestone

Milestone: Portfolio migration and consolidation

- Status: In progress
- Objective: use the root React app as the primary portfolio interface.

### Completed

- Replaced default Vite starter app with portfolio-oriented React UI.
- Migrated hero, accordion sections, project cards, and theme toggle behavior.
- Connected React UI to shared project data source in src/data/projects.js.
- Aligned preview image paths to current public/previews structure.

### In Progress

- Documentation pass for root README and tracking process.
- Quality pass for accessibility, responsiveness, and UX consistency.

### Next

- Component extraction for maintainability.
- Add tests and data validation for portfolio data.
- Improve filtering, search, and tagging in project listing UI.

## Work Log

Add entries in reverse chronological order.

Template:

- Date:
- Area:
- Change:
- Why:
- Outcome:
- Follow-up:

Example:

- Date: 2026-08-02
- Area: Portfolio Shell
- Change: Migrated static portfolio behavior into React app.
- Why: unify portfolio into modern stack while keeping challenge paths stable.
- Outcome: root app now renders categories and project cards from data.
- Follow-up: split into reusable components and add tests.

## Architecture Decisions

Record key decisions and rationale.

- Decision: Keep challenge folders unchanged.
  - Reason: published links and Frontend Mentor submissions depend on current paths.

- Decision: Use root React app for portfolio presentation.
  - Reason: easier to scale, reuse, and enhance with modern patterns.

- Decision: Keep project data centralized.
  - Reason: single source of truth for portfolio cards and category rendering.

## Backlog

Prioritize with P1, P2, P3.

### P1

- Extract page into reusable components (Hero, CategoryAccordion, ProjectCard, Footer).
- Add keyboard and screen-reader checks for accordion and theme toggle.
- Add schema validation for project data fields.

### P2

- Add search, category filters, and challenge level filters.
- Add sort options (latest, difficulty, completion status).
- Add project status badges (done, in progress, coming soon).

### P3

- Add analytics events for card click-through and section engagement.
- Add visual snapshots for key UI states.
- Add richer per-project metadata (date, lessons learned, refactor notes).

## Future Enhancements

- Add changelog automation for portfolio updates.
- Add content sections for lessons learned and engineering notes.
- Add CI checks for lint, build, and data consistency.
- Add contribution guide for future collaborators.

## Risks and Watchouts

- Breaking existing challenge URLs can impact published submissions.
- Inconsistent data fields may break rendering across cards.
- Large CSS growth can reduce maintainability without component-level styling discipline.

## Definition of Done for New Portfolio Features

- Feature works in desktop and mobile layouts.
- Keyboard interactions are supported where relevant.
- No regression in existing portfolio sections.
- Data source updates do not require hard-coded UI changes.
- README and this tracker are updated with impact and follow-up.
