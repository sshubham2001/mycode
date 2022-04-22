import axios from 'axios';

export const listOrderAlerts = (params) => async dispatch => {
  try {
    let res = await axios({
      method: 'GET',
      url: `/order_alert`,
      params
    });
    dispatch({
      type: "SET_ORDER_ALERT_LIST",
      payload: {
        data: res.data.result,
        total: res.data.meta.totalCount,
        count: res.data.meta.count
      }
    });
  } catch(err) {
    dispatch({
      type: "SET_ORDER_ALERT_LIST",
      payload: {
        data: [],
        total: 0,
        count: 0
      }
    });
  }
}

export const setOrderAlertAsRead = (isRead=true, id) => async dispatch => {
  try {
    let res = await axios({
      method: 'PUT',
      url: `/order_alert/is_read/${id}`,
      data: { isRead }
    });
    dispatch({
      type: "TOGGLE_IS_READ",
      payload: {
        isRead,
        id
      }
    });
  } catch(err) {
    // dispatch({
    //   type: "TOGGLE_IS_READ",
    //   payload: {
    //     data: ,
    //     hasError: true,
    //   }
    // });
  }
}