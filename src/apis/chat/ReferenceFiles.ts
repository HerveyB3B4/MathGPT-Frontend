import request from "../request.ts";

async function referenceFiles(questionID: string) {
  return request.get(`/api/chat/question/${questionID}/reference-files`);
}

export default referenceFiles;