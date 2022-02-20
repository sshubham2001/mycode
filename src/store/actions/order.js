import axios from "axios";
import { store } from "react-notifications-component";

export const viewOrder = (order) => async (dispatch) => {
  dispatch({
    type: "VIEW_ORDER",
    payload: order,
  });
};

export const fetchOrder = (history) => async (dispatch) => {
  try {
    const token = localStorage && localStorage.getItem("token");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // Fetching Orders
    const fetchOrder = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/fetch-order`,
      {},
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
    !status &&
      store.addNotification({
        title: "Failed!",
        message: message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    !status && localStorage.removeItem("token");
    !status && localStorage.removeItem("isAuth");
    !status && history.push("/login");
  } catch (error) {
    console.log(error);
    // localStorage.removeItem("token");
    // localStorage.removeItem("isAuth");
    store.addNotification({
      title: "Failed!",
      message: "Session timed out. Please login again!",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
    // history.push("/login");
    // window.location.reload();
  }
};
export const updateOrder = (couponDetails, history) => async (dispatch) => {
  try {
    const token = localStorage && localStorage.getItem("token");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
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
      store.addNotification({
        title: "Success!",
        message: message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      history.push("/orders");
    } else {
      store.addNotification({
        title: "Failed!",
        message: message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};
