import { createCtx } from "./create-context";

const initialState = {
  isOpen: false,
  drawerComponent: null,
  data: null,
};
const State = typeof initialState;
const Action = "";
function reducer(state, action) {
  switch (action.type) {
    case "OPEN_DRAWER":
      return {
        ...state,
        isOpen: true,
        drawerComponent: action.drawerComponent,
        data: action.data,
      };
    case "CLOSE_DRAWER":
      return {
        ...state,
        isOpen: false,
        drawerComponent: null,
        data: null,
      };
    default:
      return state;
  }
}
const [useDrawerState, useDrawerDispatch, DrawerProvider] = createCtx(
  initialState,
  reducer
);

export { useDrawerState, useDrawerDispatch, DrawerProvider };
