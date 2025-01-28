import request from "../request.ts";

type Request = {
  userID: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  avatar: string;
  verifyPassword: string;
};

async function updateUserInfo(data: Request) {
  return request.post("/api/user/update", data);
}

export default updateUserInfo;