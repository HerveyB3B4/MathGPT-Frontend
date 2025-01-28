import request from "../request.ts";

type Request = {
  purpose: string;
  contact: string;
  captchaID?: string;
  captchaInput?: string;
};

async function sendCode(data: Request) {
  return request.post("/api/auth/send-code", data);
}

export default sendCode;