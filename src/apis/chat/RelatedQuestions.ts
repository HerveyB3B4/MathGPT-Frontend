import request from "../request.ts";

async function relatedQuestions(questionID: string) {
  return request.post(`/api/chat/question/${questionID}/related-questions`);
}

export default relatedQuestions;