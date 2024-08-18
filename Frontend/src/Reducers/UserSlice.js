import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isloggedin:false,
        userid:null,
    },
    reducers: {
      setid(state,action){ //for userid
        state.userid=action.payload
      },
      setisLoggedin(state,action){     //for checking login
        state.isloggedin=action.payload
      },
      logout(state){                //for logout
        state.isloggedin=false
        state.userid=null
      }
    },
  })


  export default userSlice.reducer
  export const {setid,setisLoggedin,logout}=userSlice.actions