import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ src, alt, modalImg }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(prev => !prev);
  };

  return (
    <li
      className="gallery-item"
      onClick={() => {
        toggleModal();
      }}
    >
      <img src={src} alt={alt} loading="lazy" className="item-image" />
      {isOpenModal && <Modal img={modalImg} alt={alt} onToggle={toggleModal} />}
    </li>
  );
};
