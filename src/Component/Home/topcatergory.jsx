import { useRef, useEffect } from 'react';
import styles from '../../Stylesheet/TopCategory.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const data = [
  { name: 'History', img: '/images/history.jpg' },
  { name: 'Science', img: '/images/science.jpg' },
  { name: 'Fiction', img: '/images/fiction.jpg' },
  { name: 'Biography', img: '/images/biography.jpg' },
  { name: 'Travel', img: '/images/travel.jpg' },
  { name: 'Technology', img: '/images/technology.jpg' },
  { name: 'Culture', img: '/images/culture.jpg' },
];

const CategoryCarousel = () => {
  const carouselRef = useRef(null);

  const scroll = (offset) => {
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    let interval = null;

    if (carousel) {
      interval = setInterval(() => {
        if (
          carousel.scrollLeft + carousel.offsetWidth >=
          carousel.scrollWidth - 5
        ) {
          carousel.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          scroll(220);
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container} xs={12} sm={12} md={3}>
      <legend className={styles.heading}>Top Category Book</legend>
      <div className={styles.caromain} xs={12} sm={12} md={3}>
        <div className={styles.carouselBox} xs={12} sm={12} md={3}>
          <button
            className={`${styles.arrow} ${styles.left}`}
            onClick={() => scroll(-250)}
          >
            <FaArrowLeft />
          </button>

          <div
            className={styles.carousel}
            ref={carouselRef}
            xs={12}
            sm={12}
            md={3}
          >
            {data.concat(data).map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.circleWrapper}>
                  <div className={styles.circle}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className={styles.image}
                    />
                  </div>
                </div>
                <p className={styles.label}>{item.name}</p>
              </div>
            ))}
          </div>

          <button
            className={`${styles.arrow} ${styles.right}`}
            onClick={() => scroll(350)}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
