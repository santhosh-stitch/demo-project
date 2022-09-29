import React from "react";
import { makeStyles, OutlinedInput } from "@material-ui/core";
import CountrySelect from "./CountrySelectField";
import {isEmpty, set } from "lodash";
import {IMaskInput} from "react-imask";

const useStyles = makeStyles((theme) => ({
   root: {
     borderRadius: "8px",
     "&:Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
     },
   },
   input: {
    height: "7px",
    backgroundColor: "#FFFFFF",
    fontSize: "16px",
    lineHeight: "14px",
    fontWeight: 500,
    "&::placeholder": {
        color: "#09101D",
        opacity: 1,
    },
   },
   border: {
     borderColor: "#000000",
     borderWidth: "1px",
   },
}));

const countriesMask = [
    { countryCode: "SA", value: "# 0000 0000" },
    { countryCode: "BH", value: "#000 0000" },
    { countryCode: "AE", value: "#0 000 0000" },
    { countryCode: "OM", value: "#000 0000" },
    { countryCode: "KW", value: "#000 0000" },
    { countryCode: "EG", value: "#0 0000 0000" },
    { countryCode: "JO", value: "#0 000 0000" },
    { countryCode: "TR", value: "#00 000 0000" },
    { countryCode: "QA", value: "#0 000000" },
    { countryCode: "DE", value: "#000 0000000" },
    { countryCode: "IN", value: "#00 0000000" },
  ];

  const selectMask = ({ selectedCountry }) => {
    const selectedCountryMask = countriesMask.find(
        (country) => country.countryCode === selectedCountry.countryCode
    );
    return selectedCountryMask && selectedCountryMask.value
       ? selectedCountryMask.value
       : '"# 0000 0000"';
  };

  const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref){
    const { defaultValue, onChange, ...other } = props;
    return (
        <IMaskInput
        {...other}
        mask={defaultValue}
        definitions={{
            "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value}})}
        overwrite
        />
    );
  });

  const PhoneNumberField = ({
    value,
    onSetError,
    label,
    error,
    errorMessage,
    handleOnBlur,
    InputlabelProps,
    onChangePhone,
    disabled,
    ...rest
  }) => {
    const classes = useStyles();

    const [countryState, setCountryState] = React.useState(null);
    const [numberState, setNumberState] = React.useState("");
    const [mask, setMask] = React.useState("# 0000 0000");

    const handleChange = ({ phone = null, country = null}) =>{
        if (country) {
            setCountryState(country);
            setMask(selectMask({ selectedCountry: country }));
        }
        if (phone != null) {
            setNumberState(phone);
        }
        const phoneObj = {
            calling_code: !isEmpty(country) ? country.value : countryState.value,
            mobile_number: !isEmpty(phone) ? phone : numberState,
            country_code: !isEmpty(country)
              ? country.countryCode
              : countryState.countryCode,
        };
        onChangePhone(phoneObj);
    };
    return (
        <Box display="flex">
            <CountrySelect
            disabled={disabled}
            getValue={(value) => handleChange({ country: value })}
            />
            <OutlinedInput 
              disabled={disabled}
              placeholder="Phone Number"
              classes={{
                root: classes.root,
                input: classes.input,
                border: classes.border,
              }}
              defaultValue={mask}
              style={{ marginTop: 0, marginBottom: 0, marginLeft: "9px"}}
              error={error}
              fullWidth
              margin="none"
              onBlur={handleOnBlur}
              onChange={(e) => handleChange({ phone: e.target.value })}
              value={numberState}
              variant="outlined"
              inputComponent={TextMaskCustom}
              inputProps={{
                classes: {
                    outlined: classes.label,
                    shrink: classes.shrinkedLabel,
                },
              }}
            />
        </Box>
    );
  };

  export default PhoneNumberField;