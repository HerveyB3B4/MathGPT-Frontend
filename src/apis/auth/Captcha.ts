import request from "../request.ts";

type Request = {
  type?: string;
  purpose?: string;
};

async function captcha(params: Request) {
  return request.get("/api/auth/captcha", params);
}

export default captcha;