import axios from "axios";
import { message as notify } from "antd";

export const addProduct = (productDetails, closeDrawer) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");

    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    productDetails.storeID = storeID;
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/create-product`,
      productDetails,
      config
    );
    const {
      data: { status, message, data },
    } = res;
    status &&
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data,
      });
    res.statusText &&
      dispatch({
        type: "STOP_LOADER",
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

export const updateProduct =
  (productDetails, closeDrawer) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const storeID = localStorage.getItem("storeID");
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      productDetails.storeID = storeID;
      const res = await axios.post(
        `${process.env.REACT_APP_DATABASEURL}/admin/update-product`,
        productDetails,
        config
      );
      const {
        data: { status, message, data },
      } = res;
      status &&
        dispatch({
          type: "FETCH_PRODUCTS",
          payload: data,
        });
      res.statusText &&
        dispatch({
          type: "STOP_LOADER",
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

export const deleteProduct =
  (productDetails, closeDrawer) => async (dispatch) => {
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
        `${process.env.REACT_APP_DATABASEURL}/admin/delete-product`,
        { _id: productDetails, storeID },
        config
      );
      const {
        data: { status, message, data },
      } = res;
      res.status && dispatch({ type: "OFF_CUSTOM_LOADER" });
      status &&
        dispatch({
          type: "FETCH_PRODUCTS",
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
