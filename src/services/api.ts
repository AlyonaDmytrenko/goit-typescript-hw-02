// src/services/api.ts
import axios from "axios";
import { Photo } from "../components/App/App.types";

const ACCESS_KEY = "vA8gpQ6KTBVEHn7Ww1-SyYtI9u5qW9n1XEea-EcDvQg";
const BASE_URL = "https://api.unsplash.com";

export const requestPhotoByQuery = async (
  query: string,
  page: number = 1
): Promise<{ results: Photo[]; total: number; total_pages: number }> => {
  const response = await axios.get<{
    results: Photo[];
    total: number;
    total_pages: number;
  }>(
    `${BASE_URL}/search/photos/?client_id=${ACCESS_KEY}&query=${query}&page=${page}`
  );
  return response.data;
};

export const requestPhotoById = async (id: string): Promise<Photo> => {
  const response = await axios.get<Photo>(
    `${BASE_URL}/photos/${id}?client_id=${ACCESS_KEY}`
  );
  return response.data;
};
