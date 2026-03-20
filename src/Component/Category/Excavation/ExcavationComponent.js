import { getRandomInt } from '../../../utility/uniqueIdGenerator';
import { useOutletContext } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/ContentComponent.module.css';
import { Context } from '../../../Context/contextApi';
import { useContext } from 'react';
export default function ExcavationComponent() {
  const [data] = useOutletContext();
  const { darkmode } = useContext(Context);

  return (
    <div>
      <h2
        className={classes.title1}
        style={{ color: darkmode === 'off' ? 'black' : 'white' }}
      >
        {data.title}
      </h2>
      <div id={`${data.title.split(' ').join('_')}`}>
        {data.image && data.image.length !== 0 && (
          <Container>
            <Row>
              <Col xs={12} sm={12} md={12}>
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
      </div>
      {data.subTitle &&
        data.subTitle.map((item) => {
          return (
            <div
              id={`${item.subHeading.split(' ').join('_')}`}
              key={`${item.subHeading}_${getRandomInt()} `}
            >
              <h3 className={classes.title2}>{item.subHeading}</h3>
              {item.data &&
                item.data.map((eachData) => {
                  return (
                    <div
                      key={`${eachData.title}_${getRandomInt()} `}
                      id={
                        item.subHeading === eachData.title
                          ? null
                          : eachData.title.toLowerCase() === 'conclusion' ||
                              eachData.title === 'முடிவுரை'
                            ? `${eachData.title.split(' ').join('_')}_${item.subHeading.split(' ').join('_')}`
                            : `${eachData.title.split(' ').join('_')}`
                      }
                      className={classes.contentOver}
                    >
                      {item.subHeading === eachData.title ? (
                        ''
                      ) : (
                        <h3 className={classes.title2}>{eachData.title}</h3>
                      )}

                      {eachData.description &&
                        eachData.description.map((eachDescription) => {
                          return (
                            <p
                              key={`description_${getRandomInt()}`}
                              style={{
                                color:
                                  darkmode === 'off' ? '#35383d' : '#d1c9c9',
                              }}
                              className={classes.marginBottomdes}
                            >
                              {eachDescription}
                            </p>
                          );
                        })}

                      {eachData.details &&
                        eachData.details.map((detail) => {
                          return (
                            <>
                              <p
                                key={`detail_${getRandomInt()}`}
                                style={{
                                  color:
                                    darkmode === 'off' ? 'black' : '#d1c9c9',
                                  fontWeight: 600,
                                }}
                                className={classes.marginBottomdes}
                              >
                                {detail}
                              </p>
                            </>
                          );
                        })}
                      {eachData.persons && (
                        <Container>
                          <Row>
                            <Col xs={12} sm={12} md={12}>
                              {eachData.persons.map((person) => {
                                return (
                                  <Container
                                    key={`persons_${getRandomInt()}`}
                                    style={{
                                      margin: 0,
                                      maxWidth: '100%',
                                      width: 'auto',
                                      marginTop: '5rem',
                                    }}
                                  >
                                    <Row>
                                      <Col xs={12} sm={12} md={6}>
                                        <h3 className={classes.title2}>
                                          {person.imgTitle}
                                        </h3>

                                        <img
                                          src={person.image}
                                          alt={person.name}
                                          className={classes.imgsize}
                                        />

                                        <p
                                          className={classes.imgtext}
                                          style={{
                                            color:
                                              darkmode === 'off'
                                                ? 'black'
                                                : 'white',
                                            textAlign: 'center',
                                          }}
                                        >
                                          {person.dob}
                                        </p>
                                      </Col>

                                      <Col xs={12} sm={12} md={6}>
                                        <p
                                          style={{
                                            color:
                                              darkmode === 'off'
                                                ? '#35383d'
                                                : '#d1c9c9',
                                          }}
                                          className={classes.marginBottomdes}
                                        >
                                          {person.content}
                                        </p>
                                        <h3 className={classes.title2}>
                                          {person.heading}
                                        </h3>
                                        <p
                                          style={{
                                            color:
                                              darkmode === 'off'
                                                ? '#35383d'
                                                : '#d1c9c9',
                                          }}
                                          className={classes.marginBottomdes}
                                        >
                                          {person.description}
                                        </p>
                                      </Col>
                                    </Row>
                                  </Container>
                                );
                              })}
                            </Col>
                          </Row>
                        </Container>
                      )}
                      {eachData.image && (
                        <Container
                          style={{ margin: 0, maxWidth: '100%', width: 'auto' }}
                        >
                          <Row>
                            <Col xs={12} sm={12} md={12}>
                              <div className={classes.flexContainer}>
                                {eachData.image &&
                                  eachData.image.map((eachImg) => {
                                    return (
                                      <div
                                        key={`${eachImg.image}_${getRandomInt()}`}
                                      >
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
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
