import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



import {
    Box,
    Container,
    Paper,
    TextField,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
    Divider,
    IconButton,
    Alert,
    Fade,
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import {
    AccountCircle,
    Lock,
    Facebook,
    Google,
    Twitter,
    Visibility,
    VisibilityOff,
    Security
} from '@mui/icons-material';

const LoginPage = () => {

    const { result } = useSelector((state) => state.auth);

    console.log("result==>", result);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        valudationSchema: Yup.object({
            username: Yup.string().email('Invalid email address').required('Username is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            console.log("onsubmit values ==>", values)
            dispatch(login(values)).unwrap()
        }
    })

    useEffect(() => {
        // console.log("result from useeffect ==>", result)

        if (!result || Object.keys(result).length === 0) {
            return;
        }
        if (result.code === 200) {
            toast.success("Login successfully")
            sessionStorage.setItem("token", result.token);
            navigate('/home');
        } else {
            toast.error("Invalid Credentials")
        }

    }, [dispatch, result])

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #ada1d5ff 0%, #ffffff 100%)',
                padding: 2
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Fade in={true} timeout={800}>
                    <Paper
                        elevation={10}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.95)',
                            width: '100%',
                            maxWidth: 450,
                            mx: 'auto'
                        }}
                    >
                        <Box sx={{ padding: 4 }}>
                            {/* Logo Section */}
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    fontWeight="700"
                                    gutterBottom
                                    color="primary"
                                >
                                    SnapNBuy
                                </Typography>
                                <Typography variant="h6" component="h2" color="text.secondary">
                                    Welcome back to your account
                                </Typography>
                            </Box>

                            {/* Login Form */}
                            <form onSubmit={formik.handleSubmit}>
                                <Box sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Username or Email"
                                        name="username"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}

                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle color="primary" />
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: '#f9f9f9',
                                                '&:hover fieldset': {
                                                    borderColor: 'primary.main',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main',
                                                    boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}

                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock color="primary" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        edge="end"
                                                    >
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: '#f9f9f9',
                                                '&:hover fieldset': {
                                                    borderColor: 'primary.main',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main',
                                                    boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 3
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                            />
                                        }
                                        label="Remember me"
                                    />
                                    <Typography
                                        component="a"
                                        href="#"
                                        color="primary"
                                        sx={{
                                            textDecoration: 'none',
                                            fontSize: '0.9rem',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Forgot Password?
                                    </Typography>
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                            </form>

                            {/* Divider */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                my: 3,
                                color: 'text.secondary'
                            }}>
                                <Divider sx={{ flexGrow: 1 }} />
                                <Typography variant="body2" sx={{ px: 1.5 }}>
                                    Or continue with
                                </Typography>
                                <Divider sx={{ flexGrow: 1 }} />
                            </Box>

                            {/* Social Login */}
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                                mb: 3
                            }}>
                                <IconButton
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        width: 54,
                                        height: 54,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#3b5998',
                                            color: 'white',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <Facebook />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        width: 54,
                                        height: 54,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#DB4437',
                                            color: 'white',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <Google />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        width: 54,
                                        height: 54,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#1DA1F2',
                                            color: 'white',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <Twitter />
                                </IconButton>
                            </Box>

                            {/* Sign up link */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}

                                    <Button onClick={() => { navigate('/signup') }} variant="text">signUp</Button>


                                    {/* <Button
                                        component="a"
                                        href="#"
                                        color="primary"
                                        fontWeight="600"
                                        sx={{
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Sign Up
                                    </Button> */}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default LoginPage;