import { buildImageUrl, buildUrl } from "cloudinary-build-url";

//generate cloudinary image url from various image sources

const getCloudinaryUrl = (url: string | undefined) => {
  if (url == undefined || url === "") {
    return "";
  }

  //build cloudinary url with desired image size and format
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
  //if image is from a random source,
  //upload image to cloudinary and build image url with desired size and format
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
