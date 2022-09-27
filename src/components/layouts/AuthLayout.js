import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Logo from "../../assets/images/StitchLogo.png";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#708090"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    padding: "20px 0",
    [theme.breakpoints.down("md")]: {
      padding: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  body: {
    maxWidth: "455px",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.background.paper,
      // height: "100vh",
    },
  },
  icon: {
    width: "100%",
    maxWidth: "169px",
    height: "31.88px",
  },
  formContainer: {
    width: "100%",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
    border: "0.75px solid #D5D2CB",
    padding: "35px 60px",
    [theme.breakpoints.down("md")]: {
      padding: "35px",
      border: "none",
    },
  },
  headingText: {
    maxWidth: "320px",
    margin: "0 auto",
    fontSize: "24px",
    lineHeight: "30.4px",
    marginTop: "8px",
    marginBottom: "38px",
  },
  subHeadingText: {
    fontSize: "16px",
    lineHeight: "20.2px",
    marginBottom: "24px",
  },
  mobileHeader: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    padding: "24px 0",
  },
  longHeading: {
    marginLeft: "-20px",
    marginRight: "-20px",
    maxWidth: "370px",
    marginBottom: "25px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  bottomText: {
    maxWidth: "140px",
    fontSize: "18px",
    fontWeight: "500",
    color: "#33CEFF",
    marginTop: "19px",
    fontFamily: "Euclid Flex",
  },
  uatEnvColor: {
    color: "#FF7033",
  },
}));

const AuthLayout = ({
  heading,
  subHeading,
  longHeading,
  subHeadingMarginTop,
  ...props
}) => {
  const classes = useStyles(props);
  return (
    <Box className={classes.root}>
      <div className={classes.container}>
        <Hidden smDown>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2%",
            }}
          >
            <img src={Logo} alt="Stitch Logo" className={classes.icon} />
          </div>
        </Hidden>
        <div className={classes.body}>
          <Hidden mdUp>
            <Box className={classes.mobileHeader}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={Logo} alt={Logo} className={classes.icon} />
              </div>
            </Box>
          </Hidden>
          <Box className={classes.formContainer}>
            <Typography
              align="center"
              className={clsx(
                classes.headingText,
                longHeading && classes.longHeading
              )}
            >
              {heading}
            </Typography>
            {subHeading && (
              <Typography
                align="left"
                className={classes.subHeadingText}
                style={{
                  marginTop: subHeadingMarginTop,
                }}
              >
                {subHeading}
              </Typography>
            )}
            {props.children}
          </Box>
        </div>
        <Box
          className={clsx(
            classes.bottomText,
            process.env.REACT_APP_ENVIRONMENT === "UAT" && classes.uatEnvColor
          )}
        >
          <div>{process.env.REACT_APP_ENVIRONMENT}</div>
        </Box>
      </div>
    </Box>
  );
};

export default AuthLayout;
