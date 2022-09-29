import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel  from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem  from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ReactCountryFlag from "react-country-flag";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) =>({
  formControl: {
    width: "100%",
    maxWidth: "103px",
  },
  formControlLabel: {
    transform: "none",
    color: "#09101D",
    fontWeight: 500,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "22px",
    "&.MuiFormLabel-filled": {
        display: "none",
    },
  },
  shrink: {
  },
  filled: {
    display: "none",
  },
  select: {
    "&:focus": {
        background: "inherit",
    },
    "&:MuiSelect-select": {
        paddingRight: "20px",
    }
  }
}));

const BootstrapInput = withStyles((theme) =>({
   root: {},
   input: {
    borderRadius: 8,
    height: "22px",
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #000000",
    fontSize: 16,
    padding: "10px 26px 10px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: theme.typography.fontFamily,
    "&:focus": {
        borderRadius: 8,
        borderColor: theme.palette.primary.main,
    },
    "&::placeholder": {
        color: "#09101D",
        opacity: 1,
    },
   }
}))(InputBase);

const TestSelection = ({
    getValue,
    options,
    selected,
    error,
    label,
    disabled,
}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState("");
    
    const countries = [
        {countryCode: "SA", value: "+966"},
        {countryCode: "BH", value: "+973"},
        {countryCode: "AE", value: "+971"},
        {countryCode: "OM", value: "+968"},
        {countryCode: "KW", value: "+965"},
        {countryCode: "EG", value: "+20"},
        {countryCode: "JO", value: "+962"},
        {countryCode: "TR", value: "+90"},
        {countryCode: "QA", value: "+974"},
        {countryCode: "DE", value: "+49"},
        {countryCode: "IN", value: "+91"},
    ];

    const handleChange = (event) => {
        setValue(event.target.value);
        getValue(countries.find((country) => country.value === event.target.value));
    };
    return (
        <FormControl className={classes.formControl} disabled={disabled}>
            <InputLabel
            id="country-code-select-lable"
            classes={{
                formControl: classes.formControlLabel,
                // shrink: classes.shrink,
                filled: classes.filled,
            }}
            >
            Code
            </InputLabel>
            <Select
              labelId="country-code-select-label"
              id="country-code-select"
              onChange={handleChange}
              label="Select"
              placeholder="Select"
              value={value}
              classes={{select: classes.select}}
              input={<BootstrapInput/>}
            >
                {countries.map((country) =>(
                    <MenuItem value={country.value}>
                        <ReactCountryFlag 
                          countryCode={country.countryCode}
                          svg
                          style={{
                            fontSize: "1.6em",
                            lineHeight: "1.6em",
                            marginRight: "5px",
                          }}
                        />{" "}
                        {country.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TestSelection;