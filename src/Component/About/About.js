import { useContext, useState } from 'react';
import Aboutimg1 from './../../image/About-img1.png';
import Aboutimg2 from './../../image/About-img2.png';
import Aboutimg5 from './../../image/About-img5.png';
import Aboutimg6 from './../../image/About-img6.png';
import Aboutimg7 from './../../image/About-img7.png';
import Aboutimg9 from './../../image/About-pic9.png';
import Aboutimg8 from './../../image/About-img-8.png';
import Aboutimg13 from './../../image/About-img11.png';
import Aboutimg4 from './../../image/About-img4.png';
import classes from '../../Stylesheet/About.module.css';
import { Context } from '../../Context/contextApi';

const AboutSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleReadMore = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };
  const { language } = useContext(Context);
  return (
    <>
      <h4 className={classes.About3}>
        <p className={classes.About4}>About Us...</p>
        <img src={Aboutimg1} alt="6y6" className={classes.Aboimg1} />
      </h4>
      <br></br>
      <div className="container" id={classes.About3}>
        <div className="row col-xl-12" id={classes.abo11}>
          <div className="col-xl-7" id={classes.abo1}>
            <div className={classes.thamizhi1}>
              <div className={classes.text1}>
                {language === 'en' ? (
                  <p className={classes.text2}>
                    Welcome to Thamizhi, a passionate platform dedicated to
                    exploring, celebrating, and preserving the rich culture,
                    profound history, classical literature, and timeless beauty
                    of the Tamil language and heritage. We are a new generation
                    of Tamil enthusiasts committed to building a vibrant,
                    inclusive space that bridges tradition and modernity,
                    offering meaningful resources, inspiring stories, and
                    community-driven experiences that keep Tamil close to every
                    heart. Whether you are a native speaker cherishing your
                    roots or a curious learner discovering Tamil’s wonders, we
                    warmly invite you to join us on this beautiful journey to
                    keep our language alive, thriving, and evolving for future
                    generations.
                  </p>
                ) : (
                  <p className={classes.text2}>
                    தமிழி – தமிழ் மொழியும் கலாச்சாரமும் நெடுங்காலம் வாழும்
                    மரபுக் களஞ்சியம். "தமிழை நேசிப்போம், தமிழுடன் வாழ்வோம்" —
                    என்ற எங்கள் நெஞ்சார்ந்த ஆசையும், அழைப்பும் இதுவே. தமிழியின்
                    வழியாக, தமிழின் செழுமையான மொழியும், அதன் மரபும்,
                    கலாச்சாரமும், மற்றும் அடையாளம் அனைத்தையும் ஒளியுடன் ஒலிக்கச்
                    செய்கிறோம். "பழமையை போற்றும் புதிய தலைமுறை" என்ற
                    மனப்பான்மையுடன், நவீன உலகில் பாரம்பரியத்தை எடுத்துச்சொல்லும்
                    ஒரு முயற்சியாக தமிழி உருவாகியுள்ளது. "தமிழ் என்றும்
                    வாழட்டும்" என்பது எங்கள் உறுதியும் நம்பிக்கையும். தமிழின்
                    எழுத்து, இசை, சிந்தனை, மற்றும் வாழ்வியலின் நுட்பங்கள்
                    தலைமுறைகள் கடந்தும் தழைக்கட்டும் என நாங்கள்
                    வலியுறுத்துகிறோம். தமிழின் அழகை மீண்டும் உணர, அதன் பயணத்தில்
                    பங்கெடுக்க, உங்களை நாங்கள் அன்புடன் வரவேற்கிறோம்.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-5" id={classes.abopic1}>
            <img src={Aboutimg2} alt="u7t" className={classes.Aboimg2} />
          </div>
        </div>
      </div>
      <div class="container-fluid" id={classes.con1}>
        <div class="row">
          <div class="col-xl-12">
            <div class="container">
              <div class="row">
                <div class="col">
                  {/* WE ARE OFFERING */}
                  <div
                    className={`container row col-xl-12 d-flex ${expandedIndex === 0 ? classes.active : ''}`}
                    id={classes.About2}
                    style={{
                      ...(expandedIndex === 0 && {
                        backgroundImage: `url(${Aboutimg9})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '580px',
                      }),
                    }}
                  >
                    <div className="col-xl-6" id={classes.gap}>
                      <img src={Aboutimg5} alt="Left" id={classes.hide} />
                      {expandedIndex === 0 && (
                        <p>
                          {language === 'en' ? (
                            <b id={classes.font11}>
                              Kings, History, Arts & Culture, Architecture,
                              Temples, Books, Mystery stories, Historical
                              Places, Mythology, Wars, Poetry, Excavation sites,
                              and Armaments.
                            </b>
                          ) : (
                            <b id={classes.font11}>
                              அரசர்கள், வரலாறு, கலை மற்றும் கலாச்சாரம்,
                              கட்டிடக்கலை, கோயில்கள், புத்தகங்கள், மர்ம கதைகள்,
                              வரலாற்றுச் சிறப்புமிக்க இடங்கள், புராணங்கள்,
                              போர்கள், கவிதைகள், அகழ்வாராய்ச்சி மற்றும்
                              ஆயுதங்கள் ஆகியவை தமிழ் மரபின் அழகையும், ஆழமும்
                              எடுத்துரைக்கும் வண்ணம் அமைந்தவை. இவை அனைத்தையும்
                              தமிழியின் வழியாக நாங்கள் அழுத்தமான தகவல்களாக,
                              ஆர்வமூட்டும் கதைகளாக, சிந்தனைக்குரிய
                              உள்ளடக்கங்களாக வழங்குகிறோம்.
                            </b>
                          )}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-xl-6 position-relative"
                      style={{
                        background:
                          expandedIndex === 0 ? 'none' : `url(${Aboutimg4})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '300px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {expandedIndex === 0 ? (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            textAlign: 'center',
                          }}
                        >
                          <img
                            src={Aboutimg13}
                            id={classes.pic12}
                            alt="Replaced"
                          />
                          <p
                            id={classes.pic13}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              margin: 0,
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.5)',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              maxWidth: '90%',
                              fontWeight: 'bold',
                            }}
                          >
                            We are preserving the legacy ✨
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h2>
                            <b>WE ARE OFFERING</b>
                          </h2>
                          <b
                            className={classes.opacity}
                            onClick={() => handleReadMore(0)}
                            style={{ cursor: 'pointer', fontSize: '20px' }}
                          >
                            Read more
                          </b>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  {/* OUR MISSION */}
                  <div
                    className={`container row col-xl-12 d-flex ${expandedIndex === 1 ? classes.active : ''}`}
                    id={classes.Abo22}
                    style={{
                      ...(expandedIndex === 1 && {
                        backgroundImage: `url(${Aboutimg9})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '580px',
                      }),
                    }}
                  >
                    <div className="col-xl-6" id={classes.gap}>
                      <img src={Aboutimg6} alt="Left" id={classes.hide} />
                      {expandedIndex === 1 && (
                        <p>
                          {language === 'en' ? (
                            <b id={classes.font11}>
                              We aim to create a space where Tamil speakers and
                              enthusiasts worldwide can deepen their connection
                              to Tamil culture, learn about its history, and
                              stay engaged with modern development.
                            </b>
                          ) : (
                            <b id={classes.font11}>
                              உலகம் முழுவதும் உள்ள தமிழ் பேசும் மக்களும், தமிழ்
                              ஆர்வலர்களும் தங்கள் தமிழ் கலாச்சாரத்துடன் உள்ள
                              ஆழமான உறவுகளை உருவாக்கவும், அதன் வரலாற்றைப் பற்றி
                              அறியவும், இன்றைய தமிழ் வளர்ச்சியில் பங்கு பெறவும்
                              நாங்கள் ஒரு சிறப்பான இடத்தை உருவாக்கும்
                              நோக்கத்துடன் பயணிக்கிறோம்.
                            </b>
                          )}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-xl-6 position-relative"
                      style={{
                        background:
                          expandedIndex === 1 ? 'none' : `url(${Aboutimg4})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '300px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {expandedIndex === 1 ? (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            textAlign: 'center',
                          }}
                        >
                          <img
                            src={Aboutimg13}
                            alt="Replaced"
                            id={classes.pic12}
                          />
                          <p
                            id={classes.pic13}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              margin: 0,
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.5)',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              maxWidth: '90%',
                              fontWeight: 'bold',
                            }}
                          >
                            Our mission shapes the future 🌱
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h2>
                            <b>OUR MISSION</b>
                          </h2>
                          <b
                            className={classes.opacity}
                            onClick={() => handleReadMore(1)}
                            style={{ cursor: 'pointer', fontSize: '20px' }}
                          >
                            Read more
                          </b>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  {/* OUR VISION */}
                  <div
                    className={`container row col-xl-12 d-flex ${expandedIndex === 2 ? classes.active : ''}`}
                    id={classes.Abo23}
                    style={{
                      ...(expandedIndex === 2 && {
                        backgroundImage: `url(${Aboutimg9})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '580px',
                      }),
                    }}
                  >
                    <div
                      className="col-xl-6 position-relative"
                      id={classes.vr2}
                      style={{
                        background:
                          expandedIndex === 2 ? 'none' : `url(${Aboutimg4})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '300px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {expandedIndex === 2 ? (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            textAlign: 'center',
                          }}
                        >
                          <img
                            src={Aboutimg13}
                            alt="Replaced"
                            id={classes.pic12}
                          />
                          <p
                            id={classes.pic13}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              margin: 0,
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.5)',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              maxWidth: '90%',
                              fontWeight: 'bold',
                            }}
                          >
                            A vision inspired by the past 🔭
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h2>
                            <b>OUR VISION</b>
                          </h2>
                          <b
                            className={classes.opacity}
                            onClick={() => handleReadMore(2)}
                            style={{ cursor: 'pointer', fontSize: '20px' }}
                          >
                            Read more
                          </b>
                        </div>
                      )}
                    </div>
                    <div className="col-xl-6" id={classes.gap}>
                      <img src={Aboutimg7} alt="Left" id={classes.hide} />
                      {expandedIndex === 2 && (
                        <p>
                          {language === 'en' ? (
                            <b id={classes.font11}>
                              We aim to create a comprehensive resource that
                              preserves Tamil culture for future generations
                              while providing a welcoming space for everyone who
                              wishes to learn and engage with it.
                            </b>
                          ) : (
                            <b id={classes.font11}>
                              "தமிழி" - "ஒரு வார்த்தை மட்டுமல்ல, ஒரு வாழ்வியல்".
                              எதிர்காலத் தலைமுறைகளுக்காக தமிழ் கலாசாரத்தை
                              பாதுகாக்க, அதன் பெருமையையும், பாரம்பரியத்தையும்
                              அறிந்து கொள்ளவும், தமிழி அதை பகிர்ந்து கொள்ள
                              விரும்பும் அனைவருக்கும், அன்பும் அர்ப்பணிப்பும்
                              கொண்ட ஒரு தாய்நிலையாக திகழ்கிறது.
                            </b>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  {/* OUR GOAL */}
                  <div
                    className={`container row col-xl-12 d-flex ${expandedIndex === 3 ? classes.active : ''}`}
                    id={classes.Abo24}
                    style={{
                      ...(expandedIndex === 3 && {
                        backgroundImage: `url(${Aboutimg9})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '580px',
                      }),
                    }}
                  >
                    <div className="col-xl-6" id={classes.gap}>
                      <img src={Aboutimg8} alt="Left" id={classes.hide} />
                      {expandedIndex === 3 && (
                        <p>
                          {language === 'en' ? (
                            <b id={classes.font11}>
                              We bring Tamil closer to people everywhere,
                              intermingling tradition with a fresh, modern
                              perspective.
                            </b>
                          ) : (
                            <b id={classes.font11}>
                              தமிழ் மொழியை உலகம் முழுவதும் பரப்பி, அதன்
                              பாரம்பரியத்தையும், நவீன கலைத் தன்மைகளையும்
                              இணைத்து, தமிழ் மொழியின் சிரப்பையும் அதன்
                              பெருமைகளையும் உலகிற்கு அறிமுகப்படுத்துவது எங்களின்
                              முக்கிய நோக்கம்
                            </b>
                          )}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-xl-6 position-relative"
                      style={{
                        background:
                          expandedIndex === 3 ? 'none' : `url(${Aboutimg4})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '300px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {expandedIndex === 3 ? (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            textAlign: 'center',
                          }}
                        >
                          <img
                            src={Aboutimg13}
                            alt="Replaced"
                            id={classes.pic12}
                          />
                          <p
                            id={classes.pic13}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              margin: 0,
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.5)',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              maxWidth: '90%',
                              fontWeight: 'bold',
                            }}
                          >
                            Preserve. Educate. Evolve. 🎯
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h2>
                            <b>OUR GOAL</b>
                          </h2>
                          <b
                            className={classes.opacity}
                            onClick={() => handleReadMore(3)}
                            style={{ cursor: 'pointer', fontSize: '20px' }}
                          >
                            Read more
                          </b>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
