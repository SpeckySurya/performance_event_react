export default class Header {
  token = sessionStorage.getItem("token");

  basicHeader() {
    const headers = {
      "Content-Type": "application/json",
    };
    return headers;
  }

  textType() {
    const headers = {
      "Content-Type": "text/plain",
    };
    return headers;
  }

  withAuth() {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  multipartAuth() {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${this.token}`,
      },
    };
  }
}
