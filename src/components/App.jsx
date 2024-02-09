import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { getImages } from "./api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchBar/SearchBar";
import { Audio } from "react-loader-spinner";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "1000px",
  },
};

function App() {
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState({});

  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const imgData = await getImages(query, page);
        console.log(imgData);
        setImageData((prevImageData) => [
          ...prevImageData,
          ...imgData.data.results,
        ]);
        setTotalPages(imgData.data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [query, page]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <SearchBar setQuery={setQuery} setImageData={setImageData} />
      {error && <b>Oops, there was an error, please try reloading</b>}

      <ImageGallery
        imageData={imageData}
        openModal={openModal}
        setImageModal={setImageModal}
      />
      {loading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      )}
      {imageData.length > 0 && !loading && totalPages > page && (
        <LoadMoreBtn onClick={handleLoadMoreBtn} />
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="overlay"
        contentLabel="Example Modal"
      >
        <div>
          <img
            className="imgSize"
            src={imageModal.urls?.regular}
            alt={imageModal.alt_description}
          />
        </div>
      </Modal>
    </div>
  );
}
export default App;
