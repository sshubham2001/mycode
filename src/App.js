import React, { useState, Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-notifications-component/dist/theme.css";
// import alertSound from "./assets/sound/alert.ogg";

import { InLineLoader } from "./Components/InlineLoader/InlineLoader";
import ProductRoute from "./containers/ProductRoute/ProductRoute";
import DashboardRoute from "./containers/DashboardRoute/DashboardRoute";
import CategoryRoute from "./containers/CategoryRoute/CategoryRoute";
import OrdersRoute from "./containers/OrderRoute/OrderRoute";
import CustomersRoute from "./containers/CustomersRoute/CustomersRoute";
import CouponsRoute from "./containers/CouponsRoute/CouponsRoute";
import SettingsRoute from "./containers/SettingsRoute/SettingsRoute";
import ReportRoute from "./containers/ReportRoute/ReportRoute";
import StaffMembersRoute from "./containers/StaffMembersRoute/StaffMembersRoute";
import SiteSettingRoute from "./containers/SiteSettingRoute/SiteSettingRoute";
import SendMessageRoue from "./containers/SendMessageRoue/SendMessageRoue";
import Login from "./containers/Login/Login";
import {
  fetchItems,
  fetchNewNotification,
  isLoggedIn,
} from "./store/actions/auth";
import Invitation from "./containers/Invitation/Invitation";
import ViewOrder from "./containers/ViewOrder/ViewOrder";
import { fetchOrder } from "./store/actions/order";
import PrintOrder from "./containers/PrintOrder/PrintOrder";

import "bootstrap-icons/font/bootstrap-icons.css";
import { fetchStoreDetails } from "./store/actions/store";

import { Modal } from "./commons/ui";

// SocketIO
import { io } from "socket.io-client";
import { listenerNotification } from "./store/actions/socket/notification";
import config from "./config";
import { listOrderAlerts } from "./store/actions/orderAlert";

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem("token");
  const isAuthenticated = localStorage.getItem("isAuth");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token && isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
function App() {
  const [newOrderId, setNewOrderId] = useState();
  const dispatch = useDispatch();
  const newOrderNotify = useSelector((state) => state.dashboard.newAlert);
  const adminInfo = useSelector((state) => state.user.admin);
  const adminValid = useSelector((state) => state.user.adminValid);

  useEffect(() => {
    dispatch(fetchStoreDetails());
    dispatch(fetchItems());
    dispatch(isLoggedIn());
    // dispatch(fetchNewNotification());
  }, []);

  useEffect(() => {
    if(adminInfo?.storeID) {
      dispatch(listOrderAlerts({storeId: adminInfo.storeID, limit: 3}));
    }
  }, [adminInfo])

  useEffect(() => {
    if (adminValid && adminInfo) {
      let socket = io(config.HOST_URL, {
        transports: ["websocket", "polling"],
      });
      global.socketIO = socket;
      let channel = null;
      if (adminInfo.storeID) {
        channel = `ADMIN_${adminInfo.storeID}`;
      }
      if (channel) {
        dispatch(listenerNotification(channel));
        socket.on("connect_error", () => console.log("Error connecting to sockets"));
      }
    }
  }, [adminValid]);

  const oldOrderId = localStorage.getItem("oldOrder");

  // Fetching Notification API 10 mins each
  // async function fetchAlerts() {
  //   const res = await fetch(
  //     `${process.env.REACT_APP_DATABASEURL}/public/fetch-new-alert`
  //   );
  //   console.log("Fetching Alert");
  //   const data = await res.json();
  //   data.status && dispatch({ type: "FETCH_ALERT", payload: data.data });
  //   if (oldOrderId !== data?.data?.orderId) {
  //     data.status && localStorage.setItem("oldOrder", data?.data?.orderId);
  //   }
  //   dispatch(fetchOrder());
  //   // console.log(data?.data?.orderId, "ID");
  //   // if (oldOrderId != data?.data?.orderId) {
  //   //   console.log(oldOrderId, "OLD");
  //   //   console.log("Playing Alert");
  //   //   let audio = new Audio(
  //   //     "https://notificationsounds.com/storage/sounds/file-b8_discreet-song.mp3"
  //   //   );
  //   //   audio.play();
  //   // }
  // }

  // setInterval(() => {
  //   fetchAlerts();
  // }, 15 * 60 * 1000);

  return (
    <div>
      {/* <ReactNotification /> */}
      <Modal />
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/invitation/:uuid" component={Invitation} />
          <PrivateRoute exact path="/">
            <DashboardRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/products">
            <ProductRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/category">
            <CategoryRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <OrdersRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/customers">
            <CustomersRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/coupons">
            <CouponsRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/settings">
            <SettingsRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/reports">
            <ReportRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/staff-members">
            <StaffMembersRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/site-settings">
            <SiteSettingRoute />
          </PrivateRoute>
          <PrivateRoute exact path="/push-message">
            <SendMessageRoue />
          </PrivateRoute>
          <PrivateRoute exact path="/view-order/:id">
            <ViewOrder />
          </PrivateRoute>
          <PrivateRoute exact path="/print-order/:id">
            <PrintOrder />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
