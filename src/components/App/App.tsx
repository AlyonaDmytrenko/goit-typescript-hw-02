import { useEffect, useState } from "react";
import { requestPhotoByQuery, Photo } from "../../services/api"; 
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const App = () => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [page, setPage] = useState<number>(1);

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

  const onSetSearchQuery = (searchTerm: string) => {
    setQuery(searchTerm);
    setPage(1); 
  };

  const openModal = (photo: Photo) => {
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
