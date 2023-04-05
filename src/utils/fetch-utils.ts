const dev = process.env.NODE_ENV !== "production";

const baseUrl = dev
  ? process.env.NEXT_PUBLIC_BASE_URL
  : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const headers = {
  "Content-Type": "application/json",
};

//TODO: declare correct types for parameters
const getUrl = (path: string, params: string | null = null) => {
  let url: string;
  if (params !== null) {
    url = `${baseUrl}/api/${path}/${params}`;
  } else {
    url = `${baseUrl}/api/${path}`;
  }
  return url;
};

export const getData = async (path: string, params = null) => {
  const res = await fetch(getUrl(path, params), {
    method: "GET",
    headers, // add authorization: token, if needed
  });
  const data = await res.json();
  return data;
};

export const patchData = async (path: string, patch: {}) => {
  const res = await fetch(getUrl(path), {
    method: "PATCH",
    headers,
    body: JSON.stringify(patch),
  });
  const data = await res.json();
  return data;
};

export const postData = async (path: string, post: {}) => {
  const res = await fetch(getUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};

export const deleteData = async (path: string, post: {}) => {
  const res = await fetch(getUrl(path), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const putData = async (path: string, post: {}) => {
  const res = await fetch(getUrl(path), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
