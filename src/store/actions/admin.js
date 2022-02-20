import axios from "axios";
import { store } from "react-notifications-component";

export const generateMontlyReport = (dates, history) => async (dispatch) => {
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
      `${process.env.REACT_APP_DATABASEURL}/admin/generate-report`,
      { dateOne: dates[0], dateTwo: dates[1] },
      config
    );
    res.statusText && dispatch({ type: "STOP_LOADER" });
    const {
      data: { status, message, data },
    } = res;
    status &&
      dispatch({
        type: "FETCH_MONTHLY_REPORT",
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
