import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/King.module.css';
import { useParams, Link } from 'react-router-dom';
import tamilagam from '../../../image/Tamilagam.jpg';
import tamizhar from '../../../image/tamilar.png';
import tamil from '../../../image/tamizh.jpg';
import brahmi from '../../../image/brahmi.jpg';
import chola from '../../../image/cholaimg.webp';
import chera from '../../../image/cheras-img.png';
import pandiya from '../../../image/pandiya-img.png';
import kalabhra from '../../../image/kalabhra-img.png';
import pallava from '../../../image/pallava-head.jpg';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Context/contextApi';
import TamilAnimation from '../../TamilzhiLoader.js';
const jsonSet = {
  history: [
    {
      enname: 'Tamilagam',
      taname: 'தமிழகம்',
      endescription:
        'The region of Tamil Nadu in the southeast of modern India, shows evidence of having had continuous human habitation from 15,000 BCE to 10,000 BCE. Throughout its history, spanning the early Upper Paleolithic age to modern times, this region has coexisted with various external cultures.The three ancient Tamil dynasties namely Chera, Chola, and Pandya were of ancient origins. Together they ruled over this land with a unique culture and language, contributing to the growth of some of the oldest extant literature in the world.....',
      tadescription:
        'நவீன இந்தியாவின் தென்கிழக்கில் உள்ள தமிழ்நாட்டின் பகுதி, கிமு 15,000 முதல் கிமு 10,000 வரை தொடர்ச்சியான மனிதர்கள் வாழ்ந்ததற்கான சான்றுகளைக் காட்டுகிறது. அதன் வரலாறு முழுவதும், ஆரம்பகால மேல் பழங்கால யுகம் முதல் நவீன காலம் வரை,....',
      image: tamilagam,
      link: '/history/tamilagam',
    },
    {
      enname: 'Thamizhar',
      taname: 'தமிழர்',
      endescription:
        'The Tamils , also known as the Tamilar,  are a Dravidian ethnolinguistic group who natively speak the Tamil language and trace their ancestry mainly to the southern part of the Indian subcontinent. The Tamil language is one of the longest-surviving classical languages, with over two thousand years of written history, dating back to the Sangam period (between 300 BCE and 300 CE). Tamils constitute about 5.7% of the Indian population and form the majority in the South Indian state of Tamil Nadu and the union territory of Puducherry.....',
      tadescription:
        'தமிழர்கள் என்றும் அழைக்கப்படும் தமிழர்கள், திராவிட இனமொழிக் குழுவாகும், அவர்கள் தமிழ் மொழியை பூர்வீகமாகப் பேசுகிறார்கள் மற்றும் அவர்களின் வம்சாவளியை முக்கியமாக இந்திய துணைக் கண்டத்தின் தெற்குப் பகுதியில் வைத்திருக்கிறார்கள். தமிழ் மொழியானது சங்க காலத்திலிருந்து (கிமு 300 முதல்....',
      image: tamizhar,
      link: '/history/thamizhar',
    },
    {
      enname: 'Tamizh',
      taname: 'தமிழ்',
      endescription:
        'Tamil (தமிழ், Tamiḻ, pronounced [t̪amiɻ] ) is a Dravidian language natively spoken by the Tamil people of South Asia. It is one of the two longest-surviving classical languages in India, along with Sanskrit, attested since c. 300 BCE. The language belongs to the southern branch of the Dravidian language family and shares close ties with Malayalam and Kannada. Despite external influences, Tamil has retained a sense of linguistic purism, especially in formal and literary contexts.Tamil was......',
      tadescription:
        'இரண்டு செம்மொழிகளில் இதுவும் ஒன்று, சமஸ்கிருதத்துடன், சி. 300 கி.மு. இந்த மொழி திராவிட மொழிக் குடும்பத்தின் தெற்கு கிளையைச் சேர்ந்தது மற்றும் மலையாளம் மற்றும் கன்னடத்துடன் நெருங்கிய உறவுகளைப் பகிர்ந்து கொள்கிறது. வெளிப்புற தாக்கங்கள் இருந்தபோதிலும், தமிழ் மொழியியல்....',
      image: tamil,
      link: '/history/tamizh',
    },
    {
      enname: 'Brahmi',
      taname: 'பிராமி',
      endescription:
        'In southern India, Tamil-Brahmi—also referred to as Tamili or Damili—was a special kind of Brahmi script that was used only for writing Old Tamil. Researchers have dated this script between the third century BCE and the first century CE, making it one of the oldest writing systems for the Tamil language, both paleographically and stratigraphically. Tamil-Brahmi is an important early writing system in South Asia, with inscriptions found in Tamil Nadu, Kerala, Andhra Pradesh, and Sri Lanka......',
      tadescription:
        'தென்னிந்தியாவில், தமிழ்-பிராமி - தமிழி அல்லது தமிழி என்றும் குறிப்பிடப்படுகிறது - என்பது பழைய தமிழை எழுதுவதற்கு மட்டுமே பயன்படுத்தப்பட்ட ஒரு சிறப்பு வகை பிராமி எழுத்து ஆகும். ஆராய்ச்சியாளர்கள் இந்த எழுத்து முறையை கிமு மூன்றாம் நூற்றாண்டுக்கும் கிபி முதல்....',
      image: brahmi,
      link: '/history/brahmi',
    },
  ],
  kings: [
    {
      enname: 'Chola',
      taname: 'சோழா',
      endescription:
        'The Cholas were a prominent dynasty in South India, and they played a significant role in the Sangam Age, which is generally considered to span from 300 BCE to 1297 CE. During this period, the Cholas engaged in extensive trade both within the Indian subcontinent and with foreign regions. Their trading activities helped them amass wealth, expand their influence, and contribute to the growth of their kingdom.The Cholas had a well-developed maritime trade network, which allowed......',
      tadescription:
        '1297 வரை நீடித்ததாகக் கருதப்படுகிறது. இந்த காலகட்டத்தில், சோழர்கள் இந்திய துணைக்கண்டத்திற்குள்ளும் மற்றும் வெளிநாட்டு பிராந்தியங்களுடனும் விரிவான வணிகத்தில் ஈடுபட்டுள்ளனர். அவர்களின் வர்த்தக நடவடிக்கைகள் அவர்களுக்கு செல்வத்தை குவிக்கவும், அவர்களின் செல்வாக்கை விரிவுபடுத்தவும், அவர்களின் ராஜ்யத்தின் வளர்ச்சிக்கு பங்களிக்கவும் உதவியது',
      image: chola,
      link: '/kings/chola',
    },
    {
      enname: 'Chera',
      taname: 'சேரா',
      endescription:
        'The Chera dynasty, was a Sangam age Tamil dynasty which unified various regions of the western coast and western ghats in southern India to form the early Chera empire. The dynasty, known as one of the Three Crowned Kings of Tamilakam alongside the Chola and Pandya, has been documented as early as the 4th to 3rd centuries BCE. Their governance extended over diverse territories until the 12th century CE.The Cheras were another prominent dynasty during the Sangam Age in South India......',
      tadescription:
        'சேர வம்சம் சங்க காலம் தமிழ் வம்சம் தென்னிந்தியாவின் மேற்குக் கடற்கரை மற்றும் மேற்குத் தொடர்ச்சி மலையின் பல்வேறு பகுதிகளை ஒன்றிணைத்து ஆரம்பகால சேரப் பேரரசை உருவாக்கியது. சோழர் மற்றும் பாண்டியருடன் இணைந்து தமிழகத்தின் முடிசூடப்பட்ட மூன்று மன்னர்களில் ஒருவராக அறியப்படும் இந்த வம்சம் , கிமு 4 முதல் 3 ஆம் நூற்றாண்டுகளுக்கு முன்பே ஆவணப்படுத்தப்பட்டுள்ளது. அவர்களின்....',
      image: chera,
      link: '/kings/chera',
    },
    {
      enname: 'Pandyan',
      taname: 'பாண்டியா',
      endescription:
        'The Pandyas were the earliest of the Muvendhar and were of high antiquity being mentioned by Kātyāyana and Valmiki. However the establishment of a Pandya territory is not known until the sixth century under King Kadungon who liberated the Pandya country from the Kalabhras. Xuanzang reports that Jainism was flourishing while Buddhism was declining during this period. They were famous for being patrons of the Tamil Sangams which were held in their capital, Madurai......',
      tadescription:
        'நாட்டை விடுவித்த கடுங்கோன் மன்னனின் கீழ் ஆறாம் நூற்றாண்டு வரை பாண்டிய பிரதேசம் நிறுவப்பட்டது அறியப்படவில்லை . இந்த காலகட்டத்தில் பௌத்தம் வீழ்ச்சியடைந்து கொண்டிருந்த சமயம் சமண மதம் தழைத்தோங்கி இருந்ததாக சுவான்சாங் தெரிவிக்கிறார் . அவர்கள் தங்கள் தலைநகரான மதுரையில் நடைபெற்ற தமிழ்ச் சங்கங்களின் புரவலர்களாகப் புகழ்....',
      image: pandiya,
      link: '/kings/pandyan',
    },
    {
      enname: 'Kalabhra',
      taname: 'களப்பிரா',
      endescription:
        'The Kalabhra dynasty, also called Kaḷabrar, Kaḷappirar, Kallupura or Kalvar, were rulers of all or parts of Tamil region sometime between the 3rd century and 6th century CE, after the ancient dynasties of the early Cholas, the early Pandyas and Chera. Information about the origin and reign of the Kalabhras is uncertain and scarce. It is believed by historians that the Kalabhras belonged to the kaarkaathaar community of warriors who were possibly once the feudatories of the Cholas and the Pallavas......',
      tadescription:
        'வம்சங்களுக்குப் பிறகு, கிபி 3 ஆம் நூற்றாண்டுக்கும் 6 ஆம் நூற்றாண்டுக்கும் இடைப்பட்ட காலத்தில் தமிழ்ப் பகுதியின் அனைத்து அல்லது பகுதிகளுக்கும் ஆட்சியாளர்களாக இருந்தனர் . களப்பிரர்களின் தோற்றம் மற்றும் ஆட்சி பற்றிய தகவல்கள் நிச்சயமற்றவை மற்றும் அரிதானவை....',
      image: kalabhra,
      link: '/kings/kalabhra',
    },
    {
      enname: 'Pallavas',
      taname: 'பல்லவா',
      endescription:
        'The Pallava dynasty existed from 275 CE to 897 CE, ruling a significant portion of the Deccan, also known as Tondaimandalam. The Pallavas played a crucial role in shaping in particular southern Indian history and heritage.The dynasty rose to prominence after the downfall of the Satavahana Empire, whom they had formerly served as feudatories. The Pallavas became a major southern Indian power during the reign of Mahendravarman I (600–630 CE) and Narasimhavarman I (630–668 CE)......',
      tadescription:
        'பல்லவ வம்சம் கிபி 275 முதல் கிபி 897 வரை இருந்தது, கணிசமான பகுதியை ஆட்சி செய்தது .டெக்கான் , தொண்டைமண்டலம் என்றும் அழைக்கப்படுகிறது . தென்னிந்திய வரலாறு மற்றும் பாரம்பரியத்தை வடிவமைப்பதில் பல்லவர்கள் முக்கிய பங்கு வகித்தனர்.சாதவாகனரின் வீழ்ச்சிக்குப் பிறகு வம்சம் முக்கியத்துவம் பெற்றதுபேரரசு , அவர்கள் முன்பு நிலப்பிரபுக்களாக....',
      image: pallava,
      link: '/kings/pallavas',
    },
  ],
};

