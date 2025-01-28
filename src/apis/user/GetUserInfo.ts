import request from "../request.ts";

async function getUserInfo(userID: string) {
  return request.get(`/api/user/${userID}`);
}

export default getUserInfo;