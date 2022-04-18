const initialState = {
  header: "",
  message: "",
  orderId: null,
}

const rtNotification = (state=initialState, action)  => {
  const { type, payload } = action;

  switch(type) {
    case "SET_RT_NOTIFICATION": 
      return {
        ...state,
        ...payload.data
      };
    default: return state;
  }
}

export default rtNotification;