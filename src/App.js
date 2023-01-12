import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import CatalogPage from "./routes/CatalogPage";
import ContactPage from "./routes/ContactPage";
import BlankPage from "./routes/BlankPage";
import EventDetailPage from "./routes/EventDetailPage";
import EventUpdatePage from "./routes/EventUpdatePage";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          <Route path="event/:id" element={<EventDetailPage />} />
          {/*<Route path="event/create" element={<EventCreatePage />} />*/}
          <Route path="event/:id/update" element={<EventUpdatePage />} />
          <Route path="event/:id/managePackages" element={<EventUpdatePage />} />

          <Route path="*" element={<BlankPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
