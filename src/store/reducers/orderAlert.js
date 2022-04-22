const initialState = {
  data: [],
  count: 0,
  total: 0,
}

const orderAlert = (state=initialState, action)  => {
  const { type, payload } = action;

  switch(type) {
    case "SET_ORDER_ALERT_LIST": 
      return payload;
    case "TOGGLE_IS_READ":
      let updatedItem = payload;
      let tempList = [...state.data]
      tempList.forEach((item, i) => {
        if(item._id === updatedItem.id) {
          tempList[i].isRead = updatedItem.isRead;
        }
      })
      return {
        ...state,
        data: tempList,
      }
    case "CLEAR_ORDER_ALERT": 
      return initialState;
    default: return state;
  }
}

export default orderAlert;