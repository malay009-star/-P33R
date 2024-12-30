import axios from "axios";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const useApi = () => {
  const uploadImage = async (file, setLoading) => {
    if (setLoading) setLoading(true);

    const compressedFile = await compressImage(file);

    try {
      const url = URL.createObjectURL(compressedFile);

      const blob = await fetch(url).then((res) => res.blob());
      const storageRef = ref(storage, "/images/" + new Date().getTime());
      const snapshot = await uploadBytes(storageRef, blob);
      const link = await getDownloadURL(snapshot.ref);

      return {
        status: 200,
        message: "Image uploaded successfully",
        image: link,
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        message: error?.response?.data?.message || error.message,
      };
    }
  };

  const uploadImages = async (files) => {
    let images = [];
    for (let i = 0; i < files.length; i++) {
      const response = await uploadImage(files[i]);
      if (response.status === 200) {
        images.push(response.image);
      }
    }

    return {
      status: 200,
      images,
    };
  };

  const updateImages = async (files) => {
    let images = [];
    for (let i = 0; i < files.length; i++) {
      if (typeof files[i] == "string") {
        images.push(files[i]);
      } else {
        const response = await uploadImage(files[i]);
        if (response.status === 200) {
          images.push(response.image);
        }
      }
    }

    return {
      status: 200,
      images,
    };
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  return { uploadImage, uploadImages, updateImages };
};

export default useApi;
