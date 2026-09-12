export type Scenario = {
    acTemp: number
    acHours: number
    led: number
    solar: number
    carDays: number
    publicDays: number
    cycleDays: number
    trees: number
    rainwater: boolean
    coolRoof: boolean
    ventilation: number
}

export type Result = {
    energy: number
    bill: number
    carbon: number
    transport: number
    solar: number
    score: number
    savings: number
    co2Saved: number
}

export const baseline: Scenario = {
    acTemp: 24,
    acHours: 5,
    led: 55,
    solar: 0,
    carDays: 5,
    publicDays: 0,
    cycleDays: 0,
    trees: 2,
    rainwater: false,
    coolRoof: false,
    ventilation: 2,
}

export function calculate(scenario: Scenario, base: Scenario = baseline): Result {
    const cooling = 74 * (scenario.acHours / 5) * Math.max(0.48, 1 - (scenario.acTemp - 24) * 0.075) * (scenario.coolRoof ? 0.91 : 1) * (scenario.ventilation === 3 ? 0.94 : scenario.ventilation === 1 ? 1.05 : 1)
    const lighting = 32 * (1 - scenario.led / 100 * 0.62)
    const appliances = 104 * (scenario.rainwater ? 0.98 : 1)
    const energy = Math.max(92, cooling + lighting + appliances)
    const bill = energy * 10
    const transport = Math.max(14, 38 * scenario.carDays / 5 + 12 * scenario.publicDays - 17 * scenario.cycleDays)
    const solar = scenario.solar * 105
    const carbon = energy * 0.67 + transport * 0.16 + 18 - solar * 0.08
    const score = Math.min(98, Math.round(45 + scenario.led * 0.16 + scenario.solar * 2.2 + scenario.cycleDays * 2.6 + (scenario.coolRoof ? 5 : 0) + (scenario.rainwater ? 3 : 0) + (scenario.ventilation === 3 ? 3 : 0)))
    const current = base === scenario ? { energy: 250, bill: 2500, carbon: 186 } : calculate(base, base)
    return {
        energy,
        bill,
        carbon,
        transport,
        solar,
        score,
        savings: Math.max(0, (current.bill - bill) * 12),
        co2Saved: Math.max(0, (current.carbon - carbon) * 12),
    }
}
