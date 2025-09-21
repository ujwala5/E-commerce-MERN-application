// import React, { useEffect, useState } from "react";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import {
//     Box,
//     Button,
//     Paper,
//     TextField,
//     Typography,
// } from "@mui/material";

// const Signup = () => {

//     const { registerRes, loading, error } = useSelector((state) => state.auth);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             mobile: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Name is required'),
//             mobile: Yup.string().required('Mobile number is required'),
//             email: Yup.string().email().required('Email is required'),
//             password: Yup.string()
//                 .required("Password is required")
//                 .min(8, "Password must be at least 8 characters")
//                 .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//                 .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//                 .matches(/[0-9]/, "Password must contain at least one number")
//                 .matches(/[@$!%*?&]/, "Password must contain at least one special character"),

//             confirmPassword: Yup.string()
//                 .oneOf([Yup.ref("password"), null], "Passwords must match")
//                 .required("Confirm Password is required"),

//         }),
//         onSubmit: values => {
//             console.log("values ==>", values);
//             dispatch(register(values));
//         }
//     })

//     useEffect(() => {
//         // console.log({ registerRes });
//         if (registerRes.code === 200) {
//             navigate('/login')
//             toast.success("User registered successfully");
//             registerRes = ""
//         } else if (registerRes.code === 100) {
//             toast.error("User already registered");
//         }
//     }, [registerRes])

//     return (
//         <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             minHeight="100vh"
//             bgcolor="#f4f6f8"
//         >
//             <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
//                 <Typography variant="h5" align="center" gutterBottom>
//                     Signup
//                 </Typography>

//                 <Box component="form" onSubmit={formik.handleSubmit}>
//                     {/* Name */}
//                     <TextField
//                         fullWidth
//                         label="Full Name"
//                         name="name"
//                         value={formik.values.name}
//                         onChange={formik.handleChange}
//                         margin="normal"
//                     />
//                     {formik.touched.name && formik.errors.name ? (
//                         <div style={{ color: "red" }}>{formik.errors.name}</div>
//                     ) : null}

//                     {/* Mobile */}
//                     <TextField
//                         fullWidth
//                         label="Mobile Number"
//                         name="mobile"
//                         value={formik.values.mobile}
//                         onChange={formik.handleChange}
//                         margin="normal"
//                     />
//                     {formik.touched.mobile && formik.errors.mobile ? (
//                         <div style={{ color: "red" }}>{formik.errors.mobile}</div>
//                     ) : null}

//                     {/* Email */}
//                     <TextField
//                         fullWidth
//                         label="Email ID"
//                         name="email"
//                         type="email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         margin="normal"
//                     />

//                     {formik.touched.email && formik.errors.email ? (
//                         <div style={{ color: "red" }}>{formik.errors.email}</div>
//                     ) : null}

//                     {/* Password */}
//                     <TextField
//                         fullWidth
//                         label="Password"
//                         name="password"
//                         type="password"
//                         value={formik.values.password}
//                         onChange={formik.handleChange}

//                         margin="normal"
//                     />
//                     {formik.touched.password && formik.errors.password ? (
//                         <div style={{ color: "red" }}>{formik.errors.password}</div>
//                     ) : null}

//                     {/* Confirm Password */}
//                     <TextField
//                         fullWidth
//                         label="Confirm Password"
//                         name="confirmPassword"
//                         type="password"
//                         value={formik.values.confirmPassword}
//                         onChange={formik.handleChange}
//                     />

//                     {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//                         <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
//                     ) : null}
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 2, borderRadius: 2 }}
//                     >
//                         Signup
//                     </Button>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };

// export default Signup;


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

const Signup = () => {
    const { registerRes, loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            mobile: Yup.string()
                .required('Mobile number is required')
                .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
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
            terms: Yup.boolean()
                .oneOf([true], 'You must accept the terms and conditions')
        }),
        onSubmit: values => {
            dispatch(register(values));
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

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
                    {/* Header with close button */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 1.5
                    }}>
                        <IconButton
                            sx={{ color: '#949494' }}
                            onClick={() => navigate('/')}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    <Box sx={{ padding: 4, pt: 0 }}>
                        {/* Logo Section */}
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography
                                variant="h4"
                                component="h1"
                                fontWeight="700"
                                gutterBottom
                                color="#ff3f6c"
                                sx={{ fontSize: '28px' }}
                            >
                                SnapNBuy
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Create your account
                            </Typography>
                        </Box>

                        {/* Signup Form */}
                        <form onSubmit={formik.handleSubmit}>
                            {/* Name Field */}
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Full Name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person sx={{ color: '#949494' }} />
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

                            {/* Mobile Field */}
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Mobile Number"
                                    name="mobile"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                    helperText={formik.touched.mobile && formik.errors.mobile}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone sx={{ color: '#949494' }} />
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

                            {/* Password Field */}
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: '#949494' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    onClick={handleClickShowPassword}
                                                    sx={{ color: '#949494' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
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

                            {/* Confirm Password Field */}
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: '#949494' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    onClick={handleClickShowConfirmPassword}
                                                    sx={{ color: '#949494' }}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
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

                            {/* Terms and Conditions */}
                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="terms"
                                            checked={formik.values.terms}
                                            onChange={formik.handleChange}
                                            size="small"
                                            sx={{
                                                color: '#ff3f6c',
                                                '&.Mui-checked': {
                                                    color: '#ff3f6c',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" color="text.secondary">
                                            I agree to the{' '}
                                            <Box component="span" sx={{ color: '#ff3f6c' }}>
                                                Terms of Use
                                            </Box>{' '}
                                            &{' '}
                                            <Box component="span" sx={{ color: '#ff3f6c' }}>
                                                Privacy Policy
                                            </Box>
                                        </Typography>
                                    }
                                />
                                {formik.touched.terms && formik.errors.terms ? (
                                    <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
                                        {formik.errors.terms}
                                    </Typography>
                                ) : null}
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
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        {/* Divider */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            my: 3,
                            color: '#d4d5d9'
                        }}>
                            <Divider sx={{ flexGrow: 1, borderColor: '#eaeaec' }} />
                            <Typography variant="body2" sx={{ px: 1.5, color: '#696b79' }}>
                                OR
                            </Typography>
                            <Divider sx={{ flexGrow: 1, borderColor: '#eaeaec' }} />
                        </Box>

                        {/* Login link */}
                        <Box sx={{
                            textAlign: 'center'
                        }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Button
                                    onClick={() => navigate('/login')}
                                    variant="text"
                                    sx={{
                                        color: '#ff3f6c',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        fontSize: '0.9rem',
                                        p: 0,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Signup;
