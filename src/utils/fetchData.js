//http request method to api route
const dev = process.env.NODE_ENV !== "production";

const baseUrl = dev
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_PROD_URL;

export const postData = async (url, post) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post), //post type = object
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export const patchData = async (url, patch) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patch), //post type = object
  });
  // if (!res.ok) {
  //   throw new Error(`Error: ${res.status}`);
  // }
  const data = await res.json();
  return data;
};

export const getData = async (path, params = null) => {
  //params is received from pages\<name> getServerSideProps ctx.params.id
  //use params to call single document api
  let url;
  if (params !== null) {
    //set url path for single document in collection
    url = `${baseUrl}/api/${path}/${params}`;
  } else {
    //set url path for all documents in collection (for links)
    url = `${baseUrl}/api/${path}`;
  }
  const res = await fetch(url, {
    method: "GET",
    // headers: {
    //   Authorization: token,
    // },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export const deleteData = async (url, post) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post), //post type = object
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
