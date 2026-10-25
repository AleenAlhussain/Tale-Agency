/* Ported from the approved static design. Markup, classes and ids are unchanged so the CSS and the
   interaction layer (lib/site-runtime.js) work exactly as before. */
import { ContactForm } from '@/components/forms/ContactForm';

export function Reach() {
  return (
    <section className="sec" id="reach">
      <div className="wrap">
        <div className="label caps">
          <span>01 / Reach me</span>
          <span className="avail2"><i />Open to full-time & freelance</span>
        </div>
        {' '}
        <div className="cwrap">
          <div className="cinfo">
            <a className="addr2" href="mailto:talalatallah10@gmail.com">talalatallah10@gmail.com</a>
            {' '}
            <div className="row3">
              <button className="btn2" type="button" data-copy="talalatallah10@gmail.com">Copy email</button>
              <a className="btn2 solid" href="https://wa.me/971542807100" target="_blank" rel="noopener">WhatsApp{' '}<span className="ar">↗</span></a>
            </div>
            {' '}
            <dl className="caps-free">
              <dt className="caps">Call</dt>
              <dd><a href="tel:+971542807100">+971 54 280 7100</a></dd>
              {' '}
              <dt className="caps">Studio</dt>
              <dd>Business Bay, Dubai, UAE</dd>
              {' '}
              <dt className="caps">Work</dt>
              <dd><a href="https://www.behance.net/talalatallah" target="_blank" rel="noopener">Behance ↗</a>{' '}·{' '}<a href="https://www.linkedin.com/in/talalatallah" target="_blank" rel="noopener">LinkedIn ↗</a></dd>
              {' '}
              <dt className="caps">Social</dt>
              <dd><a href="https://www.instagram.com/talal.ata11ah" target="_blank" rel="noopener">Instagram ↗</a>{' '}·{' '}<a href="https://dribbble.com/talalatallah10" target="_blank" rel="noopener">Dribbble ↗</a></dd>
            </dl>
          </div>
          {' '}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact dark grid-bg" style={{ paddingBlock: "clamp(70px,9vw,130px)" }}>
      <div className="wrap">
        <div className="label caps"><span>02 / Sign</span><span>Every project starts with a signature</span></div>
        {' '}
        <h2 className="cta">Let's create{' '}<em>with intention.</em></h2>
        {' '}
        <div className="play" id="sign" style={{ paddingBottom: "0" }}>
          <div className="stage">
            <div className="stage-top caps">
              <span><b>Play</b>{' '}· Signature</span>
              <span>Draw with the mouse or your finger</span>
            </div>
            {' '}
            <div className="area">
              <canvas id="signCv" />
              <div className="base" />
              <div className="x">×</div>
              <div className="ph" id="signPh">Sign here, and let's start something.</div>
            </div>
            {' '}
            <div className="stage-bot caps">
              <span className="msg" id="signMsg">Every project starts with a signature.</span>
              <span className="btns"><button className="pbtn" id="signClear" type="button">Clear</button><a className="pbtn" href="mailto:talalatallah10@gmail.com?subject=Let's%20create%20with%20intention">Send it to Talal</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
