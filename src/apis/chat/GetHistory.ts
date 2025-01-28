import request from "../request.ts";

type Request = {
  page?: number;
  size?: number;
  search?: string;
};

async function getHistory(params: Request) {
  return request.get("/api/chat/history", params);
}

export default getHistory;