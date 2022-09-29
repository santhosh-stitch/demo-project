import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, makeStyles, Typography } from "@material-ui/core";
import TextField from "../core/TextField";
import Button from "../core/Button";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  forgotPasswordText: {
    fontSize: "16px",
    lineHeight: "20.3px",
    marginTop: "-5px",
  },
  signUpText: {
    fontSize: "18px",
    lineHeight: "22.8px",
    marginTop: "22px",
  },
  linkedText: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  linkedTextDisabled: {
    color: "#D5D2CB",
    cursor: "not-allowed",
  },
  switchContainer: {
    marginTop: "28px",
    display: "flex",
    justifyContent: "center",
  },
}));

const MultiFactorAuthenticationForm = ({
  getValue,
  backendError,
  loading,
  resend,
}) => {
  const classes = useStyles();
  const [resendStatus, setResendStatus] = React.useState(false);

  const timer = setInterval(() => {
    setResendStatus(true);
  }, 30000);
  React.useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      justifyContent="center"
    >
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.string()
            .min(4, "Verification Code must be of minimum 4 characters.")
            .max(10)
            .required("Verification Code is required."),
        })}
        onSubmit={(data) => getValue(data)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          isValid,
          dirty,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.otp && errors.otp)}
              fullWidth
              label="Verification Code"
              margin="normal"
              name="otp"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.otp}
              variant="outlined"
            />
            <Typography
              align="right"
              className={classes.forgotPasswordText}
              style={{ marginTop: "-17px" }}
            >
              Did not receive the OTP? try{" "}
              <span
                className={clsx(
                  resendStatus ? classes.linkedText : classes.linkedTextDisabled
                )}
                onClick={() => {
                  if (!resendStatus) {
                    return;
                  }
                  resend();
                  setResendStatus(false);
                  return () => {
                    clearInterval(timer);
                  };
                }}
              >
                Resend.
              </span>
            </Typography>
            

            <Box style={{ marginTop: "15px", marginBottom: "10px" }}>
              <Button
                disabled={!isValid || !dirty || loading}
                type="submit"
                variant="contained"
              >
                VERIFY CODE
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default MultiFactorAuthenticationForm;
