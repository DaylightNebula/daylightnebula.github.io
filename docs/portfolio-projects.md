# Portfolio Project Candidates

Last Updated: Nov 8, 2026

## Top picks

Each has a solid README, real commit history and a clear story a reader can follow in one card.

| Project | Repos | Language | Last push | Commits | What it shows |
| --- | --- | --- | --- | --- | --- |
| Rust engine stack (flagship) | [Gearbox](https://github.com/DaylightNebula/Gearbox), [Anarchy](https://github.com/DaylightNebula/Anarchy), [iso_ui](https://github.com/DaylightNebula/iso_ui), [skeletal](https://github.com/DaylightNebula/skeletal) | Rust | 2026-11-05 | 89 + 43 + 39 + 36 | A from-scratch ECS engine: per-component locking for concurrency, a wgpu renderer, an SDF UI drawn in one shader pass, glTF/FBX skinned animation. Gearbox has ~30 examples and a Trunk setup, so web demos are within reach. |
| [Shader Magician](https://github.com/DaylinSoftwareHouse/shader_magician) | DaylinSoftwareHouse | Rust | 2026-10-27 | 98 | A Rust-to-WGSL shader transpiler macro, a syn-like WGSL parser and a simplified GPU API. The most technically unusual project of the set. |
| [Diegetic Soup](https://github.com/DaylightNebula/DiegeticSoup) | DaylightNebula | Kotlin | 2026-10-08 | 18 | In-world Minecraft UIs with flexbox layout, packet-only entities and per-entity diffing. Already has screenshots, Java + Kotlin APIs and JitPack publishing. |
| [NebsClient](https://github.com/DaylightNebula/NebsClient) | DaylightNebula | Kotlin | 2026-10-07 | 13 | A CLI, Gradle plugin and API that drive real Minecraft clients over sockets for automated testing. Pairs well with Diegetic Soup, which it tests end to end. |
| [Meld](https://github.com/DaylightNebula/Meld) | DaylightNebula | Kotlin | 2025-01-30 | 135 | A bare-bones custom Minecraft server where even login, players and worlds are swappable modules. The longest-running project (135 commits), with screenshots already on the current site. |
| [mutual](https://github.com/DaylinSoftwareHouse/mutual) | 2026-04-26 | 5 | Lock-light concurrent data structures behind Anarchy | Best as a line under the engine stack |

The engine stack reads best as one project with its crates listed underneath; [Cell](https://github.com/DaylightNebula/Cell) is now folded into Gearbox, and [frame](https://github.com/DaylightNebula/frame), [vault](https://github.com/DaylightNebula/vault) and [gearbox_rapier](https://github.com/DaylightNebula/gearbox_rapier) can appear as smaller sub-crates.

## Experiments

| Project | Last push | Commits | Why include | Caveat |
| --- | --- | --- | --- | --- |
| [DeltosEditor](https://github.com/DaylightNebula/DeltosEditor) | 2026-11-07 | 5 | Editor framework on the engine stack; a natural showcase for iso_ui | One day old, no README yet |
| [Modular](https://github.com/DaylightNebula/Modular) | 2025-08-09 | 12 | Annotation-driven listener framework with a Minestom module; 2 stars | Smaller scope; fits as a library card |
| [mod_plugins_bevy](https://github.com/DaylightNebula/mod_plugins_bevy) | 2024-12-03 | 48 | Bevy plugin macro; 3 stars, the most of any recent repo | Nearly two years old; Bevy API has moved on |
