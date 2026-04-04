#!/bin/bash
# Run from project root: Raunak-Portfolio-main/

git add src/pages/Index.tsx
git add src/components/sections/HeroPanel.tsx
git add src/components/sections/WorkPanel.tsx
git add src/components/sections/ManifestoPanel.tsx
git add src/components/sections/ContactPanel.tsx
git add src/components/layout/TopNav.tsx
git add src/components/layout/Sidebar.tsx
git add src/index.css
git add tailwind.config.ts

# Remove replaced files safely
[ -f "src/components/sections/HeroSection.tsx" ] && git rm src/components/sections/HeroSection.tsx
[ -f "src/components/sections/AboutSection.tsx" ] && git rm src/components/sections/AboutSection.tsx
[ -f "src/components/sections/SkillsSection.tsx" ] && git rm src/components/sections/SkillsSection.tsx
[ -f "src/components/sections/ProjectsSection.tsx" ] && git rm src/components/sections/ProjectsSection.tsx
[ -f "src/components/sections/ContactSection.tsx" ] && git rm src/components/sections/ContactSection.tsx
[ -f "src/components/ParticleBackground.tsx" ] && git rm src/components/ParticleBackground.tsx

git commit -m "feat: full Stitch redesign — horizontal 4-panel layout + editorial hero

- Replace generic centered hero with Stitch-exact editorial layout
- Massive clamp(4rem,15vw,14rem) Epilogue headline RAUNAK / SHARMA
- 3 overlapping rotated words: DESIGN (-rotate-12), CODE (rotate-6), CREATE (-rotate-3)
- text-stroke-red CSS technique on DESIGN word
- Horizontal 4-panel scroll engine (wheel + keyboard + touch)
- Panel 1: Hero / Panel 2: Work / Panel 3: Manifesto / Panel 4: Contact
- Panel navigation: translateX(-N*100vw) 700ms spring easing
- Fixed panel indicator dots bottom-right
- Arsenal skill rows with arrow_outward hover effect
- Contact panel on deep red #930616 background with grid overlay
- body: cursor crosshair, overflow hidden
- Full Obsidian Ember Tailwind config with all color tokens
- Zero border-radius throughout"

git push origin main
