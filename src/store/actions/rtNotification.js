export const setRTNotification = (data) => async dispatch => 
  dispatch({
    type: "SET_RT_NOTIFICATION",
    payload: {
      data: data
    }
  });