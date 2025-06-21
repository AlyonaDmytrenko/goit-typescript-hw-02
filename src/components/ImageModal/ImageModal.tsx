import css from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface Photo {
  urls: {
    small: string;
  };
  description: string;
}

interface ImageModalProps{
  isOpen: boolean;
  photo: Photo | null;
  onRequestClose: ()=> void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, photo, onRequestClose }) => {
  return (
    <Modal
      className={css.modalWindow}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      overlayClassName={css.overlay}
    >
      <div>
        {photo && (
          <>
            <img
              className={css.imageModal}
              src={photo.urls.small}
              alt={photo.description}
            />
            <button onClick={onRequestClose}>Close</button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
