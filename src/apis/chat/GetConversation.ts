import request from "../request.ts";

type Request = {
  page?: number;
  size?: number;
};

async function getConversation(conversationID: string, params: Request) {
  return request.get(`/api/chat/conversation/${conversationID}`, params);
}

export default getConversation;