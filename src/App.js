import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import DashboardPage from "./routes/DashboardPage";
import ContactPage from "./routes/ContactPage";
import BlankPage from "./routes/BlankPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          <Route path="*" element={<BlankPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
