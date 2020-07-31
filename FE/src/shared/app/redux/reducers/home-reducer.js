import { Types } from "../constants/home-types";
const initialState = {
  userList:[],
};
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case Types.SAVE_USER_LIST:
      return { ...state, userList: action.payload  };
    default:
      return state;
  }
}