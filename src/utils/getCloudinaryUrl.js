import { buildUrl } from "cloudinary-build-url";

const getCloudinaryUrl = (url) => {
  const src = buildUrl(url, {
    cloud: {
      cloudName: "mykombucha",
    },
    transformations: {
      resize: {
        type: "pad",
        width: 150,
        height: 150,
      },
      format: "webp",
    },
  });
  return src;
};

export default getCloudinaryUrl;
