import axios from "axios";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await axios.post(
      "/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.url;
  } catch (error) {
    console.error(error);

    throw error.response?.data || error;
  }
};