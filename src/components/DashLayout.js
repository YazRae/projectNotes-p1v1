import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter.js";
import DashHeader from "./DashHeader.js";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
