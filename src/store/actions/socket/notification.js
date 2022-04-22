import { listOrderAlerts } from "../orderAlert";

export const listenerNotification = (channel) => async (dispatch) => {
  global.socketIO.on(channel, (data) => {
    dispatch(listOrderAlerts({storeId: data.storeId, limit: 3}));
    dispatch({
      type: "SET_RT_NOTIFICATION",
      payload: {
        data: {
          header: `${data.title}`,
          message: `${data.body}`,
          orderId: data.orderId,
        },
      },
    });
  });
};
