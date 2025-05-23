import { useEffect, useState } from "react";
import { requestPhotoByQuery } from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import { ErrorMessage } from "formik";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";


const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPhotosByQuery = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const data = await requestPhotoByQuery(query, page);
        setPhotos((prevPhotos) => {
          if (page === 1) return data.results;
          return [...prevPhotos, ...data.results];
        });
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotosByQuery();
  }, [query, page]);

  const onSetSearchQuery = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1); 
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {photos && <ImageGallery photos={photos} openModal={openModal} />}
      {photos && (
        <LoadMoreBtn onLoadMore={handleLoadMore} hasMore={photos.length > 0} />
      )}
      <ImageModal
        isOpen={!!selectedPhoto}
        photo={selectedPhoto}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default App;
