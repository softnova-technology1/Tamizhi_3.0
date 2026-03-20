import styles from '../../Stylesheet/Error.module.css';

const NotFound = () => {
  return (
    <section className={styles.page_404}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <div className="col-sm-10 col-sm-offset-1 mx-auto">
              <div className={styles.four_zero_four_bg}>
                <h1 className="text-center">
                  <b>404</b>
                </h1>
              </div>

              <div className={styles.contant_box_404}>
                <h3 className="h2">Looks like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <a href="/" className={styles.link_404}>
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
