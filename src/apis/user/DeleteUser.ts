import request from "../request.ts";

type Request = {
  account: string;
  password: string;
  captcha?: Captcha;
};

type Captcha = {
  captchaID: string;
  captchaInput: string;
};

async function deleteUser(data: Request) {
  return request.delete("/api/user/delete", data);
}

export default deleteUser;