// App.js
import React, { useState, useEffect } from 'react';
import { Element, scroller } from 'react-scroll';
import { Wrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchImages } from './Api';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  const handleSubmit = newQuery => {
    const newRandomId = Math.random();
    setQuery(`${newRandomId}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = newSelectedImage => {
    setSelectedImage(newSelectedImage);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  useEffect(() => {
    // Scroll logic here
    if (page > 1) {
      const currentGalleryPosition = window.scrollY;
      scroller.scrollTo('image-gallery', {
        duration: 800,
        smooth: 'easeInOutQuart',
        offset: currentGalleryPosition + 700,
      });
    }
  }, [page]);

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />
      <Element name="image-gallery">
        <ImageGallery images={images} handleImageClick={handleImageClick} />
      </Element>
      {isLoading && <Loader />}
      {images.length > 0 && images.length < totalHits && (
        <Button onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <Modal
          src={selectedImage}
          alt={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </Wrapper>
  );
}
