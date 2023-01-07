import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import CatalogPage from "./routes/CatalogPage";
import ContactPage from "./routes/ContactPage";
import BlankPage from "./routes/BlankPage";
import EventDetailPage from "./routes/EventDetailPage";



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
          <Route path="event/create" element={<EventDetailPage />} />
          <Route path="event/update" element={<EventDetailPage />} />

          <Route path="*" element={<BlankPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
