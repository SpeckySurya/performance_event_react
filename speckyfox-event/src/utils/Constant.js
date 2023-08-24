const serviceUrl = () => `https://eventbackend.speckyfox.com`;

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
