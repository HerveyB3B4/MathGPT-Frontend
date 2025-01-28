import request from "../request.ts";

async function logout() {
  return request.delete("/api/user/logout");
}

export default logout;