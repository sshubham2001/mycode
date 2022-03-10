import axios from "axios";
import { message as notify } from "antd";

export const fetchStoreDetails = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // Fetching Store Details
    const fetchStoreDetails = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/store/fetch-store-details`,
      { storeID },
      config
    );
    const {
      data: { status, data: storeDetail },
    } = fetchStoreDetails;
    if (status) {
      status &&
        dispatch({
          type: "FETCH_STORE",
          payload: storeDetail,
        });
    } else {
      console.log("Failed to fetch store details");
    }
  } catch (error) {
    console.log("🤞Hurray ERROR", error);
  }
};

export const updateStoreDetails = (storeDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    storeDetails.storeID = storeID;
    // Fetching Store Details
    const fetchStoreDetails = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/store/update-store-details`,
      storeDetails,
      config
    );
    const {
      data: { status, data: updatedStoreDetail, message },
    } = fetchStoreDetails;
    if (status) {
      notify.success(message);
      dispatch({
        type: "FETCH_STORE",
        payload: updatedStoreDetail,
      });
      dispatch({ type: "STOP_LOADER" });
    } else {
      notify.error(message);
      dispatch({ type: "STOP_LOADER" });
    }
  } catch (error) {
    console.log("🤞Hurray ERROR", error);
  }
};
