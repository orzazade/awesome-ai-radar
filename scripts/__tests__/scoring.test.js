const { computeRelevanceScore, deriveLifecycle } = require("../generate-digest");

// Fixed reference date for deterministic tests
const NOW = new Date("2026-03-23T12:00:00Z");

function daysAgo(n) {
  return new Date(NOW.getTime() - n * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
}

describe("computeRelevanceScore", () => {
  // --- Base signal weights ---
  test("game-changer today scores 60 (40 base + 20 freshness)", () => {
    const entry = { signal: "game-changer", date: daysAgo(0) };
    expect(computeRelevanceScore(entry, NOW)).toBe(60);
  });

  test("notable today scores 45 (25 base + 20 freshness)", () => {
    const entry = { signal: "notable", date: daysAgo(0) };
    expect(computeRelevanceScore(entry, NOW)).toBe(45);
  });

  test("incremental today scores 30 (10 base + 20 freshness)", () => {
    const entry = { signal: "incremental", date: daysAgo(0) };
    expect(computeRelevanceScore(entry, NOW)).toBe(30);
  });

  test("noise today scores 20 (0 base + 20 freshness)", () => {
    const entry = { signal: "noise", date: daysAgo(0) };
    expect(computeRelevanceScore(entry, NOW)).toBe(20);
  });

  // --- Freshness tiers ---
  test("entry 3 days old gets +20 freshness", () => {
    const entry = { signal: "notable", date: daysAgo(3) };
    expect(computeRelevanceScore(entry, NOW)).toBe(45); // 25 + 20
  });

  test("entry 10 days old gets +10 freshness", () => {
    const entry = { signal: "notable", date: daysAgo(10) };
    expect(computeRelevanceScore(entry, NOW)).toBe(35); // 25 + 10
  });

  test("entry 18 days old gets +5 freshness", () => {
    const entry = { signal: "notable", date: daysAgo(18) };
    // 18 days = 2 full weeks → decay = (2-1)*2 = 2
    expect(computeRelevanceScore(entry, NOW)).toBe(28); // 25 + 5 - 2
  });

  test("entry 25 days old gets 0 freshness", () => {
    const entry = { signal: "notable", date: daysAgo(25) };
    // 25 days = 3 full weeks → decay = (3-1)*2 = 4
    expect(computeRelevanceScore(entry, NOW)).toBe(21); // 25 + 0 - 4
  });

  // --- Time decay ---
  test("entry 1 week old has no decay", () => {
    const entry = { signal: "game-changer", date: daysAgo(7) };
    // 7 days = 1 week → decay = 0 (only after first week)
    expect(computeRelevanceScore(entry, NOW)).toBe(50); // 40 + 10 - 0
  });

  test("entry 3 weeks old decays by 4, no freshness bonus", () => {
    const entry = { signal: "game-changer", date: daysAgo(21) };
    // 21 days = 3 weeks → decay = (3-1)*2 = 4, freshness = 0 (21 is NOT < 21)
    expect(computeRelevanceScore(entry, NOW)).toBe(36); // 40 + 0 - 4
  });

  test("entry 8 weeks old decays significantly", () => {
    const entry = { signal: "game-changer", date: daysAgo(56) };
    // 56 days = 8 weeks → decay = (8-1)*2 = 14
    expect(computeRelevanceScore(entry, NOW)).toBe(26); // 40 + 0 - 14
  });

  // --- Supersession penalty ---
  test("superseded entry loses 30 points", () => {
    const entry = {
      signal: "game-changer",
      date: daysAgo(0),
      superseded_by: "Newer Thing",
    };
    expect(computeRelevanceScore(entry, NOW)).toBe(30); // 40 + 20 - 30
  });

  // --- Adoption boost ---
  test("entry with >10k stars gets +10", () => {
    const entry = { signal: "notable", date: daysAgo(10), stars: 15000 };
    expect(computeRelevanceScore(entry, NOW)).toBe(45); // 25 + 10 + 10
  });

  test("entry with >1k stars gets +5", () => {
    const entry = { signal: "notable", date: daysAgo(10), stars: 5000 };
    expect(computeRelevanceScore(entry, NOW)).toBe(40); // 25 + 10 + 5
  });

  // --- Edge cases ---
  test("missing date defaults to 0 freshness, 0 decay", () => {
    const entry = { signal: "notable" };
    expect(computeRelevanceScore(entry, NOW)).toBe(25); // base only
  });

  test("score never goes below 0", () => {
    const entry = {
      signal: "noise",
      date: daysAgo(200),
      superseded_by: "Something",
    };
    expect(computeRelevanceScore(entry, NOW)).toBe(0);
  });

  test("score never goes above 100", () => {
    const entry = {
      signal: "game-changer",
      date: daysAgo(0),
      stars: 50000,
    };
    expect(computeRelevanceScore(entry, NOW)).toBeLessThanOrEqual(100);
  });
});

describe("deriveLifecycle", () => {
  test("score >= 50 is active", () => {
    expect(deriveLifecycle(50)).toBe("active");
    expect(deriveLifecycle(100)).toBe("active");
  });

  test("score 20-49 is fading", () => {
    expect(deriveLifecycle(49)).toBe("fading");
    expect(deriveLifecycle(20)).toBe("fading");
  });

  test("score < 20 is archived", () => {
    expect(deriveLifecycle(19)).toBe("archived");
    expect(deriveLifecycle(0)).toBe("archived");
  });

  test("superseded state is preserved regardless of score", () => {
    expect(deriveLifecycle(100, "superseded")).toBe("superseded");
    expect(deriveLifecycle(0, "superseded")).toBe("superseded");
  });
});
