//http request method to api route
const dev = process.env.NODE_ENV !== "production";
console.log(`production ${dev}`);

const baseUrl = dev
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_PROD_URL;
console.log(baseUrl);

export const postData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post), //post type = object
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export const patchData = async (url, patch, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(patch), //post type = object
  });
  // if (!res.ok) {
  //   throw new Error(`Error: ${res.status}`);
  // }
  const data = await res.json();
  console.log(data);
  return data;
};

export const getData = async (path, params = null, token) => {
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
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export const deleteData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post), //post type = object
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
