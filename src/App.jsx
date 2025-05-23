import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import { requestPhotoByQuery } from "./services/api";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

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
