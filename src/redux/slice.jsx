import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    user_id: null,
    user_access_token: null,
    user_refresh_token: null,
    user_email: null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            const {userId, access, refresh, email} = action.payload;
            state.user_id = userId;
            state.user_access_token = access;
            state.user_refresh_token = refresh;
            state.user_email = email;
        },
        clearCredentials: (state) => {
            state.user_id = null;
            state.user_access_token = null;
            state.user_refresh_token = null;
            state.user_email = null;
        },
        setUserAccessToken: (state, action) =>{
            const {access, refresh} = action.payload;
            state.user_access_token = access;
            state.user_refresh_token = refresh;
        }
    }
})



export const {setCredentials, clearCredentials, setUserAccessToken} = authSlice.actions;

export default authSlice.reducer;