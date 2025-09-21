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
    InputAdornment,
    IconButton,
    Divider,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    Person,
    Phone,
    Email,
    Lock,
    Close
} from '@mui/icons-material';

const Forgot_password = () => {
    const { registerRes, loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: values => {
            // dispatch(register(values));
        }
    });

    useEffect(() => {
        if (registerRes?.code === 200) {
            navigate('/login');
            toast.success("User registered successfully");
        } else if (registerRes?.code === 100) {
            toast.error("User already registered");
        }
    }, [registerRes, navigate]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2
            }}
        >
            <Box sx={{ maxWidth: '450px', width: '100%' }}>
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}
                >

                    <Box sx={{ padding: 6, pt: 0 }}>
                        {/* Logo Section */}
                        <Box sx={{ textAlign: 'center', mb: 3, mt: 3 }}>
                            <Typography variant="body1" color="text.secondary">
                                Enter your Email Address
                            </Typography>
                        </Box>

                        {/* Signup Form */}
                        <form onSubmit={formik.handleSubmit}>

                            {/* Email Field */}
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: '#949494' }} />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: '4px',
                                            backgroundColor: '#f5f5f6',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: '1px solid #eaeaec'
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#d4d5d9'
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#ff3f6c',
                                                borderWidth: '1px'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    py: 1.2,
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    backgroundColor: '#ff3f6c',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#ff527b',
                                        boxShadow: 'none'
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#ccc'
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Forgot_password;