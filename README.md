# ClimateSync

ClimateSync is a responsive climate decision engine prototype for personal and community climate action. It turns household inputs into transparent scenario estimates for energy, cost, carbon, mobility, solar and resilience, then scales the same scenario to a neighbourhood or city story.

## Features

- Personal climate dashboard with prototype score, energy mix, cost and carbon signals
- Live What-If Simulator with AC, LEDs, solar, mobility, trees, ventilation, cool-roof and rainwater controls
- Community simulator from 10 households to 1 million households
- Rule-based ClimateSync AI fallback that references the current profile
- Climate risk layer, action center, challenges, streaks, badges and impact history
- Insights, local demo persistence, privacy-first city-level profile and hackathon demo mode
- Responsive sidebar/mobile navigation, keyboard-friendly inputs and visible estimates disclaimer

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal. For a production check:

```bash
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` if optional integrations are added. The current demo intentionally works without any external API:

- `AI_API_KEY` for a server-side LLM adapter
- `WEATHER_API_KEY` for climate conditions
- `SOLAR_API_KEY` for solar estimates
- `MAPS_API_KEY` for optional map layers
- `DATABASE_URL` for persistent storage

Never expose private API keys in frontend code. The current prototype stores only the scenario in browser local storage.

## Calculation methodology

The demo engine lives in `src/App.tsx` so the prototype can be run without a backend. It models cooling, lighting, appliances, mobility, solar generation and resilience using configurable simplified factors. Electricity cost uses a prototype tariff of Rs 10/kWh, energy carbon uses 0.67 kg CO2e/kWh, and solar uses a 105 kWh/kW/month sunlight factor. These are educational assumptions, not official measurements.

## Demo flow

1. Start on Overview and show the baseline profile.
2. Open What-If Simulator and use the wow scenario: AC 25 C, 4 hours/day, 100% LEDs, 3 kW solar, 2 cycling days.
3. Show the before/after values and methodology panel.
4. Open Community Impact and select 10K households.
5. Show Climate Risk and the resilience playbook.
6. Ask ClimateSync AI why the bill is high and show the profile-aware fallback.
7. Finish in Action Center with a completed action and Challenges.

## Limitations and roadmap

This is a hackathon-ready prototype, not a certified carbon accounting, financial, weather, medical or government risk product. A production system should move calculation and AI adapters behind a FastAPI or Node API, add validated household entities, real tariff/emission datasets, consent flows, a database and independent climate methodology review. The roadmap includes campus mode, live weather/solar integrations and verified impact tracking.
