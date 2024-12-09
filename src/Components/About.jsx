import React from 'react';
import '../Styles/About.css';
import kep1 from '../assets/kep1.png';
import kep2 from '../assets/kep2.jpg';
import kep3 from '../assets/kep3.jpg';
import kep4 from '../assets/kep4.jpg';
import kep5 from '../assets/kep5.jpg';


export const About = () => {
  return (
    <div className="about-container">
        {/* Divider Image */}
        <img src={kep1} alt="Divider 1" className="divider-image first" />
        {/* Section 1 */}
        <section className="about-section">
            <div className="bubble-first">
                <h2>Tevékenységünk</h2>
                <p>
                Üdvözlünk a kisállatok paradicsomában! Csapatunk egyéni vállalkozók lelkes gyülekezete, akik szenvedéllyel és odaadással vállalják kedvenceid gondozását, amikor te éppen máshol vagy.
                Legyen szó kutyáról, macskáról, nyúlról, tengeri malacról, vagy akár egy egzotikusabb kis kedvencről, mi minden szőrös (vagy tollas) barátod igényeiről gondoskodunk.
                Hosszú távú nyaralás? Rövid hétvégi kiruccanás? Netán egy spontán állatorvosi időpont? Ránk mindig számíthatsz!
                Sőt, ha szeretnéd, növényeid locsolását is vállaljuk, mert tudjuk, hogy egy kis figyelmet a fikusz is megérdemel.
                Röviden: a gondoskodás az élethivatásunk, és mindent megteszünk azért, hogy kisállataid boldogak és egészségesek maradhassanak - a Te távolléted alatt is.
                </p>
            </div>
        </section>
        {/* Divider Image */}
        <img src={kep2} alt="Divider 1" className="divider-image second" />
        {/* Section 2 */}
        <section className="about-section">
            <div className="bubble-second">
                <h2>Felvesszük a versenyt!</h2>
                <p>
                Pénztárcabarát szolgáltatás? Pipa. Vidéki kisállatok gondozása, ahol a madár se jár? Megoldjuk.
                Nekünk még az agglomeráció és a külvárosi kerületek sem jelentenek akadályt, mindezt felár nélkül.
                És hogy miért válassz minket? Mert tapasztalatunk és tudásunk kiemelkedő. Hűségprogramunk pedig garantáltan elnyeri a tetszésed: minden megrendelés után egy pecsét jár, és ha elég pecséted összegyűlik, különleges kedvezményekben részesülsz.
                Szóval nemcsak az állataid, de a pénztárcád is hálás lesz nekünk!
                Mi nem csak felvesszük a versenyt, hanem meg is nyerjük! Egy mosolygó kutya, egy doromboló macska vagy egy ugráló nyúl erre a legjobb bizonyíték.
                </p>
            </div>            
        </section>
        {/* Divider Image */}
        <img src={kep3} alt="Divider 1" className="divider-image third" />
        {/* Section 3 */}
        <section className="about-section">
            <div className="bubble-third">
                <h2>Hogyan dolgozunk?</h2>
                <p>
                Az állatok jólétét mindenek fölé helyezzük, ez az első és legfontosabb szabályunk. Minden egyes feladatot tisztán, pontosan és korrekten végzünk, mert számunkra a gazdi elégedettsége ugyanolyan fontos, mint a kisállat boldogsága.
                A kommunikációnkat is a lehető legzökkenőmentesebbé tesszük: akár emailen, akár telefonon keress minket, gyorsan és hatékonyan válaszolunk.
                A munkánk során a bizalom a kulcs, mi pedig ezt sosem játsszuk el. Ha ránk bízod kedvencedet, tudhatod, hogy a lehető legjobb kezekben lesz, mert számunkra minden mancsos, tappancsos és tollas barát egyformán fontos.
                </p>
            </div>
        </section>
        {/* Final Message */}
        <div className="final-message">
            <p>
            Várunk téged és kis kedvenceidet is sok szeretettel, hogy megmutassuk, mit jelent számunkra az igazi gondoskodás!
            </p>
        </div>
        {/* Divider Image */}
        <img src={kep4} alt="Divider 1" className="divider-image fourth" />
        <img src={kep5} alt="Divider 1" className="divider-image fifth" />
    </div>
  );
};
export default About;