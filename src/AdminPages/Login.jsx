import React from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import DataService from '../services/requestApi'
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const Root = styled("div")({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#383a3a", // Dark Gray Background
});

const StyledPaper = styled(Paper)({
  padding: "40px",
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
  borderRadius: "12px",
  backgroundColor: "#1e1e1e", // Deep Black Card
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#383a3a", // Darker Input Background
    color: "#f5f5f5",
    "& fieldset": { border: "1px solid #ffcc00" }, // Gold Border
    "&:hover fieldset": { borderColor: "#ffcc00" },
    "&.Mui-focused fieldset": { borderColor: "#ffcc00" },
  },
  "& .MuiInputLabel-root": {
    color: "#ffcc00", // Gold Label
  },
  "& .MuiInputBase-input": {
    color: "#f5f5f5", // Soft White Text
  },
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  padding: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  backgroundColor: "#ffcc00", // Gold Button
  color: "#1e1e1e", // Black Text for Contrast
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#e6b800", // Slightly Darker Gold on Hover
  },
});

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit =async(data) => {
        console.log("Login Data:", data);
        try {
            const response = await DataService.Login(data)
            localStorage.clear()
            console.log(response)
            if(response.data.status){
            setTimeout(() => {
              const {userType} = response?.data?.data?.user_data || {}
              if (userType !== 'ADMIN' && userType !== 'subadmin' ) {
                enqueueSnackbar('Access denied. User type is not authorized.', { variant: 'error' });
                return;
              }
              localStorage.setItem('token', response.data.data.jwt_response)
              localStorage.setItem('user_data', JSON.stringify(response.data.data.user_data))
              localStorage.setItem('store_data', JSON.stringify(response.data.data.store_data))
                enqueueSnackbar(response.data.message, { variant: 'success' })
                navigate('/admin')
            }, 1000);

            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
        }
      };
  return (
    <Root>
    <StyledPaper elevation={3}>
      <Typography variant="h5" sx={{ marginBottom: 2, color: "#ffcc00" }}>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label="User Name"
          variant="outlined"
          fullWidth
          {...register("user_name", {
            required: "User Name is required",
            // pattern: {
            //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            //   message: "Invalid email format",
            // },
          })}
          error={!!errors.user_name}
          helperText={errors.user_name ? errors.user_name.message : ""}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />
        <StyledButton type="submit" variant="contained" fullWidth>
          Login
        </StyledButton>
      </form>
    </StyledPaper>
  </Root>
  );
};

export default Login;
