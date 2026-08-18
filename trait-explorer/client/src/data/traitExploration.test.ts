import { describe, expect, it } from "vitest";
import {
  evaluateTraitScores,
  evaluateTraits,
  getAuroraObservation,
  traitDefinitions,
  type ExplorationAnswer,
} from "./traitExploration";

describe("trait exploration scoring", () => {
  it("uses recent, actual selected weights to resolve an otherwise exact score tie", () => {
    const tiedAnswers: ExplorationAnswer[] = [
      { questionId: "free-time", optionId: "a" },
      { questionId: "teamwork", optionId: "d" },
    ];

    const scores = evaluateTraitScores(tiedAnswers);
    const support = scores.find((item) => item.tag === "支持他人");
    const connection = scores.find((item) => item.tag === "人際連結");

    expect(support?.score).toBe(3);
    expect(connection?.score).toBe(3);
    expect(support?.strongSignalCount).toBe(connection?.strongSignalCount);
    expect(support?.coordinateCount).toBe(connection?.coordinateCount);
    expect(scores.indexOf(support!)).toBeLessThan(scores.indexOf(connection!));
  });

  it("returns the same three traits and observation for the same ten answers", () => {
    const answers: ExplorationAnswer[] = [
      { questionId: "free-time", optionId: "a" },
      { questionId: "teamwork", optionId: "b" },
      { questionId: "unknown-task", optionId: "a" },
      { questionId: "achievement", optionId: "e" },
      { questionId: "friends-find-you", optionId: "c" },
      { questionId: "making-work", optionId: "c" },
      { questionId: "trouble", optionId: "b" },
      { questionId: "praise", optionId: "c" },
      { questionId: "collaborating-differences", optionId: "e" },
      { questionId: "setback", optionId: "f" },
    ];

    const firstTraits = evaluateTraits(answers);
    const secondTraits = evaluateTraits(answers);
    const observation = getAuroraObservation(firstTraits);

    expect(firstTraits.map((item) => item.tag)).toEqual(secondTraits.map((item) => item.tag));
    expect(observation.signature).toEqual(firstTraits.map((item) => item.tag));
    expect(observation.combinationKey).toBe(firstTraits.map((item) => item.tag).join("__"));
    expect(observation.full).toContain("從這次選擇看起來");
    expect(observation.compact).toContain(firstTraits[0].tag);
    expect(observation.full.length).toBeGreaterThanOrEqual(60);
    expect(observation.compact.length).toBeGreaterThanOrEqual(40);
    expect(observation.compact.length).toBeLessThanOrEqual(125);
  });

  it("creates a combination observation from all three ranked traits", () => {
    const observation = getAuroraObservation([
      traitDefinitions.組織規劃,
      traitDefinitions.支持他人,
      traitDefinitions.好奇探索,
    ]);

    expect(observation.signature).toEqual(["組織規劃", "支持他人", "好奇探索"]);
    expect(observation.combinationKey).toBe("組織規劃__支持他人__好奇探索");
    expect(observation.compact).toContain("組織規劃");
    expect(observation.compact).toContain("支持他人");
    expect(observation.compact).toContain("好奇探索");
  });
});
