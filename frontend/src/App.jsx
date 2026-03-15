import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./auth/AuthContext";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import CategoryManagerPage from "./pages/CategoyManagerPage";
import WarehouseProtectedRoute from "./auth/WarehouseProtected";
function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    async function setTheme() {
      if (!theme) {
        setTheme("forest");
        localStorage.setItem("theme", localStorage);
      }
    }
    setTheme();
  }, [theme]);
  const handleSelectedTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };
  return (
    <div className="transition duration-200" data-theme={`${theme}`}>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout onSelectedTheme={handleSelectedTheme} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route element={<WarehouseProtectedRoute/>}>
                <Route path="/category" element={<CategoryManagerPage/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
