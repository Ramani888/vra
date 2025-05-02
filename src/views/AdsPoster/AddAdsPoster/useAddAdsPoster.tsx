import React, { useState } from 'react'
import * as Yup from "yup";
import { serverInsertAdsPoster, serverUpdateAdsPoster } from '../../../services/serverApi';
import { IAdsPoster } from '../../../types/adsPoster';

const useAddAdsPoster = (handleClose: () => void, getAdsPosterData: () => void, editDataObject: IAdsPoster | null) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<any>(null);

    const schema = Yup.object().shape({
        image: editDataObject ? Yup.string() : Yup.string()
          .required("Image is a required field.*"),
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'image' && e.target.files && e.target.files.length > 0) {
          setImage(e.target.files[0]);
        }
    };      

    const handleSubmit = async (data: any) => {
        try {
          setLoading(true)
          if (editDataObject) {
            const formData = new FormData();
            formData.append('image', data['image'])
            formData.append('_id', editDataObject?._id)
            await serverUpdateAdsPoster(formData)
          } else {
            const formData = new FormData();
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                formData.append(key, data[key]);
              }
            }
            await serverInsertAdsPoster(formData);
          }
          setLoading(false);
          handleClose();
          setImage('');
          getAdsPosterData();
        } catch (err: any) {
          console.log('err', err)
          setLoading(false)
        }
      }
  
    return {
        schema,
        image,
        handleImageChange,
        handleSubmit,
        loading
    }
}

export default useAddAdsPoster