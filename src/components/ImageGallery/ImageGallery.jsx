import ImageCard from "../ImageCard/ImageCard/";

const ImageGallery = ({ photos, openModal }) => {
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
