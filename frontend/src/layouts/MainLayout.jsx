import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <main className=" grow">
        <Outlet />
      </main>
      <footer className=" footer place-items-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2026 - Gudang App by Fengli</p>
        </aside>
      </footer>
    </div>
  );
};
export default MainLayout
