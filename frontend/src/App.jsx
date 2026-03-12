import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./auth/AuthContext";
function App() {
  return (
    <div className="" data-theme="sunset">
      <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
