import axios from "axios";
import { store } from "react-notifications-component";

export const acceptInvitation = (userDetails, history) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/invitation/${userDetails.uuid}`,
      userDetails,
      config
    );
    const {
      data: { status, message },
    } = res;
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
      history.push("/login");
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
    console.log("🤞Hurray ERROR", error);
  }
};

export const inviteAdminUser = (userDetails, history) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/invite-admin`,
      userDetails,
      config
    );
    const {
      data: { status, message, access_token },
    } = res;
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
    console.log("🤞Hurray ERROR", error);
  }
};

export const fetchAdminUser = (storeID) => async (dispatch) => {
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
      `${process.env.REACT_APP_DATABASEURL}/admin/fetch-admin`,
      {storeID},
      config
    );
    const {
      data: { status, message, data },
    } = res;
    status &&
      dispatch({
        type: "FETCH_ADMINS",
        payload: data,
      });
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
  } catch (error) {
    console.log("🤞Hurray ERROR", error);
  }
};
