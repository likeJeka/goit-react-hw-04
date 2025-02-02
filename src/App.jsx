import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";

const API_KEY = "Bk8RWTH5BFrjVMAEN7FOG_4DqlCGU0j7LbjcIeymFGA";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const galleryEndRef = useRef(null);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    setPage(1);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: searchQuery, page: 1, per_page: 9 },
          headers: { Authorization: `Client-ID ${API_KEY}` },
        }
      );
      setImages(response.data.results);
    } catch (error) {
      setError("Failed to load images");
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, page: page + 1, per_page: 9 },
          headers: { Authorization: `Client-ID ${API_KEY}` },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
      setTimeout(() => {
        if (galleryEndRef.current) {
          galleryEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 400);
    } catch (error) {
      setError("Failed to load more images");
      toast.error("Failed to load more images");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !loading && !error && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      <ImageModal
        isOpen={!!selectedImage}
        image={selectedImage}
        onClose={handleCloseModal}
      />
      <div ref={galleryEndRef} />
    </>
  );
};

export default App;
