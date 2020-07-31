import { Types } from "../constants/home-types";
import API from "../api/home-api"

export function getUserList() {
  return async function(dispatch, getState) {
    try{
        var responseData = await API.getUsers();
        if(responseData && responseData.users && responseData.users.length > 0){
          var userList = responseData.users;
          dispatch({ type: Types.SAVE_USER_LIST, payload: userList });
        }
    }catch(e){

    }
    
  };
}