import { describe, expect, it } from "vitest";
import {
  evaluateTraitScores,
  evaluateTraits,
  getAuroraObservation,
  traitCoordinates,
  traitDefinitions,
  type ExplorationAnswer,
} from "./traitExploration";

describe("trait exploration scoring", () => {
  it("keeps an exact tie deterministic through the actual selection order", () => {
    const tiedAnswers: ExplorationAnswer[] = [
      { questionId: "free-time", optionId: "a" },
      { questionId: "teamwork", optionId: "d" },
      { questionId: "praise", optionId: "a" },
      { questionId: "setback", optionId: "d" },
    ];

    const scores = evaluateTraitScores(tiedAnswers);
    const support = scores.find((item) => item.tag === "支持他人");
    const connection = scores.find((item) => item.tag === "人際連結");

    expect(support?.score).toBe(4);
    expect(connection?.score).toBe(4);
    expect(support?.strongSignalCount).toBe(connection?.strongSignalCount);
    expect(support?.coordinateCount).toBe(connection?.coordinateCount);
    expect(scores.indexOf(connection!)).toBeLessThan(scores.indexOf(support!));
  });

  it("does not turn rest or a personal boundary into a trait score", () => {
    const scores = evaluateTraitScores([
      { questionId: "free-time", optionId: "g" },
      { questionId: "setback", optionId: "g" },
    ]);

    expect(scores.every((item) => item.score === 0)).toBe(true);
  });

  it("does not treat casual contact or asking about something new as supporting another person", () => {
    const scores = evaluateTraitScores([
      { questionId: "free-time", optionId: "a" },
      { questionId: "unknown-task", optionId: "c" },
    ]);

    expect(scores.find((item) => item.tag === "人際連結")?.score).toBe(3);
    expect(scores.find((item) => item.tag === "好奇探索")?.score).toBe(1);
    expect(scores.find((item) => item.tag === "支持他人")?.score).toBe(0);
  });

  it("returns the same three traits and observation for the same ten updated answers", () => {
    const answers: ExplorationAnswer[] = [
      { questionId: "free-time", optionId: "d" },
      { questionId: "teamwork", optionId: "e" },
      { questionId: "unknown-task", optionId: "f" },
      { questionId: "achievement", optionId: "c" },
      { questionId: "friends-find-you", optionId: "e" },
      { questionId: "making-work", optionId: "a" },
      { questionId: "trouble", optionId: "e" },
      { questionId: "praise", optionId: "c" },
      { questionId: "collaborating-differences", optionId: "c" },
      { questionId: "setback", optionId: "b" },
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

  it("keeps ten short-choice coordinates and only allows explicit positive weights", () => {
    expect(traitCoordinates).toHaveLength(10);
    expect(traitCoordinates.every((coordinate) => coordinate.options.length === 7)).toBe(true);
    expect(traitCoordinates.flatMap((coordinate) => coordinate.options).every((option) =>
      Object.values(option.weights).every((weight) => weight === 1 || weight === 2),
    )).toBe(true);
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
