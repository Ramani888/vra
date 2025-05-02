import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "./firbase";
import AWS from "aws-sdk";
import awsconfig from "./aws";

const s3 = new AWS.S3({
  accessKeyId: awsconfig.AWS_ACCESS_KEY_ID,
  secretAccessKey: awsconfig.AWS_SECRET_ACCESS_KEY,
  region: awsconfig.AWS_REGION
});

export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
};

export const isPathIncluded = (pathToCheck: string, subNavArray: any, path: string) => {
  if (subNavArray) {
    for (const item of subNavArray) {
      if (item?.path === pathToCheck) {
        return true;
      }
    }
    return false;
  } else {
    if (pathToCheck === path) {
      return true;
    } else {
      return false;
    }
  }
}

export const isUrlString = (str: any) =>{
  // A simple check if it starts with 'http' could be enough for most cases
  return typeof str === 'string' && str.startsWith('http');
}

export const removeKeyFromObject = (obj: any, keyToRemove: any) => {
  const newObj = { ...obj };
  delete newObj[keyToRemove];
  return newObj;
}

export const removeKeyFromFormData = (formData: any, keyToRemove: any) => {
  const newFormData = new FormData();
  for (const [key, value] of formData.entries()) {
    if (key !== keyToRemove) {
      newFormData.append(key, value);
    }
  }
  return newFormData;
}

export const formatNumber = (number: number) => {
  // Convert the number to a string and insert commas every three digits from the right
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const uploadImage = async (images: any) => {
  // Check if the provided images array is valid and not empty
  if (!images || images.length === 0) {
    throw new Error('No images provided');
  }

  // This array will hold the promises for each image upload
  const uploadPromises = images.map((image: any) => {
    const uniqueFileName = `${image.name}-${Date.now()}`; // Ensure unique file names
    const storageRef = ref(storage, `images/${uniqueFileName}`);

    const metaData = {
      contentType: image.type,
    };

    // Create a promise for uploading each image
    return uploadBytesResumable(storageRef, image, metaData)
      .then((snapshot) => getDownloadURL(snapshot.ref)) // Get the download URL once upload is complete
      .then((downloadUrl) => ({
        _id: generateId(),
        path: downloadUrl,
      })) // Return an object with a unique ID and the download URL
      .catch((error) => {
        console.error(`Failed to upload ${image.name}:`, error);
        return null; // Return null if an error occurs to avoid breaking the Promise.all
      });
  });

  // Wait for all uploads to complete, filtering out any null values in case of errors
  const result = await Promise.all(uploadPromises);

  return result.filter((item) => item !== null); // Return the array of upload results without nulls
};

export const uploadImageS3 = async (images: File[]) => {
  console.log('images', images)
  if (!images || images.length === 0) {
    throw new Error("No images provided");
  }

  // Upload each image and return the uploaded URLs
  const uploadPromises = images?.map((image) => {
    const uniqueFileName = `${Date.now()}-${image.name}`; // Ensure unique file names
    const params = {
      Bucket: awsconfig.S3_BUCKET_NAME || '',
      Key: `uploads/${uniqueFileName}`, // S3 folder path
      Body: image,
      ContentType: image.type,
      ACL: "public-read", // Change if private access is needed
    };

    return s3
      .upload(params)
      .promise()
      .then((data) => ({
        _id: generateId(), // Your existing ID generation function
        path: data.Location, // S3 URL
      }))
      .catch((error) => {
        console.error(`Failed to upload ${image.name}:`, error);
        return null; // Prevent breaking Promise.all()
      });
  });

  const result = await Promise.all(uploadPromises);
  return result.filter((item) => item !== null); // Remove failed uploads
};

export const uploadVideoS3 = async (video: File) => {
  if (!video) {
    throw new Error("No video provided");
  }

  // Generate a unique file name
  const uniqueFileName = `videos/${Date.now()}-${video.name}`; // Save videos in an S3 'videos' folder

  const params = {
    Bucket: awsconfig.S3_BUCKET_NAME || '',
    Key: uniqueFileName,
    Body: video,
    ContentType: video.type,
    ACL: "public-read", // Make video publicly accessible (change if needed)
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // Return the video URL from S3
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video");
  }
};

export const uploadVideo = async (video: any) => {
  if (!video) {
    throw new Error('No video provided'); // Ensure that a valid video file is provided
  }

  // Generate a unique file name for Firebase Storage
  const uniqueFileName = `${video.name}-${Date.now()}`; // Add a timestamp to ensure uniqueness
  const storageRef = ref(storage, `videos/${uniqueFileName}`); // Create storage reference

  const metaData = {
    contentType: video.type, // Set the appropriate content type
  };

  // Upload the video to Firebase Storage
  const snapshot = await uploadBytesResumable(storageRef, video, metaData);

  // Get the download URL of the uploaded video
  const downloadUrl = await getDownloadURL(snapshot.ref);

  // Return only the download URL
  return downloadUrl;
};

export const uploadSingleImage = async (image: any) => {
  if (!image) {
    throw new Error('No image provided'); // Ensure that a valid video file is provided
  }

  // Generate a unique file name for Firebase Storage
  const uniqueFileName = `${image.name}-${Date.now()}`; // Add a timestamp to ensure uniqueness
  const storageRef = ref(storage, `images/${uniqueFileName}`);

  const metaData = {
    contentType: image.type, // Set the appropriate content type
  };

  // Upload the video to Firebase Storage
  const snapshot = await uploadBytesResumable(storageRef, image, metaData);

  // Get the download URL of the uploaded video
  const downloadUrl = await getDownloadURL(snapshot.ref);

  // Return only the download URL
  return downloadUrl;
};