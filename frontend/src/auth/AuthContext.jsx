import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import api from "../lib/api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LoaderIcon, LogIn } from "lucide-react";
import { useContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const appName = "WindahouseWare";
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const res = await api.get("/me");
      if(!res.data.data)return
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
      console.log("Error Server Authorizing User," + error);
      return navigate("/login")
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logout Successfully");
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout, Forcing to logout, " + error);
      setUser(null);
      navigate("/");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth, logout, appName }}>
      {loading ? (
        <div className="flex justify-center items-center text-center h-screen text-primary">
          Loading... <LoaderIcon className=" animate-spin" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);
