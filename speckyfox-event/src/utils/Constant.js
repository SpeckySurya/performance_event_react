// const serviceUrl = () => `https://eventbackend.speckyfox.com`;
const serviceUrl = () => `http://localhost:8096`;
// const serviceUrl = () => `http://34.218.92.121:8096`;

let timerId = null;
export const stopTimer = () => clearInterval(timerId);

export const tokenExpireTimer = (navigateToLogin) => {
  timerId = setTimeout(() => {
    sessionStorage.removeItem("token");
    navigateToLogin();
  }, expireTime());
};

export const expireTime = () => 3000000;
export const alertBeforeExpireTime = () => 300000;

export default serviceUrl;
