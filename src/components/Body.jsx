import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"

const Body = () => {
  return (
    <div className="grid grid-flow-col">
      <Provider store={appStore}>
        <Header/>
      <Outlet />
      </Provider>
    </div>
  );
};

export default Body;
