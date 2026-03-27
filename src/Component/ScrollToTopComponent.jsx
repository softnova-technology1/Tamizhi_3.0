import { useEffect, useState } from 'react';

export default function ScrollToTopComponent() {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <>
      {showButton && (
        <div
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            cursor: 'pointer',
            fontSize: '2rem',
            zIndex: '100',
            backgroundColor: '#412E24',
            color: 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          &#8593;
        </div>
      )}
    </>
  );
}
