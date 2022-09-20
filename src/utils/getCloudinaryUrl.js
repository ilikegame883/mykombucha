import { buildUrl } from "cloudinary-build-url";

//generate cloudinary image url from various image sources
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
};

export default getCloudinaryUrl;
