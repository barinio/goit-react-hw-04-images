import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { getImages } from './services/api';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!searchText) return;

    async function getRequest() {
      try {
        setIsLoading(true);
        const data = await getImages(searchText, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        if (data.hits.length === 0) {
          return toast.error('Sorry, there are no images. Please try again.');
        }
        setTotalPages(Math.floor(data.totalHits / 12));
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getRequest();
  }, [searchText, page]);

  const changeSearchText = searchText => {
    setSearchText(searchText);
    setPage(1);
    setImages([]);
    setTotalPages(0);
  };
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    scroll.scrollMore(570);
  };
  return (
    <>
      <Searchbar getSearchData={changeSearchText} />

      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {images.length > 0 && page <= totalPages && <Button onClick={loadMore} />}
      <ToastContainer autoClose={2000} />
    </>
  );
};
