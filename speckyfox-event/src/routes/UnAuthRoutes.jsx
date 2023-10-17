import { Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import EventPage from "../pages/EventPage/EventPage";
import Forgotpassword from "../pages/ForgetPassword/Forgotpassword";
import HomePage from "../pages/HomePage/HomePage";
import LinkExpired from "../pages/LinkExpired/LinkExpired";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PrivacyPage from "../pages/PrivacyPage/PrivacyPage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage/TermsAndConditionsPage";
import ThankYouPage from "../pages/ThanksYouPage/ThankYouPage";
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword";

const UnAuthRoutes = [
  <Route path="login" element={<Login />} />,
  <Route exact path="/" element={<EventPage />} />,
  <Route path="/:param" element={<HomePage />} />,
  <Route path="/thankyou" element={<ThankYouPage />} />,
  <Route path="/error" element={<ErrorPage />} />,
  <Route path="/pagenotfound" element={<PageNotFound />} />,
  <Route path="/forgot-password/:token" element={<UpdatePassword />} />,
  <Route path="/forgot-password" element={<Forgotpassword />} />,
  <Route path="/link-expired" element={<LinkExpired />} />,
  <Route path="/t-and-c" element={<TermsAndConditionsPage />} />,
  <Route path="/privacy" element={<PrivacyPage />} />,
  <Route path="/*" element={<PageNotFound />} />,
];

export default UnAuthRoutes;
