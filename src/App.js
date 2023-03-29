import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<ClientLayout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
