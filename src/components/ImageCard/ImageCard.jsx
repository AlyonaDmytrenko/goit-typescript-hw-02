import css from "./ImageCard.module.css";
const imageCard = ({ photo }) => {
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
