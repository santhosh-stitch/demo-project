import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "40px",
    borderRadius: "8px",
    textTransform: "none",
    padding: "6px 8px",
  },
  containedText: {
    color: "#FFF",
    fill: "#FFF",
    "&:disabled": {
      color: "#FFF",
      backgroundColor: "#D5D2CB",
    },
  },
  outlined: {
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
    fill: theme.palette.primary.main,
    "&:hover": {
      borderWidth: "2px",
    },
  },
}));

const PrimaryButton = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      color="primary"
      disableElevation
      width="20px"
      classes={{
        root: classes.root,
        containedPrimary: classes.containedText,
        outlinedPrimary: classes.outlined,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
