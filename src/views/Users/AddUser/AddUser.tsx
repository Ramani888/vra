import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Formik } from 'formik';
import React, { useState } from 'react'
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import AppInput from '../../../components/AppInput/AppInput';
import { BusinessTypeData } from '../../../utils/consts/globalConst';
import useUsers from '../useUsers';
import { CountryStateContainer, Form } from './AddUser.styled';
import useAddUser from './useAddUser';
import { Country, State, City }  from 'country-state-city';

interface Props {
    open: boolean;
    handleClose: () => void;
}

const AddUser: React.FC<Props> = ({ open, handleClose }) => {
  const { schema } = useAddUser()  
  const [address, setAddress] = useState<any>({country: '', state: '', city: ''})
  const handleChangeCountry = (e: any) => {
    const { name, value } = e?.target;
    const findCountry = Country.getAllCountries().find((item) => item?.name === value)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={'body'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
        <DialogTitle id="scroll-dialog-title">{'Add User'}</DialogTitle>
        <Formik
            validationSchema={schema}
            initialValues={{ businessType: '', name: '', companyName: '', mobileNumber: '', email: '', phoneNumber: '', addressFirst: '', addressSecond: '', area: '', country: '', state: '' }}
            onSubmit={(values) => {

            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <DialogContent dividers sx={{gap: 2, display: 'flex', flexDirection: 'column' }}>
                        <AppDropDown 
                            data={BusinessTypeData} 
                            placeHolder={'Please select'} 
                            handleChange={(e) => handleChange(e)} 
                            value={values.businessType}
                            name={'businessType'}
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                            label={'Business Type'}
                            minWidth={'300px'}
                        />

                        <AppInput
                            label='Name' 
                            name='name' 
                            type='text' 
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.name)} 
                            placeholder={'Enter name'} 
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <AppInput
                            label='Company Name' 
                            name='companyName'
                            type='text' 
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.companyName)} 
                            placeholder={'Enter company name'} 
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <AppInput
                            label='Mobile Number'
                            name='mobileNumber' 
                            type='number'
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.mobileNumber)} 
                            placeholder={'Enter mobile number'}
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <AppInput
                            label='Email Address' 
                            name='email' 
                            type='text' 
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.email)} 
                            placeholder={'Enter email address'} 
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <AppInput
                            label='Phone Number'
                            name='phoneNumber' 
                            type='number' 
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.phoneNumber)} 
                            placeholder={'Enter phone number'}
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <AppInput
                            label='Address Line 1' 
                            name='addressFirst' 
                            type='text' 
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.addressFirst)} 
                            placeholder={'Enter address'} 
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <AppInput
                            label='Address Line 2' 
                            name='addressSecond' 
                            type='text' 
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.addressSecond)} 
                            placeholder={'Enter address'} 
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <AppInput
                            label='Area' 
                            name='area' 
                            type='text' 
                            handleChange={(e) => handleChange(e)} 
                            value={String(values?.area)} 
                            placeholder={'Enter area'} 
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                        />

                        <CountryStateContainer>
                            <AppDropDown 
                                data={Country.getAllCountries()} 
                                placeHolder={'Please select country'} 
                                handleChange={(e) => {
                                    handleChange(e);
                                    handleChangeCountry(e);
                                }} 
                                value={values.country}
                                name={'country'}
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                label={'Country'}
                                valueByName={true}
                                minWidth={'150px'}
                            />

                            <AppDropDown 
                                data={State.getAllStates()} 
                                placeHolder={'Please select state'} 
                                handleChange={(e) => handleChange(e)} 
                                value={values.state}
                                name={'state'}
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                label={'State'}
                                minWidth={'150px'}
                                valueByName={true}
                            />
                        </CountryStateContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color={'inherit'}>Cancel</Button>
                        <Button variant="contained" type='submit' color={'primary'} disabled={false}>Submit</Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    </Dialog>
  )
}

export default AddUser