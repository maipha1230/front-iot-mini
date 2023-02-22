import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config/config";

const initialState = {
    f_name: "",
    l_name: "",
    img: null
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.f_name = action.payload.f_name
            state.l_name = action.payload.l_name
            state.img = action.payload.img ? `${API_URL}/${action.payload.img}` : `${API_URL}/${action.payload.picture}`
        }
    }
})

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer;