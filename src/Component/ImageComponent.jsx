import classes from '../Stylesheet/ImageComponent.module.css';
import { getRandomInt } from '../utility/uniqueIdGenerator';
import { Link } from 'react-router-dom';
export default function ImageComponent({
  tamilContent,
  englishContent,
  imgurl,
  pathName,
}) {
  const pathArray = ['Home', 'Category'];
  let LinkArray = ['/', '/category'];
  (() => {
    const data = pathName.split('/');
    for (let i = 0; i < data.length; i++) {
      if (data[i] !== '') {
        pathArray.push(data[i]);
        if (data[i].toLowerCase() === 'history') {
          LinkArray.push('/subcategory/history');
        } else if (data[i].toLowerCase() === 'kings') {
          LinkArray.push('/subcategory/kings');
        } else {
          LinkArray.push(`#`);
        }
      }
    }
  })();
  const backgroundStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.65)),url(${imgurl})`,
    height: '50rem',
    width: '100%',
    color: 'white',
  };
  return (
    <div
      style={backgroundStyle}
      className={`${classes.container} ${classes.imageContainer}`}
    >
      <div className={classes.lightRay}></div>
      <div className={classes.pathdescription}>
        {pathArray.map((item, index) => {
          return (
            <span key={`${getRandomInt()}+${index}`} style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                to={`${LinkArray[index]}`}
                className={classes.pathLink}
                style={{
                  color: 'white',
                }}
              >
                {item}
              </Link>
              {pathArray.length - 1 !== index && (
                <span style={{ margin: '0 8px' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={classes.svg}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              )}
            </span>
          );
        })}
      </div>
      <div className={classes.textWrapper} key={pathName}>
         <div className={classes.glassContainer}>
            {/* Scroll Rod Top */}
            <div className={`${classes.scrollPin} ${classes.pinTop}`}>
              <div className={`${classes.pinEnd} ${classes.pinLeft}`}></div>
              <div className={`${classes.pinEnd} ${classes.pinRight}`}></div>
            </div>

            <div className={classes.fontStyle}>{englishContent}</div>
            <div className={`${classes.gapBetweenText}`}>
              {tamilContent}
            </div>

            {/* Tamil Royal Wax Seal */}
            <div className={classes.royalSeal}></div>

            {/* Scroll Rod Bottom */}
            <div className={`${classes.scrollPin} ${classes.pinBottom}`}>
              <div className={`${classes.pinEnd} ${classes.pinLeft}`}></div>
              <div className={`${classes.pinEnd} ${classes.pinRight}`}></div>
            </div>
         </div>
      </div>
    </div>
  );
}
