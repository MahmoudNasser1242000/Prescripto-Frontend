import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    error: null,
    loading: false,
    success: null,
    users: [],
    user: null
}

export const getOneUser = createAsyncThunk("user/getOneUser", async ({token, userId}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.get(`users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async ({token, userId}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.delete(`users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const updateteUser = createAsyncThunk("user/updateteUser", async ({token, userId, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`users/${userId}`, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

const myProfileSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        //get one user
        builder.addCase(getOneUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getOneUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.user = action.payload.user
        })
        builder.addCase(getOneUser.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })

        //delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            toast.success(`${state.success}`);
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })

        //update user
        builder.addCase(updateteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(updateteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.user = action.payload.user
            toast.success(`${state.success}`);
        })
        builder.addCase(updateteUser.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
    }
});

export default myProfileSlice.reducer;