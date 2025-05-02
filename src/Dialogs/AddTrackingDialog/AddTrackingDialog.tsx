import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, TrackingVideoContainer, TrackingVideoLabel } from './AddTrackingDialog.styled';
import AppInput from '../../components/AppInput/AppInput';
import AppFileInput from '../../components/AppFileInput/AppFileInput';
import { serverInsertTrackingDetail, serverUpdateTrackingDetail } from '../../services/serverApi';
import { ITrackingDetails } from '../../types/order';
import { isUrlString, uploadVideo } from '../../utils/helpers/global';

interface Props {
    open: boolean;
    handleClose: () => void;
    orderId?: string;
    getOrdersData: () => void;
    editTrackingDetailObject?: ITrackingDetails;
}

const AddTrackingDialog: React.FC<Props> = ({ open, handleClose, orderId, getOrdersData, editTrackingDetailObject }) => {
    const [selectedVideo, setSelectedVideo] = useState<any>(editTrackingDetailObject ? editTrackingDetailObject?.video : undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const schema = Yup.object().shape({
        trackingId:  Yup.string()
          .required("Track number is a required.*"),
        packingId:  Yup.string()
          .required("Packet number is a required.*"),
    });
    const handleOnVideoChange = (e: any) => {
        setSelectedVideo(e?.target?.files[0])
    }

    const handleSubmit = async (data: any) => {
        try {
            setLoading(true)
            if (editTrackingDetailObject) {
                if (!isUrlString(data?.video)) {
                    const videoUrl = await uploadVideo(data?.video)
                    data.video = videoUrl
                    data.deleteVideo = editTrackingDetailObject?.video
                }
                data._id = editTrackingDetailObject?._id
                await serverUpdateTrackingDetail(data);
            } else {
                if (data?.video) {
                    const videoUrl = await uploadVideo(data?.video)
                    data.video = videoUrl
                }
                await serverInsertTrackingDetail(data)
            }
            setLoading(false)
            handleClose();
            setSelectedVideo(undefined)
            getOrdersData();
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        setSelectedVideo(editTrackingDetailObject ? editTrackingDetailObject?.video : undefined)
    }, [open])
  return (
    <Dialog
        open={open}
        onClose={!loading ? handleClose : () => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" bgcolor={'#0b3157'} color={'#ffffff'}>
          {editTrackingDetailObject ? 'Update Tracking Detail' :'Add Tracking Detail'}
        </DialogTitle>
        <Formik
            validationSchema={schema}
            initialValues={{ 
                trackingId: editTrackingDetailObject ? editTrackingDetailObject?.trackingId : "",
                packingId: editTrackingDetailObject ? editTrackingDetailObject?.packingId : "",
                video: editTrackingDetailObject ? editTrackingDetailObject?.video : "" 
            }}
            onSubmit={(values) => {
            handleSubmit({...values, video: selectedVideo, orderId: orderId})
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
                <DialogContent dividers sx={{gap: 2, display: 'flex', flexDirection: 'column', width: '400px' }}>
                    <AppInput
                        label='Track Number' 
                        name='trackingId' 
                        type='text' 
                        handleChange={(e) => handleChange(e)} 
                        value={String(values?.trackingId)} 
                        placeholder={'Enter Track Number'} 
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />

                    <AppInput
                        label='Packing ID' 
                        name='packingId' 
                        type='text' 
                        handleChange={(e) => handleChange(e)} 
                        value={String(values?.packingId)} 
                        placeholder={'Enter Packaging ID'} 
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />

                    <TrackingVideoContainer>
                        <TrackingVideoLabel>Select Video</TrackingVideoLabel>
                        <AppFileInput
                            accept="video/mp4,video/x-m4v,video/*"
                            name="video"
                            handleChange={(e) => handleOnVideoChange(e)}
                            value={selectedVideo}
                            isVideo
                            handleRemove={() => setSelectedVideo(undefined)}
                        />
                    </TrackingVideoContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color={'inherit'} disabled={loading}>Cancel</Button>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button variant="contained" type='submit' color={'primary'} disabled={!schema.isValidSync(values) || loading}>Submit</Button>
                        {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                            }}
                        />
                        )}
                    </Box>
                </DialogActions>
            </Form>
            )}
        </Formik>
    </Dialog>
  )
}

export default AddTrackingDialog