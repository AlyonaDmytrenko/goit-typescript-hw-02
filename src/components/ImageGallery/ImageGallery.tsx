import ImageCard from "../ImageCard/ImageCard";
import type { Photo } from "../App/App.types";

interface ImageGalleryProps {
  photos: Photo[];
  openModal: (photo: Photo) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, openModal }) => {
  return (
    <ul>
      {Array.isArray(photos) &&
        photos.map((photo) => {
          return (
            <li key={photo.id} onClick={() => openModal(photo)}>
              <ImageCard photo={photo} />
              <h2>Description:{photo.description}</h2>
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
