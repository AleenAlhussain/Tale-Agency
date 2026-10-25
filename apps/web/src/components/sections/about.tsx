/* Ported from the approved static design. Markup, classes and ids are unchanged so the CSS and the
   interaction layer (lib/site-runtime.js) work exactly as before. */
import { BRAND } from '@talal-at/shared/dist/brand';

export function About() {
  return (
    <section className="about sec" id="about" style={{ paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>01 / The designer</span><span>Talal Atallah</span></div>
        {' '}
        <div className="about-grid">
          <figure className="poster" id="poster">
            <img src="/assets/img/designer.webp" alt="Talal Atallah, arms crossed: I'm your designer." loading="lazy" />
            <figcaption className="caps"><span>Talal · At</span><span>2026</span></figcaption>
          </figure>
          {' '}
          <div>
            <h2 className="h-serif split-h">I'm{' '}<em>Talal.</em></h2>
            {' '}
            <p className="lead" id="lead">
              Eight years turning ideas into identities. I design the mark, direct the image and see it through to the printer and the billboard, so every brochure, screen and post speaks{' '}
              <em>one language.</em>
            </p>
            {' '}
            <p className="body">Senior Graphic Designer and Creative Director at HRE Development in Dubai. Before that: Embark, ZAM Prime Properties & Mardi Holding, Creative Link, Silk Studio and Al-Omran. BA in Graphic Design & Multimedia, Faculty of Fine Arts, Damascus University.</p>
            {' '}
            <div className="stats">
              <div className="stat"><b data-count="8" data-suf="+">0</b><span className="caps">Years</span></div>
              {' '}
              <div className="stat"><b data-count="75">0</b><span className="caps">Projects</span></div>
              {' '}
              <div className="stat"><b data-count="8513" data-k="1">0</b><span className="caps">Followers</span></div>
              {' '}
              <div className="stat"><b data-count="8737" data-k="1">0</b><span className="caps">Behance views</span></div>
            </div>
            {' '}
            <ul className="xp">
              <li><b>Senior Graphic Designer & Creative Director</b><span className="co">HRE Development Real Estate, Dubai</span><span className="when caps">2025 — Now</span></li>
              {' '}
              <li><b>Senior Graphic Designer</b><span className="co">Embark Marketing Management, Business Bay</span><span className="when caps">2024 — Now</span></li>
              {' '}
              <li><b>Senior Graphic Designer & Events Director</b><span className="co">ZAM Prime Properties & Mardi Holding</span><span className="when caps">2024 — 2025</span></li>
              {' '}
              <li><b>Senior Graphic Designer & Project Manager</b><span className="co">Creative Link Services, Dubai Mall</span><span className="when caps">2023</span></li>
              {' '}
              <li><b>Creative Graphic Designer</b><span className="co">Silk Studio GCC, World Trade Center</span><span className="when caps">2023</span></li>
              {' '}
              <li><b>Creative Graphic Designer</b><span className="co">Al-Omran Centre for Training & Development</span><span className="when caps">2021 — 2023</span></li>
            </ul>
            {' '}
            <div className="skills">
              <div>
                <span className="caps">Direction</span>
                <ul>
                  <li>Brand identity & logo</li>
                  <li>Guidelines & systems</li>
                  <li>Art & creative direction</li>
                  <li>Campaign strategy</li>
                </ul>
              </div>
              {' '}
              <div>
                <span className="caps">Craft</span>
                <ul>
                  <li>Print & production</li>
                  <li>Motion & video</li>
                  <li>UI/UX, landing pages</li>
                  <li>3D & retouching</li>
                </ul>
              </div>
              {' '}
              <div>
                <span className="caps">Tools</span>
                <ul>
                  <li>Photoshop · Illustrator · InDesign</li>
                  <li>After Effects · Premiere</li>
                  <li>Figma</li>
                  <li>Firefly · Midjourney</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Build() {
  return (
    <section className="play about" id="build" style={{ paddingTop: "clamp(60px,8vw,110px)" }}>
      <div className="wrap">
        <div className="stage">
          <div className="stage-top caps">
            <span><b>Play</b>{' '}· Construction</span>
            <span>Bring the cursor to the centre</span>
          </div>
          {' '}
          <div className="area">
            <svg viewBox="-80 -80 1220 1220" id="buildSvg" aria-label="The TALAL·AT mark, in pieces">
              <circle className="ring" cx="530" cy="530" r="590" vectorEffect="non-scaling-stroke" />
              <path id="bSun" d={BRAND.icon.sun} fill="currentColor" />
              <path id="bRoof" d={BRAND.icon.roof} fill="currentColor" />
              <path id="bDoor" d={BRAND.icon.door} fill="currentColor" />
            </svg>
          </div>
          {' '}
          <div className="stage-bot caps">
            <span className="msg" id="buildMsg">Three pieces, one mark. Come closer.</span>
            <span>Built{' '}<b id="buildPct" style={{ color: "var(--copper)" }}>0</b>%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Band() {
  return (
    <section className="band sec">
      <div className="wrap bwrap">
        <figure className="reveal"><img src="/assets/img/portrait.webp" alt="Talal Atallah in the studio" loading="lazy" /></figure>
        {' '}
        <div>
          <blockquote>A vision beyond the surface,{' '}<em>where imagination becomes form.</em></blockquote>
          {' '}
          <cite className="caps">Talal Atallah · Think. Inspire. Design.</cite>
          {' '}
          <div className="facts reveal" style={{ marginTop: "clamp(40px,5vw,70px)" }}>
            <div><span className="caps">Approach</span><p style={{ color: "var(--text-dk)" }}>Research first, then one clear idea, built into a system the whole team can use.</p></div>
            {' '}
            <div><span className="caps">Education</span><p style={{ color: "var(--text-dk)" }}>BA Graphic Design & Multimedia, Faculty of Fine Arts, Damascus University.</p></div>
            {' '}
            <div><span className="caps">Based in</span><p style={{ color: "var(--text-dk)" }}>Business Bay, Dubai. Working across the UAE and the GCC, in English and Arabic.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
