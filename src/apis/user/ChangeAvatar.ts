import request from "../request.ts";

async function uploadAvatar(image: File) {
  return request.postFormData("/api/user/upload-avatar", image);
}

export default uploadAvatar;