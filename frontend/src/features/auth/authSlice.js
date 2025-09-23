import { Category, ClassSharp } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const login = createAsyncThunk('/Auth/login', async (values) => {
    console.log("login : values from asynthunk", values);
    const result = await axios.post('http://localhost:3000/v1/login', {
        header: {
            'Content-Type': "application/Json"
        },
        username: values.username,
        password: values.password
    })

    console.log("result", result)
    return result.data;
})

export const register = createAsyncThunk('/Auth/register', async (values) => {
    console.log("login : values from register asynthunk", values);
    const result = await axios.post('http://localhost:3000/V1/register', {
        header: {
            'Content-Type': "application/Json"
        },
        nameRes: values.name,
        mobile: values.mobile,
        email: values.email,
        password: values.password
    })
    console.log("result", result);
    return result.data;

})

export const forgotPasswordReducer = createAsyncThunk('/Auth/forgotPassword', async (values) => {
    console.log("forgotPassword : values from forgotPassword asynthunk", values);
    const result = await axios.post('http://localhost:3000/V1/forgotPassword', {
        header: {
            'Content-Type': "application/Json"
        },

        emailId: values.email
    })
    console.log("forgotPasswordReducer result", result);
    return result.data;
})

export const resetPasswordReducer = createAsyncThunk('/Auth/resetPasswordReducer', async (values) => {
    console.log("resetPasswordReducer : values from resetPasswordReducer asynthunk", values);
    const result = await axios.post('http://localhost:3000/V1/resetPassword/1', {
        header: {
            'Content-Type': "application/Json"
        },

        Password: values.password
    })
    console.log("resetPasswordReducer result ==>", result);
    return result.data;

})

export const authSlice = createSlice({
    name: "Auth",
    initialState: {
        loading: false,
        error: null,
        registerRes: {},
        result: {},
        forgetPassword: {},
        resetPasswordRes: {}
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("action in fulfill state==>", action.payload);
                state.loading = false
                state.result = action.payload

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            //register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log("action in fulfill state==>", action.payload);
                state.loading = false
                state.registerRes = action.payload

            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            //forgot password
            .addCase(forgotPasswordReducer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPasswordReducer.fulfilled, (state, action) => {
                state.loading = false;
                state.forgetPassword = action.payload
            })
            .addCase(forgotPasswordReducer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            //Reset password
            .addCase(resetPasswordReducer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPasswordReducer.fulfilled, (state, action) => {
                state.loading = false;
                state.resetPasswordRes = action.payload;
            })
            .addCase(resetPasswordReducer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }

})

export default authSlice.reducer;