import React, { useState } from 'react'
import { ICategory } from '../../../types/category';
import * as Yup from "yup";
import { serverInsertCategory, serverUpdateCategory } from '../../../services/serverApi';

const useAddCategory = (handleClose: () => void, getCategoryData: () => void, editDataObject: ICategory | null) => {
    const [image, setImage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const schema = Yup.object().shape({
        image: editDataObject ? Yup.string() : Yup.string()
          .required("Image is a required field.*"),
        name: Yup.string()
          .required("Name is a required field.*")
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
            formData.append('name', data['name'])
            formData.append('image', data['image'])
            formData.append('_id', editDataObject?._id)
            await serverUpdateCategory(formData)
          } else {
            const formData = new FormData();
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                formData.append(key, data[key]);
              }
            }
            await serverInsertCategory(formData);
          }
          handleClose();
          setImage('');
          setLoading(false);
          getCategoryData();
        } catch (err: any) {
          console.log('err', err)
          setLoading(false)
        }
    }

    return {
        schema,
        image,
        handleImageChange,
        loading,
        handleSubmit
    }
}

export default useAddCategory