import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import CatalogPage from "./routes/CatalogPage";
import ContactPage from "./routes/ContactPage";
import EventDetailPage from "./routes/EventDetailPage";
import EventUpdatePage from "./routes/EventUpdatePage";
import EventVariantsUpdatePage from "./routes/EventVariantsUpdatePage";
import UserAccessPage from "./routes/UserAccessPage";
import {AuthProvider} from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import ErrorPage from "./routes/ErrorPage";
import UserProfileEditPage from "./routes/UserProfileEditPage";
import UserMyOrdersPage from "./routes/UserMyOrdersPage";
import UserProfilePage from "./routes/UserProfilePage";
import EventCreatePage from "./routes/EventCreatePage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="userAccess" element={<UserAccessPage />} />

          <Route path="event/:eventId" element={<EventDetailPage />} />
          <Route path="user/:username" element={<UserProfilePage />} />

          <Route element={<RequireAuth allowedRoles={"USER"}/>}>
            <Route path="user/profile/edit" element={<UserProfileEditPage />} />
            <Route path="user/my-orders" element={<UserMyOrdersPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["SELLER","ADMIN"]}/>}>
            <Route path="event/create" element={<EventCreatePage />} />
            <Route path="event/:eventId/edit" element={<EventUpdatePage />} />
            <Route path="event/:eventId/editVariants" element={<EventVariantsUpdatePage />} />
          </Route>

          <Route path="unauthorized" element={<ErrorPage errStatus={401} errMessage={"You are not authorized to view this page."} />} />
          <Route path="*" element={<ErrorPage errStatus={404} errMessage={"Requested page does not exist 😭"} />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
