import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

const Signup = () => {

    const { registerRes, loading, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            mobile: Yup.string().required('Mobile number is required'),
            email: Yup.string().email().required('Email is required'),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                .matches(/[0-9]/, "Password must contain at least one number")
                .matches(/[@$!%*?&]/, "Password must contain at least one special character"),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),

        }),
        onSubmit: values => {
            console.log("values ==>", values);
            dispatch(register(values));
        }
    })

    useEffect(() => {
        // console.log({ registerRes });
        if (registerRes.code === 200) {
            navigate('/login')
            toast.success("User registered successfully");
        } else if (registerRes.code === 100) {
            toast.error("User already registered");
        } else {
            toast.error("Something went wrong");
        }
    }, [registerRes])

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f4f6f8"
        >
            <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Signup
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit}>
                    {/* Name */}
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        margin="normal"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div style={{ color: "red" }}>{formik.errors.name}</div>
                    ) : null}

                    {/* Mobile */}
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        margin="normal"
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                        <div style={{ color: "red" }}>{formik.errors.mobile}</div>
                    ) : null}

                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email ID"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        margin="normal"
                    />

                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: "red" }}>{formik.errors.email}</div>
                    ) : null}

                    {/* Password */}
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}

                        margin="normal"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red" }}>{formik.errors.password}</div>
                    ) : null}

                    {/* Confirm Password */}
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />

                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
                    ) : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        Signup
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Signup;
