import request from "../request.ts";

type Request = {
  email?: string;
  phone?: number;
  password: string;
  captcha?: Captcha;
};

type Captcha = {
  captchaID: string;
  captchaInput: string;
};

async function resetPassword(data: Request) {
  return request.patch("/api/auth/update", data);
}

export default resetPassword;