import { useEffect } from 'react';

export const Modal = ({ img, alt, onToggle }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onToggle();
    }
  };

  const onClick = ({ target }) => {
    if (target.className !== 'overlay') {
      onToggle();
      return;
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <img src={img} alt={alt} onClick={onClick} />
      </div>
    </div>
  );
};
