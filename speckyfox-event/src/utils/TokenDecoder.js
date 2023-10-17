const findRoleFromToken = () => {
  const jwtToken = sessionStorage.getItem("token");
  const parts = jwtToken.split(".");
  const base64Payload = parts[1];
  const decodedPayload = atob(base64Payload);
  const payloadObject = JSON.parse(decodedPayload);
  return payloadObject.usertype;
};

export { findRoleFromToken };
