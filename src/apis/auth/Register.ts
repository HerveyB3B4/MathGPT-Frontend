import request from "../request.ts";

type Request = {
  email: string;
  phone: number;
  username: string;
  verifyCode: string;
};

async function register(data: Request) {
  return request.post("/api/auth/register", data);
}

export default register;