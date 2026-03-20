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
    background: `linear-gradient(rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.7)),url(${imgurl})`,
    height: '37rem',
    width: 'auto',
    color: 'white',
  };
  return (
    <div
      style={backgroundStyle}
      className={`${classes.container} ${classes.imageContainer}`}
    >
      <div className={classes.pathdescription}>
        {pathArray.map((item, index) => {
          return (
            <span key={`${getRandomInt()}+${index}`}>
              <Link
                to={`${LinkArray[index]}`}
                style={{
                  marginLeft: '7px',
                  textTransform: 'capitalize',
                  color: 'white',
                }}
              >
                {item}
              </Link>
              {pathArray.length - 1 !== index && (
                <span style={{ marginLeft: '7px' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={classes.svg}
                  >
                    <path d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              )}
            </span>
          );
        })}
      </div>
      <div className={classes.fitCenter}>
        <div className={classes.fontStyle}>{englishContent}</div>
        <div className={`${classes.gapBetweenText} ${classes.fontStyle}`}>
          {tamilContent}
        </div>
      </div>
    </div>
  );
}
