import { GridLoader } from 'react-spinners';
import styles from '../Stylesheet/Root.module.css';
export default function Spinner({ loading }) {
  return (
    <div className={styles.spinner}>
      <GridLoader
        color={'#412e24'}
        loading={loading}
        size={15}
        speedMultiplier={1}
        margin={5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
