# ZheChaos visual style

Use this as the shared reference for future UI changes so new buttons, panels, and game modes stay harmonious with the current image set.

## Art direction

- Playful, small-scale 3D adventure-game kingdom.
- Rounded low-poly trees, rolling bright-green hills, cream stone, and coral-red castle roofs.
- Soft lavender-to-pink sky and gentle daylight.
- Keep objects chunky and readable on a phone. Use clean silhouettes and natural soft shading.
- Prefer a few clear colors and simple surfaces. Avoid neon glow, glass effects, excessive gradients, dense decoration, fake film grain, and text baked into images.
- Backgrounds are scenic environment art. UI cards and controls should sit on warm cream or soft leaf-green surfaces with dark evergreen text.

## Color palette

| Use | Hex |
| --- | --- |
| Evergreen text | `#294638` |
| Deep leaf | `#477653` |
| Meadow green | `#77BD65` |
| Soft mint | `#A9D89B` |
| Coral roof / important action | `#D95F59` |
| Warm cream panels | `#F6F0DC` |
| Path / ball highlight | `#EACB7C` |
| Lavender sky accent | `#9A8EBD` |
| Muted text | `#627568` |

## Control guidance

- Primary button: coral fill, cream text, rounded corners, slight solid lower edge for a tactile game-button feel.
- Secondary button: warm cream fill, evergreen text, muted green border.
- Selected state: meadow or mint fill with a dark green outline.
- Destructive state: muted coral; use sparingly.
- Keep button labels short and readable. Avoid neon gradients and glow shadows.

## Background files

- `bg1.png`: title, profile, and lobby.
- `bg2.png`: real connection/loading overlay.
- `bg3.png`: Find the Ball arena.
- `bg4.png`: final results and podium.
- `cup.png`: transparent cup game asset.
- `ball.png`: transparent ball game asset.

These filenames are the stable asset slots. Replacing an image at the same path keeps the game and CSS references working.


## Updated screens and motion

- Start screen uses large playful lettering and one rounded coral play button. Keep the screen simple and avoid emoji or decorative characters.
- Use the transparent `logo.png` slot for the owner's logo. It appears on the title and room header.
- Cups are rendered only from `cup.png`; do not add cup silhouettes into the CSS behind the PNG. Keep the arena background clear so the moving cup image can fully cover the ball.
- Round start exposes exactly one ball for the synced “Watch the ball” 3–2–1 countdown, then lowers upside-down cups. Cup swaps animate via left/bottom transitions; hide leaderboard during play and show it with round results.
- End game closes two curtain panels, swaps to the podium, then opens them.

- Use system-friendly rounded sans-serif typography; avoid relying on remote font downloads.
- Keep game controls grouped in a visible host panel. A guest can change a vote until the timer ends.

- The title uses rounded, thick lettering with a white fill and dark outline, inspired by the user's Chubby Toon reference. The title screen keeps the castle art but adds a soft comic burst; the play button uses coral.
- Round instructions appear before the shared countdown. The host-only `BALL` badge shows the hidden cup location, and the host can move it from the host panel.
- Prize claim icons use editable SVG files under ``. The winner can request candy or Robux, and the host podium lists the request and Roblox username.
