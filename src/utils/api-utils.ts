import { deleteImage, imageUploadSDK } from "../lib/cloudinary/imageUpload";
import { getData, patchData } from "./fetch-utils";

//----------settings-----------
export const updateProfileImage = async (
  uploadImage: File,
  public_id: string | null,
  userId: string
) => {
  if (uploadImage) {
    //delete the user's current photo from cloudinary
    await deleteImage(userId, public_id);

    //upload new uploaded image to cloudinary
    //add image and public_id received from cloudinary to user's document in DB
    const mediaRes = await imageUploadSDK(userId, uploadImage);
    const res = await patchData(`users/${userId}`, {
      image: mediaRes.url,
      image_id: mediaRes.public_id,
    });
    return res;
  }
};

export const removeProfileImage = async (public_id: string, userId: string) => {
  const res = await patchData(`users/${userId}`, {
    image: null,
    image_id: null,
  });
  if (public_id) {
    await deleteImage(userId, public_id);
  }
  return res;
};

export const updateSession = async () => {
  //update session
  await getData("auth/session?update"); //update session
  const event = new Event("visibilitychange");
  document.dispatchEvent(event); //reload session
};
