const username = "admin";
const password = "dev@123";
const base64Credentials = btoa(`${username}:${password}`);

function basicHeader() {
  const headers = {
    "Content-Type": "application/json",
  };
  return headers;
}

function notifyHeader() {
  const headers = {
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  };
  return headers;
}

function eventCreationHeader() {
  const headers = {
    Authorization: `Basic ${base64Credentials}`,
    accept: "/",
    "Content-Type": "multipart/form-data",
  };
  return headers;
}

export default basicHeader;
export { notifyHeader, eventCreationHeader };
