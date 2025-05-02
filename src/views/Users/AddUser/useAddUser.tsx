import React from 'react'
import * as Yup from "yup";

const useAddUser = () => {
    const schema = Yup.object().shape({
        businessType: Yup.string().required("businessType is a required field.*"),
        name: Yup.string().required("name is a required field.*"),
        companyName: Yup.string(),
        mobileNumber: Yup.string().required("mobileNumber is a required field.*").matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
        email: Yup.string().required("email address is a required field.*").email(),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
        addressFirst: Yup.string().required("address Line 1 is a required field.*"),
        addressSecond: Yup.string(),
        area: Yup.string().required("area is a required field.*"),
        country: Yup.string().required("country is a required field.*"),
        state: Yup.string().required("state is a required field.*"),
    });
    const handleChange = (e: any) => {
        const { name, value } = e?.target;
    }
    return {
        schema
    }
}

export default useAddUser