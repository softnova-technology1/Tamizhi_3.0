import styles from '../Stylesheet/TamilzhiLoader.module.css';

const TamilAnimation = ({ show }) => {
  return (
    show && (
      <div className={styles.overlay}>
        <div className={styles.tam}>
          <p className={styles.p1}>த</p>
          <p className={styles.p1}>மி</p>
          <p className={styles.p1}>ழி</p>
        </div>
      </div>
    )
  );
};

export default TamilAnimation;
