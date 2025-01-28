import request from "../request.ts";

type Request = {
  account: string;
  password: string;
};

async function login(data: Request) {
  return request.post("/api/auth/login", data);
}

export default login;