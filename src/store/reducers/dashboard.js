const initialState = {
  products: [],
  categories: [],
  coupons: [],
  orders: [],
  viewOrder: {},
  loading: false,
  singleProduct: {},
  newAlert: {},
  adminReport: [],
  users: [],
  admins: [],
  monthlyReport: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "FETCH_MONTHLY_REPORT":
      return {
        ...state,
        monthlyReport: payload,
      };
    case "FETCH_ADMINS":
      return {
        ...state,
        admins: payload,
      };
    case "FETCH_USERS":
      return {
        ...state,
        users: payload,
      };
    case "ADMIN_REPORT":
      return {
        ...state,
        adminReport: payload,
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        newAlert: {},
      };
    case "FETCH_ALERT":
      return {
        ...state,
        newAlert: payload,
      };
    case "SINGLE_PRODUCT":
      return {
        ...state,
        singleProduct: payload,
      };
    case "START_LOADER":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADER":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: payload,
      };
    case "FETCH_COUPONS":
      return {
        ...state,
        coupons: payload,
      };
    case "FETCH_ORDERS":
      return {
        ...state,
        orders: payload,
      };
    case "VIEW_ORDER":
      return {
        ...state,
        viewOrder: payload,
      };
    default:
      return state;
  }
}
