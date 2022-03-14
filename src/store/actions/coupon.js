import axios from "axios";
import { message as notify } from "antd";

export const addCoupon = (couponDetails, closeDrawer) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    couponDetails.storeID = storeID;
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
      notify.success(message);
      closeDrawer();
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const deleteCoupon = (couponDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/delete-coupon`,
      { _id: couponDetails, storeID },
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
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};
