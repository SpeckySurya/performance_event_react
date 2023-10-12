import { Route } from "react-router-dom";
import AuthGaurd from "../auth/AuthGaurd";
import DashboardPage2 from "../pages/DashboardPage2/DashboardPage2";
import DashboardEventView from "../dashboard-components/DashboardEventView/DashboardEventView";
import Login from "../pages/Login/Login";
import EventPage from "../pages/EventPage/EventPage";
import HomePage from "../pages/HomePage/HomePage";
import ThankYouPage from "../pages/ThanksYouPage/ThankYouPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword";
import LinkExpired from "../pages/LinkExpired/LinkExpired";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage/TermsAndConditionsPage";
import PrivacyPage from "../pages/PrivacyPage/PrivacyPage";
import Forgotpassword from "../pages/ForgetPassword/Forgotpassword";

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
