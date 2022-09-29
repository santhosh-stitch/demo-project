import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box } from "@material-ui/core";
import Button from "../core/Button";
//import Form error message 
import PhoneNumberField from "../core/PhoneNumberField";
import { isEmpty } from "lodash";

const MFASetupFrom = ({getValue, loading, backendError }) => {
    return (
        <Box
          display="flex"
          width="100%"
          flexDirection="column"
          justifyContent="center"
          marginTop="37px"
        >
            <Formik
              enableReinitialize
              initialValues={{
                phone_number: {
                mobile_number: "SA",
                calling_code: "+966",
                },
              }}
              validationSchema={Yup.object().shape({
                phone_number: Yup.object()
                .required("Phone & country code is required")
                .shape({
                    calling_code: Yup.string().required("Calling code is required!"),
                    country_code: Yup.string().required("Country is required"),
                    mobile_number: Yup.string().required("Phone number is required")
                }).test(
                    "phone_number",
                    { mobile_number: "Invalid phone number"},
                    function (value) {
                        try {
                            if (
                                isEmpty(value.mobile_number) || isEmpty(value.calling_code) || value.calling_code.length < 3
                            ){
                                return true;
                            }
                            const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
                            const numbe = phoneUtil.parseAndKeepRawInput(
                                `${value.calling_code}${value.mobile_number}`,
                                value.country_code
                            );
                            return phoneUtil.isValidNumber(number);
                        }catch (ex) {
                            return false;
                        }
                    }
                ),
              })}
              onSubmit={(data) =>  getValue(data)}
            >
                {({
                    errors,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    values,
                    isValid,
                    dirty,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <PhoneNumberField 
                          error={Boolean(
                            touched.phone_number &&
                            errors.phone_number &&
                            errors.phone_number.mobile_number
                          )}
                          handleOnBlur={() => setFieldTouched("phone_number")}
                          onChangePhone={(phone) => setFieldValue("phone_number", phone)}
                          value={values.phone_number}
                        />
                        <Box style={{ marginTop: "8px", marginBottom: "24px" }}>
                       <Button
                         disabled={!isValid || !dirty || loading}
                         type="submit"
                         variant="contained"
                        >
                          SEND VERIFICATION CODE
                   </Button>
                  </Box>
                    </form>
                )}

            </Formik>

        </Box>
    );
};

export default MFASetupFrom;