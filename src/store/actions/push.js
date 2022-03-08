import axios from "axios";
import { message as notify } from "antd";

export const pushMessage = (pushDetails, history) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    pushDetails.storeID = storeID;
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/push/send`,
      pushDetails,
      config
    );
    const {
      data: { status, message },
    } = res;
    if (status) {
      notify.success(message);

      history.push("/login");
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞Hurray ERROR", error);
  }
};

export const inviteAdminUser = (userDetails, history) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const storeID = localStorage.getItem("storeID");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    userDetails.storeID = storeID;
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/invite-admin`,
      userDetails,
      config
    );
    const {
      data: { status, message, access_token },
    } = res;
    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞Hurray ERROR", error);
  }
};
