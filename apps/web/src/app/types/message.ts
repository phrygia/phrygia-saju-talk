import { BirthInfo } from "@/src/app/types/fortune";

export const messagesTableName = "messages";

export interface Messages {
  content: string;
  conversation_id: string;
  created_at: string;
  id: string;
  role: string;
  user_id: string;
  parts?: {
    text?: string;
    type?: string;
  }[];
  profile?: BirthInfo;
}
