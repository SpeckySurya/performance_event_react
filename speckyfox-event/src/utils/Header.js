function basicHeader() {
  const headers = {
    "Content-Type": "application/json",
  };
  return headers;
}

function withAuth(token) {
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };
}

function multipartAuth(token) {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };
}

export default basicHeader;
export { withAuth, multipartAuth };
