import { AskQuestionCard } from "./AskQuestionCard";
import { QuestionList } from "./QuestionList";
import { TagList } from "./TagList";
import { TopContributors } from "./TopContributors";

export const Homepage = () => {
  return (
    <div className="flex justify-around items-start h-full mt-8 px-8 gap-4">
      <TagList />
      <div>
        <AskQuestionCard/>
        <QuestionList />
      </div>
      <TopContributors />
    </div>
  );
};
