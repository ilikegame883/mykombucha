import { buildUrl } from "cloudinary-build-url";

const getCloudinaryUrl = (url) => {
  const src = buildUrl(url, {
    cloud: {
      cloudName: "mykombucha",
    },
    transformations: {
      resize: {
        type: "pad",
        width: 200,
        height: 200,
      },
    },
  });
  return src;
};

export default getCloudinaryUrl;
