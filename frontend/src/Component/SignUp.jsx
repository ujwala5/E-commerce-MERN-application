import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';


import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

const Signup = () => {

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
        }
    })

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
                        error={formik.errors}
                        margin="normal"
                    />

                    {/* Mobile */}
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={formik.errors}
                        margin="normal"
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email ID"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.errors}
                        margin="normal"
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.errors}

                        margin="normal"
                    />

                    {/* Confirm Password */}
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.errors}

                    />

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
