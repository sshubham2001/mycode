import axios from "axios";
import { message as notify } from "antd";

export const viewOrder = (order) => async (dispatch) => {
  dispatch({
    type: "VIEW_ORDER",
    payload: order,
  });
};

export const fetchOrder = (history) => async (dispatch) => {
  try {
    const token = localStorage && localStorage.getItem("token");
    const storeID = localStorage && localStorage.getItem("storeID");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // Fetching Orders
    const fetchOrder = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/fetch-orders`,
      { storeID },
      config
    );
    const {
      data: { status: status, data: orders, message },
    } = fetchOrder;
    // console.log(orders);
    if (status) {
      dispatch({
        type: "FETCH_ORDERS",
        payload: orders,
      });
      dispatch({
        type: "STOP_LOADER",
      });
    }
    !status && notify.error(message);

    !status && localStorage.removeItem("token");
    !status && localStorage.removeItem("isAuth");
    !status && history.push("/login");
  } catch (error) {
    console.log(error);
    // localStorage.removeItem("token");
    // localStorage.removeItem("isAuth");
    notify.error("Session timed out. Please login again!");

    // history.push("/login");
    // window.location.reload();
  }
};
export const updateOrder = (couponDetails, history) => async (dispatch) => {
  try {
    const token = localStorage && localStorage.getItem("token");
    const storeID = localStorage && localStorage.getItem("storeID");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    couponDetails.storeID = storeID;
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/order/update-order-status`,
      couponDetails,
      config
    );
    const {
      data: { status, message, data },
    } = res;
    status &&
      dispatch({
        type: "FETCH_ORDERS",
        payload: data,
      });
    if (status) {
      notify.success(message);

      history.push("/orders");
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const fetchSingleOrder = (orderDetails, history) => async (dispatch) => {
  try {
    const token = localStorage && localStorage.getItem("token");
    const storeID = localStorage && localStorage.getItem("storeID");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    orderDetails.storeID = storeID;
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/fetch-single-order`,
      orderDetails,
      config
    );
    const {
      data: { status, message, data },
    } = res;
    status &&
      dispatch({
        type: "VIEW_ORDER",
        payload: data,
      });
    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};
