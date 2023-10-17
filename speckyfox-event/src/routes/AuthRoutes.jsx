import { Route } from "react-router-dom";
import AuthGaurd from "../auth/AuthGaurd";
import AdminRegistration from "../components/AdminRegistation/AdminRegistation";
import AdminUpdatePassword from "../components/AdminUpdatePassword/AdminUpdatePassword";
import ManageAdmin from "../components/ManageAdmin/ManageAdmin";
import ManageUser from "../components/ManageUser/ManageUser";
import NotifyParticipant from "../components/NotifyParticipant/NotifyParticipant";
import ShowSpeaker from "../components/ShowSpeaker/ShowSpeaker";
import UploadVideoAndPdf from "../components/UploadVideoAndPdf/UploadVideoAndPdf";
import CreateEventForm from "../dashboard-components/CreateEventForm/CreateEventForm";
import CreateSpeakerForm from "../dashboard-components/CreateSpeakerForm/CreateSpeakerForm";
import DashboardEventView from "../dashboard-components/DashboardEventView/DashboardEventView";
import EditEventForm from "../dashboard-components/EditEventForm/EditEventForm";
import EditSpeakerForm from "../dashboard-components/EditSpeakerForm/EditSpeakerForm";
import HomeConfig from "../dashboard-components/HomeConfig/HomeConfig";
import DashboardPage2 from "../pages/DashboardPage2/DashboardPage2";

const AuthRoutes = [
  <Route
    path="dashboard"
    element={<AuthGaurd component={<DashboardPage2 />} />}
  >
    <Route path="events" element={<DashboardEventView />} />
    <Route path="users" element={<ManageAdmin />} />
    <Route path="speakers" element={<ShowSpeaker />} />
    <Route path="speakers/create-speaker" element={<CreateSpeakerForm />} />
    <Route path="events/notify-participant" element={<NotifyParticipant />} />
    <Route path="events/manage-participant" element={<ManageUser />} />
    <Route path="events/upload-event-data" element={<UploadVideoAndPdf />} />
    <Route path="events/create-event" element={<CreateEventForm />} />
    <Route path="events/edit-event" element={<EditEventForm />} />
    <Route path="speakers/create-speaker" element={<CreateSpeakerForm />} />
    <Route path="speakers/edit-speaker" element={<EditSpeakerForm />} />
    <Route path="users/user-registration" element={<AdminRegistration />} />
    <Route path="change-password" element={<AdminUpdatePassword />} />
    <Route path="home-configuration" element={<HomeConfig />} />
  </Route>,
];

export default AuthRoutes;
