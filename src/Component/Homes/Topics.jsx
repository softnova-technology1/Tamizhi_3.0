import React, { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '../../Stylesheet/Topics.module.css';
import ScrollTitle from '../Homes/ScrollTitle';
import { Context } from '../../Context/contextApi';
import { useNavigate } from 'react-router-dom';

const Topics = () => {
    const { language } = useContext(Context);
    const navigate = useNavigate();
    return (
        <section className={`section-padding ${styles.topicsSection}`}>
            <div className={`container`}>
                <div className={styles.header}>
                    <ScrollTitle className={styles.title}>
                        {language === 'en' ? 'INTERESTING TOPICS' : 'சுவாரசியமான தலைப்புகள்'}
                    </ScrollTitle>
                </div>
                <div className={styles.grid}>
                    {/* Chola Dynasty - Large Card */}
                    <div className={`${styles.card} ${styles.chola}`}>
                        <div className={styles.content}>
                            <h3>{language === 'en' ? 'CHOLA DYNASTY' : 'சோழர் அரசாட்சி'}</h3>
                            <p>
                                {language === 'en' 
                                    ? 'The Cholas were a prominent dynasty in South India, and they played a significant role in the Sangam Age, which is generally considered to span from 300 BCE to 1297 CE. During this period, the Cholas engaged in extensive trade both within the Indian.....' 
                                    : 'சோழர்கள் தென்னிந்தியாவில் ஒரு முக்கிய வம்சமாக இருந்தனர், மேலும் அவர்கள் சங்க காலத்தில் குறிப்பிடத்தக்க பங்கைக் கொண்டிருந்தனர் இது பொதுவாக கிமு 300 முதல் கிபி 1297 வரை நீடித்ததாகக் கருதப்படுகிறது. இந்த காலகட்டத்தில், சோழர்கள் இந்திய துணைக் கண்டத்திலும் வெளிநாடுகளுடனும் விரிவான வர்த்தகத்தில் ஈடுபட்டனர்.'}
                            </p>
                            <button className={styles.btn} onClick={() => navigate('/kings/chola')}>
                                {language === 'en' ? 'READ MORE' : 'மேலும் பார்க்க'}
                            </button>
                        </div>
                        <div className={styles.overlay}></div>
                    </div>

                    <div className={styles.smallGrid}>
                        {/* Historical Places - Small Card */}
                        <div className={`${styles.card} ${styles.smallCard} ${styles.historical}`} onClick={() => navigate('/historical_place')}>
                            <div className={styles.contentBottom}>
                                <h3>{language === 'en' ? 'HISTORICAL PLACES' : 'பாரம்பரிய இடங்கள்'}</h3>
                                <p className={styles.smallDesc}>
                                    {language === 'en'
                                        ? 'Tamil Nadu, a state located in the southern part of India, is known for its rich cultural heritage historical landmarks, and architectural marvels. The state is home to numerous historical places that reflect....'
                                        : 'இந்தியாவின் தெற்குப் பகுதியில் அமைந்துள்ள தமிழ்நாடு, அதன் வளமான கலாச்சார பாரம்பரியம், வரலாற்று அடையாளங்கள் மற்றும் கட்டிடக்கலை அற்புதங்களுக்கு பெயர் பெற்றது.'}
                                </p>
                                <span className={styles.exploreLink}>
                                    {language === 'en' ? 'EXPLORE' : 'ஆராயுங்கள்'} <ArrowRight size={14} />
                                </span>
                            </div>
                            <div className={styles.overlay}></div>
                        </div>

                        {/* Tamilar - Small Card */}
                        <div className={`${styles.card} ${styles.smallCard} ${styles.tamilarSmall}`}>
                            <div className={styles.contentBottom}>
                                <h3>{language === 'en' ? 'TAMILAR' : 'தமிழர்'}</h3>
                                <p className={styles.smallDesc}>
                                    {language === 'en'
                                        ? 'The Tamils, also known as the Tamilar, are a Dravidian ethnolinguistic group who natively speak the Tamil language and trace their ancestry mainly to the southern part of the Indian subcontinent...'
                                        : 'தமிழர்கள் என்றும் அழைக்கப்படும் தமிழர்கள், திராவிட இனமொழிக் குழுவாகும், அவர்கள் தமிழ் மொழியை பூர்வீகமாகப் பேசுகிறார்கள்.'}
                                </p>
                                <span className={styles.exploreLink} onClick={() => navigate('/history/thamizhar')}>
                                    {language === 'en' ? 'EXPLORE' : 'ஆராயுங்கள்'} <ArrowRight size={14} />
                                </span>
                            </div>
                            <div className={styles.overlay}></div>
                        </div>
                    </div>

                    {/* Pandyan Dynasty - Full Width Bottom Card */}
                    <div className={`${styles.card} ${styles.fullWidth} ${styles.pandyan}`}>
                        <div className={styles.content}>
                            <h3>{language === 'en' ? 'PANDYAN DYNASTY' : 'பாண்டியர் அரசாட்சி'}</h3>
                            <p>
                                {language === 'en'
                                    ? 'The Pandyas were the earliest of the Muvendhar and were of high antiquity being mentioned by Kātyāyana and Valmiki.However the establishment of a Pandya territory is not known until the sixth century under King Kadungon who liberated the Pandya country from the Kalabhras. Xuanzang reports that Jainism was flourishing while Buddhism was declining during this period.They were famous for being patrons of the Tamil Sangams which were held in their capital, Madurai....'
                                    : 'பாண்டியர்கள் மூவேந்தர்களில் முந்தியவர்கள் மற்றும் பழமை வாய்ந்தவர்கள். அவர்கள் தங்கள் தலைநகரான மதுரையில் நடைபெற்ற தமிழ் சங்கங்களின் ஆதரவாளர்களாக புகழ் பெற்றனர். இந்தத் பேரரசு அதன் முத்து மீன்பிடி மற்றும் கடல்சார் வர்த்தகத்திற்கு பெயர் பெற்றது.'}
                            </p>
                            <button className={styles.btn}>
                                {language === 'en' ? 'READ MORE' : 'மேலும் பார்க்க'}
                            </button>
                        </div>
                        <div className={styles.overlay}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Topics;
