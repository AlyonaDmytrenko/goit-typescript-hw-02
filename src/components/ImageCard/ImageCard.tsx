import css from "./ImageCard.module.css";

interface Photo {
  urls: {
    small:string;

  };
  description: string;
  id: string;
}

interface ImageCardProps{
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
