import axios from "axios";
import { message as notify } from "antd";

export const addProduct = (productDetails) => async (dispatch) => {
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
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/create-product`,
      { productDetails, storeID },
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
    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const updateProduct = (productDetails) => async (dispatch) => {
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
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/update-product`,
      { productDetails, storeID },
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
    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};
