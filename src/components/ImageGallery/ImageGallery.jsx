import css from "../ImageGallery/ImageGallery.module.css";
import ImageCard from "./ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) return null;

  return (
    <ul className={css.ImageGallery}>
      {images.map((image) => (
        <li className={css.ImageCard} key={image.id}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
