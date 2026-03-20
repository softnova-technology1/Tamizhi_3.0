import { Container, Row, Col } from 'react-bootstrap';
import { getRandomInt } from '../../utility/uniqueIdGenerator';
import { useOutletContext } from 'react-router-dom';
import classes from '../../Stylesheet/ContentComponent.module.css';
import { Context } from '../../Context/contextApi';
import { useContext } from 'react';

export default function ContentComponent() {
  function titleCheck(title) {
    if (
      title !== 'Pallava Empire (275–897 CE)' &&
      title !== 'பல்லவப் பேரரசு (275–897 CE)' &&
      title !== 'Culture' &&
      title !== 'தமிழக மக்கள்' &&
      title !== 'books' &&
      title !== 'புத்தகம்' &&
      title !== 'LORD SHIVA' &&
      title !== 'சிவபெருமான்' &&
      title !== 'mythology' &&
      title !== 'புராணம்'
    ) {
      return true;
    }
  }
  function componentData(data) {
    return data.subTitle.map((sub) => {
      return (
        <div>
          {sub.subHeading && (
            <>
              <h3
                id={
                  sub.subHeading.toLowerCase() === 'conclusion' ||
                  sub.subHeading.title === 'முடிவுரை'
                    ? `${sub.subHeading.split(' ').join('_')}_${sub.heading.split(' ').join('_')}`
                    : `${sub.subHeading.split(' ').join('_')}`
                }
                className={classes.title2}
              >
                {data.title &&
                  sub.subHeading.toLowerCase() !== data.title.toLowerCase() &&
                  sub.subHeading}
              </h3>
            </>
          )}
          {sub.data &&
            sub.data.map((eachData, index) => {
              return (
                <div
                  id={
                    nameOfContent &&
                    (nameOfContent.toLowerCase() === 'architecture' ||
                      nameOfContent === 'historical_place')
                      ? `${eachData.title.split(' ').join('_')}_${sub.subHeading.split(' ').join('_')}`
                      : eachData.title
                        ? eachData.title.toLowerCase() === 'conclusion' ||
                          eachData.title === 'முடிவுரை'
                          ? `${eachData.title.split(' ').join('_')}_${eachData.heading.split(' ').join('_')}`
                          : `${eachData.title.split(' ').join('_')}`
                        : null
                  }
                  key={`${eachData.title && eachData.title}_${getRandomInt()}`}
                  className={classes.contentOver}
                >
                  {eachData.title &&
                    sub.subHeading &&
                    eachData.title.trim().length !== 0 &&
                    sub.subHeading.trim().length1 !== 0 &&
                    eachData.title !== sub.subHeading && (
                      <h3 className={classes.title2}>{eachData.title}</h3>
                    )}

                  <Container
                    style={{ margin: 0, maxWidth: '100%', width: 'auto' }}
                  >
                    <Row>
                      <Col xs={12} sm={12} md={12}>
                        <div
                          className={
                            eachData.image &&
                            eachData.image.length > 0 &&
                            eachData.image.length !== 1
                              ? classes.flexContainer
                              : classes.flexContainerSingle
                          }
                        >
                          {eachData.image &&
                            eachData.image.map((eachImg) => {
                              return (
                                <div key={`${eachImg.image}_${getRandomInt()}`}>
                                  <img
                                    src={eachImg.image}
                                    alt={eachImg.name}
                                    className={classes.imgsize}
                                  />
                                  {eachImg.imgTitle && (
                                    <p className={classes.imgtext}>
                                      {eachImg.imgTitle}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </Col>
                    </Row>
                  </Container>

                  {eachData.description
                    ? eachData.description.map((value) => {
                        return (
                          <p
                            className={classes.marginBottomdes}
                            key={`${eachData.title}_${getRandomInt()}`}
                            style={{
                              color: darkmode === 'off' ? '#35383d' : '#d1c9c9',
                            }}
                          >
                            {value}
                          </p>
                        );
                      })
                    : eachData.list &&
                      eachData.list.map((liItem) => {
                        return (
                          <li
                            className={classes.listname}
                            key={`${liItem}_${getRandomInt()}`}
                          >
                            {liItem}
                          </li>
                        );
                      })}
                </div>
              );
            })}
        </div>
      );
    });
  }
  const [data, nameOfContent, readMore, handleReadMore] = useOutletContext();
  const { darkmode } = useContext(Context);

  const readMoretodisplay = titleCheck(data.title);
  return (
    <div>
      <div>
        <h2
          className={classes.title1}
          style={{ color: darkmode === 'off' ? 'black' : 'white' }}
        >
          {data.title}
        </h2>
        {data.image && data.image.length !== 0 && (
          <Container>
            <Row>
              <Col xs={12} sm={12} md={12}>
                <div
                  className={
                    data.image.length !== 1
                      ? classes.flexContainer
                      : classes.flexContainerSingle
                  }
                >
                  {data.image.map((eachImg) => {
                    return (
                      <div key={`${eachImg.name}_${getRandomInt()}`}>
                        <img
                          src={eachImg.image}
                          alt={eachImg.name}
                          className={classes.imgsize}
                        />
                        {eachImg.imgTitle && (
                          <p
                            className={classes.imgtext}
                            style={{
                              color: darkmode === 'off' ? 'black' : 'white',
                            }}
                          >
                            {eachImg.imgTitle}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        )}
        {data.description &&
          data.description.map((descriptionArray) => {
            return (
              <p
                key={`${data.title}_${getRandomInt()} `}
                style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}
                className={classes.marginBottomdes}
              >
                {descriptionArray}
              </p>
            );
          })}

        {readMoretodisplay && !readMore && (
          <button
            onClick={handleReadMore}
            className={classes.clickbtn}
            style={{
              backgroundColor: darkmode === 'off' ? 'white' : '#2b2a2a',
              color: darkmode === 'off' ? '#c11574' : '#50C7F0',
              fontWeight: '600',
            }}
          >
            See More
          </button>
        )}
      </div>
      {readMore && readMoretodisplay && componentData(data)}
      {!readMoretodisplay && componentData(data)}
    </div>
  );
}
