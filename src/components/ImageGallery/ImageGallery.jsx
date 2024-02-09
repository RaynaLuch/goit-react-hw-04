import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ imageData, openModal, setImageModal }) => {
  console.log(imageData);
  let imageGallery = imageData.map(function (image) {
    return (
      <li key={image.id}>
        <ImageCard
          image={image}
          openModal={openModal}
          setImageModal={setImageModal}
        />
      </li>
    );
  });
  return <ul className={css.gallery}>{imageGallery}</ul>;
};
