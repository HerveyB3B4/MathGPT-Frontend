import request from "../request.ts";

type Request = {
  maxTokens?: number;
  messages: Message[];
  model: string;
  temperature?: number;
};

type Message = {
  content: string;
  name?: string;
  role: Role;
};

type Role = "user" | "assistant";

async function chatCompletions(questionID: string, data: Request) {
  return request.post(`/api/chat/question/${questionID}/chat-completions`, data);
}

export default chatCompletions;