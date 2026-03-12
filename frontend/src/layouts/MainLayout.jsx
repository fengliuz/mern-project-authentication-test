import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/AuthContext";

const MainLayout = ({onSelectedTheme}) => {
    const {appName} = useAuth()
  return (
    <div className=" min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar onSelectedTheme={onSelectedTheme}/>
      <main className=" w-full bg-primary/10" >
        <Outlet />
      </main>
      <footer className=" footer place-items-center p-4 bg-primary/5 text-base-content">
        <aside>
          <p>Copyright © 2026 - {appName} App by Fengli</p>
        </aside>
      </footer>
    </div>
  );
};
export default MainLayout
