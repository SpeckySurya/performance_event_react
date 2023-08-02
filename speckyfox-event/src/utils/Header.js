function basicHeader() {
  const headers = {
    "Content-Type": "application/json",
  };
  return headers;
}

function withAuth() {
  return {
    auth: {
      username: "admin",
      password: "dev@123",
    },
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
}

function multipartAuth() {
  return {
    auth: {
      username: "admin",
      password: "dev@123",
    },
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };
}

export default basicHeader;
export { withAuth, multipartAuth };
