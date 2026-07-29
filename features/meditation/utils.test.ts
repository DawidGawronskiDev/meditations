import { describe, expect, it } from "vitest";
import { flattenTechnique } from "./utils";
import { Technique } from "./types";

describe("flattenTechnique", () => {
  it("should flatten a technique into an array of phases", () => {
    const technique: Technique = {
      name: "Test Technique",
      totalRounds: 1,
      segments: [
        {
          phases: [
            { action: "inhale", duration: 4 },
            { action: "hold", duration: 7 },
            { action: "exhale", duration: 8 },
          ],
          repeat: 2,
        },
      ],
    };

    const expectedPhases = [
      { action: "inhale", duration: 4 },
      { action: "hold", duration: 7 },
      { action: "exhale", duration: 8 },
      { action: "inhale", duration: 4 },
      { action: "hold", duration: 7 },
      { action: "exhale", duration: 8 },
    ];

    const result = flattenTechnique(technique);
    expect(result).toEqual(expectedPhases);
  });

  it("should return an empty array for a technique with no segments", () => {
    const technique: Technique = {
      name: "Empty Technique",
      totalRounds: 1,
      segments: [],
    };

    const result = flattenTechnique(technique);
    expect(result).toEqual([]);
  });

  it("should handle segments with zero repeats", () => {
    const technique: Technique = {
      name: "Zero Repeat Technique",
      totalRounds: 1,
      segments: [
        {
          phases: [
            { action: "inhale", duration: 4 },
            { action: "exhale", duration: 4 },
          ],
          repeat: 0,
        },
      ],
    };

    const result = flattenTechnique(technique);
    expect(result).toEqual([]);
  });

  it("should handle multiple segments with different repeats", () => {
    const technique: Technique = {
      name: "Multiple Segments Technique",
      totalRounds: 1,
      segments: [
        {
          phases: [
            { action: "inhale", duration: 4 },
            { action: "exhale", duration: 4 },
          ],
          repeat: 2,
        },
        {
          phases: [{ action: "hold", duration: 5 }],
          repeat: 3,
        },
      ],
    };

    const expectedPhases = [
      { action: "inhale", duration: 4 },
      { action: "exhale", duration: 4 },
      { action: "inhale", duration: 4 },
      { action: "exhale", duration: 4 },
      { action: "hold", duration: 5 },
      { action: "hold", duration: 5 },
      { action: "hold", duration: 5 },
    ];

    const result = flattenTechnique(technique);
    expect(result).toEqual(expectedPhases);
  });

  it("should handle segments with no phases", () => {
    const technique: Technique = {
      name: "No Phases Technique",
      totalRounds: 1,
      segments: [
        {
          phases: [],
          repeat: 2,
        },
      ],
    };

    const result = flattenTechnique(technique);
    expect(result).toEqual([]);
  });
});
