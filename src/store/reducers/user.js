const initialState = {
  admin: {},
  adminValid: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "ADMIN_DETAILS":
      return {
        ...state,
        admin: payload,
        adminValid: true,
      };
    case "ADMIN_LOGOUT":
      return {
        admin: {},
        adminValid: false,
      };
    default:
      return state;
  }
}
