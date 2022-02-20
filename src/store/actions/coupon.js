import axios from "axios";
import { store } from "react-notifications-component";

export const addCoupon = (couponDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/create-coupon`,
      couponDetails,
      config
    );
    const {
      data: { status, message, data },
    } = res;
    status &&
      dispatch({
        type: "FETCH_COUPONS",
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

export const deleteCoupon = (couponDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/delete-coupon`,
      { _id: couponDetails },
      config
    );
    const {
      data: { status, message, data },
    } = res;
    console.log(data);
    status &&
      dispatch({
        type: "FETCH_COUPONS",
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
