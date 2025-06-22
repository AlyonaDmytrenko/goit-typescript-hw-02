import { Photo } from "../App/App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  photo: Photo;
}

const imageCard: React.FC<ImageCardProps> = ({ photo }) => {
  return (
    <div>
      <img
        className={css.image}
        width={250}
        src={photo.urls.small}
        alt={photo.description}
      />
    </div>
  );
};

export default imageCard;
