const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

async function getSignature() {
  const response = await fetch("/api/upload/sign");
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}

export const imageUploadSDK = async (image) => {
  const { signature, timestamp } = await getSignature();

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

export const deleteImage = async (public_id) => {
  if (!public_id) return;
  //destory image in Cloudinary
  const res = await fetch(`/api/upload/destroy/${public_id}`, {
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
  console.log(data);
};
