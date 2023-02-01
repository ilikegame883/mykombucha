const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

async function getSignature(userId: string) {
  const response = await fetch(`/api/users/${userId}/upload/sign`);
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

//params: user uploaded profile image file
export const imageUploadSDK = async (userId: string, image: File) => {
  const { signature, timestamp } = await getSignature(userId);

  const formData = new FormData();
  formData.append("file", image);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("api_key", cloudinaryKey);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

export const deleteImage = async (userId: string, public_id: string) => {
  if (!public_id) return;
  //destory image in Cloudinary
  // const res = await fetch(`/api/upload/destroy/${public_id}`, {
  const res = await fetch(`/api/users/${userId}/upload/${public_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const data = await res.json();
};
