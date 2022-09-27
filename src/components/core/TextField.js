import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "7px",
    marginBottom: "22px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: "1px",
        borderColor: "#000000",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
      },
    },
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "16px",
    lineHeight: "6px",
    opacity: 1,
    color: "#09101D",
    fontWeight: 500,
  },
  shrinkedLabel: {
    lineHeight: "14px",
  },
  inputRoot: {
    opacity: 1,
    borderRadius: "8px",
  },
  input: {
    height: "7px",
    backgroundColor: "#FFFFFF",
    fontSize: "16px",
    lineHeight: "14px",
    fontWeight: 500,
    "&::placeholder": {
      color: "#D5D2CB",
      opacity: 1,
    },
  },
  formHelperText: {
    marginTop: "1px",
    height: 0,
    marginBottom: "-1px",
    fontFamily: "Source Sans Pro",
    fontSize: "12px",
  },
}));

const BasicTextField = (props) => {
  const classes = useStyles();
  const { label, InputProps, ...rest } = props;

  return (
    <>
      <TextField
        classes={{ root: classes.root }}
        label={label}
        placeholder={label}
        InputProps={{
          classes: {
            root: classes.inputRoot,
            input: classes.input,
          },
          ...InputProps,
        }}
        InputLabelProps={{
          classes: {
            outlined: classes.label,
            shrink: classes.shrinkedLabel,
          },
        }}
        FormHelperTextProps={{
          classes: {
            root: classes.formHelperText,
          },
        }}
        variant="outlined"
        {...rest}
      />
    </>
  );
};

export default BasicTextField;
