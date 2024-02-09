export const ImageCard = ({ image, openModal, setImageModal }) => {
  const handleClick = () => {
    setImageModal(image);
    console.log(image);
    openModal();
  };
  return (
    <div>
      <img
        onClick={handleClick}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};
