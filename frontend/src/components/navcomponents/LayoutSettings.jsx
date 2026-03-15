import { Settings2 } from "lucide-react";

const LayoutSettings = ({ setPosition, isTop, isRight, isLeft }) => (
  <div className={`hidden md:block dropdown ${isTop ? "dropdown-bottom dropdown-left" : "dropdown-end"} ${isRight ? "dropdown-left" : ""} ${isLeft ? "dropdown-right" : ""}`}>
    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
      <Settings2 size={18} />
    </div>
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 border border-primary/20">
      <li className="menu-title">Layout</li>
      <li><button onClick={() => setPosition("top")}>Top</button></li>
      <li><button onClick={() => setPosition("left")}>Left Sidebar</button></li>
      <li><button onClick={() => setPosition("right")}>Right Sidebar</button></li>
    </ul>
  </div>
);
export default LayoutSettings