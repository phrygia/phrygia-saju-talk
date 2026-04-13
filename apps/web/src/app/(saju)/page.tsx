import ChatIndex from "@/src/app/(saju)/_components/ChatIndex";
import { getRandomSajuQuestions } from "@/src/app/(saju)/_lib/saju";

export default function Home() {
  return <ChatIndex questions={getRandomSajuQuestions()} />;
}
