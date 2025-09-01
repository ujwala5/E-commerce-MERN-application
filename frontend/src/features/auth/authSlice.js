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

export const authSlice = createSlice({
    name: "Auth",
    initialState: {
        loading: false,
        error: null,
        result: {}
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
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
    }

})

export default authSlice.reducer;