import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ClientLayout />} />
    </Routes>
  );
}

export default App;
