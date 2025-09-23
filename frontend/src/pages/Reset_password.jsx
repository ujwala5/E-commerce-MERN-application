import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordReducer } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const { resetPasswordRes } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    validateSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("onSubmit values ==>", values)
      dispatch(resetPasswordReducer(values));
    },
  })

  useEffect(() => {
    console.log("useeffect resetPasswordRes==>", resetPasswordRes);
    if (resetPasswordRes.code === 200) {
      toast.success('Password has been changed successfully');
      navigate('/login');
    } else {
      toast.error('Something went wrong');
    }
  }, [dispatch, resetPasswordRes])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8f9fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            background: "#fff",
            px: 5,
            py: 4,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#ff3f6c", fontFamily: "Poppins, sans-serif" }}
            >
              Reset Password
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Create your new password
            </Typography>
          </Box>

          {/* New Password */}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              label="New Password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              margin="normal"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Reset Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                fontSize: "1rem",
                textTransform: "none",
                backgroundColor: "#ff3f6c",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#e8325b",
                },
              }}
            >
              Reset Password
            </Button>
          </form>
          {/* Divider */}
          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => window.history.back()}
            >
              Back to Login
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;
