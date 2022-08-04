import { buildImageUrl, buildUrl } from "cloudinary-build-url";

const getCloudinaryUrl = (url) => {
  if (url == undefined || url === "") {
    return "";
  }
  if (url.includes("cloudinary")) {
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
  }
  const image = buildImageUrl(url, {
    cloud: {
      cloudName: "mykombucha",
      storageType: "fetch",
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
  return image;
};

export default getCloudinaryUrl;
