import request from "../request.ts";

async function deleteConversation(conversationID: string) {
  return request.delete(`/api/chat/conversation/${conversationID}`);
}

export default deleteConversation;