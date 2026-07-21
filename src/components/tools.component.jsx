import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../services/aws";

// Upload local file
const uploadImageByFile = async (file) => {
  try {
    const imageUrl = await uploadImage(file);

    return {
      success: 1,
      file: {
        url: imageUrl,
      },
    };
  } catch (error) {
    console.error("Image upload failed:", error);

    return {
      success: 0,
    };
  }
};

// Upload image by URL
const uploadImageByUrl = async (url) => {
  try {
    return {
      success: 1,
      file: {
        url,
      },
    };
  } catch (error) {
    console.error("Image URL failed:", error);

    return {
      success: 0,
    };
  }
};


export const tools = {
  embed: Embed,

  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter heading...",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },

  list: {
    class: List,
    inlineToolbar: true,
  },

  quote: {
    class: Quote,
    inlineToolbar: true,
  },

  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
        uploadByUrl: uploadImageByUrl,
      },
    },
  },

  marker: {
    class: Marker,
  },

  inlineCode: {
    class: InlineCode,
  },
};