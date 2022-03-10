import axios from "axios";
import { message as notify } from "antd";

export const addCategory = (categoryDetails) => async (dispatch) => {
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
      `${process.env.REACT_APP_DATABASEURL}/admin/create-category`,
      categoryDetails,
      config
    );
    const {
      data: { status, message, data },
    } = res;
    status &&
      dispatch({
        type: "FETCH_CATEGORIES",
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

export const activeCategoryProducts = (categoryDetails) => async (dispatch) => {
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
      `${process.env.REACT_APP_DATABASEURL}/admin/active-category-products`,
      { _id: categoryDetails, storeID },
      config
    );
    const {
      data: { status, message, data },
    } = res;

    status &&
      dispatch({
        type: "FETCH_CATEGORIES",
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

export const inActiveCategoryProducts =
  (categoryDetails) => async (dispatch) => {
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
        `${process.env.REACT_APP_DATABASEURL}/admin/inactive-category-products`,
        { _id: categoryDetails, storeID },
        config
      );
      const {
        data: { status, message, data },
      } = res;

      status &&
        dispatch({
          type: "FETCH_CATEGORIES",
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
