import React from "react";
import * as Yup from "yup";
import { makeStyles, Box, Typography, InputAdornment } from "@material-ui/core";
import {ReactComponent as ProfileIcon} from "../../assets/icons/ProfileIcon.svg";
import {ReactComponent as PasswordIcon} from "../../assets/icons/PasswordIcon.svg";
import {Formik} from "formik";
// import { useHistory } from "react-router";
import TextField from "../core/TextField";
import Button from "../core/Button";
import PasswordField from "../core/PasswordField";

const useStyles = makeStyles((theme) => ({
    forgotPasswordText: {
        fontSize: "16px",
        lineHeight: "20px",
        marginTop: "-5px",
    },
    linkText: {
         color: theme.palette.primary.main,
         cursor: "pointer",
    },
    signUpText: {
        fontSize: "18px",
        lineHeight: "23px",
        marginTop: "23px",
    }
}));

  
  const SignInForm = ({ getValue,backendError,loading }) => {
    const classes = useStyles();
    // const history = useHistory();

    return (
        <Box
           display="flex"
           width="100%"
           flexDirection="column"
           justifyContent="center"
           marginTop="50px"
        >
         <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={Yup.object().shape({
               email: Yup.string()
                .email("Email is required!")
                .max(255),
               password: Yup.string()
                .required("Password is required!"),
            })}
        onSubmit={(data) => getValue(data)}
      >
        {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
            isValid,
            dirty
          }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ProfileIcon />
                      </InputAdornment>
                    ),
                     }}
                    width= "263px"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                />
                <br/>
                <PasswordField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                     }}
                    width= "263px" 
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    variant="outlined"
                />
                <Typography align="center" className={classes.forgotPasswordText}>
                    <span className={classes.linkText} 
                    // onClick={() => history.push("/forgot-password")}
                    >
                       Forgot Password?
                    </span>
                </Typography>

                <Box style={{ marginTop: "10px", marginBottom: "22px"}}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isValid || !dirty }
                    >
                         SIGN IN
                    </Button>
                </Box>
                <Typography className={classes.signUpText}>
                     Don’t have an account?{" "}
                    <span className={classes.linkText}>
                        Sign up!
                    </span>
               </Typography>
            </form>
          )}   
       </Formik>
     </Box>
    );
  };

export default SignInForm;