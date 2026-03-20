import { getRandomInt } from '../../utility/uniqueIdGenerator';
import classes from '../../Stylesheet/SideNav.module.css';
import { Context } from '../../Context/contextApi';
import { useContext } from 'react';
export default function SideNav({ data, nameOfContent, handleReadMore }) {
  const { darkmode } = useContext(Context);

  return (
    <div>
      <h1
        className={classes.maintitle}
        style={{ color: darkmode === 'off' ? 'black' : 'white' }}
      >
        {data.title}
      </h1>
      {data.subTitle &&
        data.subTitle.map((item, index) => {
          return (
            <div key={`${data.title}_${getRandomInt()}${index}`}>
              {data.title &&
                item.subHeading &&
                data.title.toLowerCase() !== item.subHeading.toLowerCase() && (
                  <h3
                    className={classes.head}
                    style={{
                      color:
                        darkmode === 'off' ? ' rgb(65, 64, 64)' : '#dad3d3',
                      marginTop: '2rem',
                    }}
                  >
                    {item.subHeading}
                  </h3>
                )}

              {item.data &&
                item.data.length !== 0 &&
                item.data.map((eachItem) => {
                  return (
                    eachItem.title &&
                    eachItem.title.trim().length !== 0 && (
                      <div key={`${eachItem.title}_${getRandomInt()}`}>
                        {item.subHeading === eachItem.title ? null : (
                          <h3
                            className={classes.subhead}
                            style={{
                              color:
                                darkmode === 'off'
                                  ? 'rgb(65, 64, 64)'
                                  : '#dad3d3',
                              marginTop: '2rem',
                            }}
                          >
                            {eachItem.title}
                          </h3>
                        )}
                        <p
                          style={{
                            color: darkmode === 'off' ? '#667085' : '#d1c9c9',
                          }}
                        >
                          {eachItem &&
                            eachItem.description &&
                            eachItem.description[0] &&
                            eachItem.description[0].trim().length !== 0 &&
                            `${eachItem.description[0].slice(0, 100)}...`}
                        </p>
                        {data.title.toLowerCase() === 'excavation' ||
                        data.title === 'அகழாய்வு' ? (
                          <div className={classes.flexcontainer}>
                            <button
                              className={classes.clickbtn}
                              style={{
                                backgroundColor:
                                  darkmode === 'off' ? 'white' : '#2b2a2a',
                              }}
                              onClick={(event) => handleReadMore(event)}
                            >
                              <a
                                href={
                                  eachItem.title.toLowerCase() ===
                                    'conclusion' ||
                                  eachItem.title === 'முடிவுரை'
                                    ? `#${eachItem && eachItem.title && eachItem.title.split(' ').join('_')}_${item.subHeading.split(' ').join('_')}`
                                    : `#${eachItem && eachItem.title && eachItem.title.split(' ').join('_')}`
                                }
                                style={{
                                  color:
                                    darkmode === 'off' ? '#c11574' : '#50C7F0',
                                }}
                              >
                                Click Now
                              </a>
                            </button>
                          </div>
                        ) : (
                          <div className={classes.flexcontainer}>
                            <button
                              className={classes.clickbtn}
                              style={{
                                backgroundColor:
                                  darkmode === 'off' ? 'white' : '#2b2a2a',
                              }}
                              onClick={(event) => handleReadMore(event)}
                            >
                              <a
                                href={
                                  nameOfContent &&
                                  (nameOfContent.toLowerCase() ===
                                    'architecture' ||
                                    nameOfContent === 'historical_place')
                                    ? `#${eachItem.title.split(' ').join('_')}_${item.subHeading.split(' ').join('_')}`
                                    : eachItem.title.toLowerCase() ===
                                          'conclusion' ||
                                        eachItem.title === 'முடிவுரை'
                                      ? `#${eachItem && eachItem.title && eachItem.title.split(' ').join('_')}_${eachItem.heading.split(' ').join('_')}`
                                      : `#${eachItem && eachItem.title && eachItem.title.split(' ').join('_')}`
                                }
                                style={{
                                  color:
                                    darkmode === 'off' ? '#c11574' : '#50C7F0',
                                }}
                              >
                                Click Now
                              </a>
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
