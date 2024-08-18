import Modal from "react-modal";
import css from "./ImageModal.module.css";
const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      className={css.content}
      closeTimeoutMS={200}
    >
      <button className={css.closeButton} onClick={onClose}>
        Close
      </button>
      {image && (
        <>
          <img
            className={css.modalImg}
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <h2 className={css.modalDescription}>
            {image.description || "No description"}
          </h2>
          <p>by {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