function Subcategory() {
  const name = useParams().value;
  const { language } = useContext(Context);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const tamilHead = name
    ? language !== 'en' && name.toLowerCase() === 'history'
      ? 'வரலாறு'
      : 'அரசர்கள்'
    : '';
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <div className={classes.background}>
        <Container className={classes.kingtop1}>
          <h1 className="text-center mb-5">
            {language === 'en' ? name : tamilHead}
          </h1>
          {jsonSet[name].map((item, index) => (
            <Row key={index} className="align-items-center mb-5">
              {/* Conditional Rendering for Alternating Layout */}
              {index % 2 === 0 ? (
                <>
                  <Col md={6}>
                    <div>
                      <h4 className={classes.Kingheight}>
                        {language === 'en' ? (
                          <b>{item.enname}</b>
                        ) : (
                          <b>{item.taname}</b>
                        )}
                      </h4>
                      {language === 'en' ? (
                        <p className={classes.kingdesc}>{item.endescription}</p>
                      ) : (
                        <p className={classes.kingdesc}>{item.tadescription}</p>
                      )}
                      <Link to={item.link}>
                        <button
                          type="button"
                          className={classes.kingbutton}
                          style={{ color: '#c11574', fontWeight: '600' }}
                        >
                          See More
                        </button>
                      </Link>
                    </div>
                  </Col>
                  <Col md={6} className={classes.imagecol}>
                    <img
                      src={item.image}
                      className={`img-fluid rounded ${classes.kingsize1}`}
                      alt={item.name}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col md={6} className={classes.imagecol}>
                    <img
                      src={item.image}
                      className={`img-fluid rounded ${classes.kingsize}`}
                      alt={item.name}
                    />
                  </Col>
                  <Col md={6}>
                    <div>
                      <h4 className={classes.Kingheight}>
                        {language === 'en' ? (
                          <b>{item.enname}</b>
                        ) : (
                          <b>{item.taname}</b>
                        )}
                      </h4>
                      {language === 'en' ? (
                        <p className={classes.kingdesc}>{item.endescription}</p>
                      ) : (
                        <p className={classes.kingdesc}>{item.tadescription}</p>
                      )}
                      <Link to={item.link}>
                        <button
                          type="button"
                          className={classes.kingbutton}
                          style={{ color: '#c11574', fontWeight: '600' }}
                        >
                          See More
                        </button>
                      </Link>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          ))}
        </Container>
      </div>
    </>
  );
}

export default Subcategory;
