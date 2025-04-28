// store/questionsAtom.js
import { atom, selector, selectorFamily } from "recoil";

export const questionsAtom = atom({
  key: "questionsAtom",
  default: [],
});

// Get a specific question with all related data
export const questionSelector = selectorFamily({
  key: "questionSelector",
  get:
    (questionId) =>
    ({ get }) => {
      const questions = get(questionsAtom);
      return questions.find((q) => q.questionId === questionId) || null;
    },
});

// Selectors for answers
export const answersForQuestionSelector = selectorFamily({
  key: "answersForQuestionSelector",
  get:
    (questionId) =>
    ({ get }) => {
      const questions = get(questionsAtom);
      const question = questions.find((q) => q.questionId === questionId);
      return question ? question.answers : [];
    },
});
