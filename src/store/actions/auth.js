import axios from "axios";
import { message as notify } from "antd";

export const fetchItems = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");

    const siteId = localStorage.getItem("siteId");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // Fetching Products
    const fetchProduct = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/fetch-products`,
      { storeID },
      config
    );
    const {
      data: { status, data: products },
    } = fetchProduct;
    if (status) {
      status &&
        dispatch({
          type: "FETCH_PRODUCTS",
          payload: products,
        });
    } else {
      console.log("❌ Failed to fetch products");
    }

    // Fetching Categories
    const fetchCategory = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/fetch-categories`,
      { storeID },
      config
    );
    const {
      data: { status: status1, data: categories },
    } = fetchCategory;
    if (status1) {
      dispatch({
        type: "FETCH_CATEGORIES",
        payload: categories,
      });
    }

    // Fetching Coupons
    const fetchCoupon = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-coupon`,
      { storeID },
      config
    );
    const {
      data: { status: status2, data: coupons },
    } = fetchCoupon;
    if (status2) {
      dispatch({
        type: "FETCH_COUPONS",
        payload: coupons,
      });
    }

    // Fetching Alerts
    const fetchAlert = await axios.get(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-new-alert`,
      config
    );
    const {
      data: { status: status3, data },
    } = fetchAlert;
    // localStorage.setItem("oldOrder", data.orderId);
    status3 &&
      dispatch({
        type: "FETCH_ALERT",
        payload: data,
      });
    // Fetching Alerts
    const fetchReport = await axios.get(
      `${process.env.REACT_APP_DATABASEURL}/admin/admin-reports`,
      config
    );
    const {
      data: { status: status4 },
    } = fetchReport;
    status4 &&
      dispatch({
        type: "ADMIN_REPORT",
        payload: fetchReport?.data,
      });

    // // Fetching Orders
    // const fetchOrder = await axios.post(
    //   `${process.env.REACT_APP_DATABASEURL}/admin/fetch-order`,
    //   {},
    //   config
    // );
    // const {
    //   data: { status: status3, data: orders },
    // } = fetchOrder;
    // if (status3) {
    //   dispatch({
    //     type: "FETCH_ORDERS",
    //     payload: orders,
    //   });
    // }
  } catch (error) {
    console.log("🤞Hurray ERROR", error);
  }
};

export const adminLogin = (userDetails, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/login`,
      userDetails,
      config
    );
    const {
      data: {
        siteId,
        status,
        message,
        storeID,
        access_token,
        data: adminDetails,
      },
    } = res;
    if (status) {
      notify.success(message);

      status && localStorage.setItem("token", access_token);
      status && localStorage.setItem("siteId", siteId);
      status && localStorage.setItem("isAuth", JSON.stringify(true));
      status && localStorage.setItem("storeID", storeID);
      status && localStorage.setItem("admin", adminDetails?.role);
      status &&
        dispatch({
          type: "ADMIN_DETAILS",
          payload: adminDetails,
        });

      console.log("COMING HERE 2");

      // Fetching Required Items
      status && fetchItems(storeID);
      // End of Fetching function

      window.location.replace("/");
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞Hurray ERROR", error);
  }
};

export const updateSite = (siteDetails, history) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const siteId = localStorage.getItem("siteId");
    const storeID = localStorage.getItem("storeID");
    console.log(siteId);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/update-site-settings`,
      { ...siteDetails, _id: siteId, storeID },
      config
    );
    const {
      data: { status, message },
    } = res;
    if (status) {
      notify.success(message);

      status && history.push("/");
    } else {
      notify.error(message);
    }
  } catch (error) {
    notify.error("Session timedout. Please login again!");

    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
  }
};

export const fetchNewNotification = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Fetching Alerts
    const fetchAlert = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-new-alert`,
      {},
      config
    );
    const {
      data: { status, data },
    } = fetchAlert;
    console.log(fetchAlert);
    status &&
      dispatch({
        type: "FETCH_ALERT",
        payload: data,
      });
  } catch (error) {
    console.log(error);
    notify.error("Failed to fetch new notification!");
  }
};

export const isLoggedIn = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Fetching Alerts
    const fetchData = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/isLoggedin`,
      { token, storeID },
      config
    );
    const {
      data: { status, data },
    } = fetchData;
    console.log(fetchData);
    status &&
      dispatch({
        type: "ADMIN_DETAILS",
        payload: data,
      });
    status && localStorage.setItem("admin", data?.role);
    status && fetchItems();
  } catch (error) {
    notify.error("Session timed out. Please login again!");
  }
};

// 600000
