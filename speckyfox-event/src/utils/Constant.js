const serviceUrl = () => `http://34.218.92.121:8096`;

let timerId = null;
export const stopTimer = () => clearInterval(timerId);

export const tokenExpireTimer = () => {
  timerId = setTimeout(() => {
    sessionStorage.removeItem("token");
    navigate("/login");
  }, 30000);
};

export default serviceUrl;
