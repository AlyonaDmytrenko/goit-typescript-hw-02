import axios from "axios";

export const requestPhoto = async () => {
  const { data } = await axios.get(
    "https://api.unsplash.com/photos/?client_id=vA8gpQ6KTBVEHn7Ww1-SyYtI9u5qW9n1XEea-EcDvQg"
  );
  return data;
};

export const requestPhotoByQuery = async (query = "") => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=vA8gpQ6KTBVEHn7Ww1-SyYtI9u5qW9n1XEea-EcDvQg&query=${query}`
  );
  return data;
};
