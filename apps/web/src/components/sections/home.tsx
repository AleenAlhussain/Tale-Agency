/* Ported from the approved static design. Markup, classes and ids are unchanged so the CSS and the
   interaction layer (lib/site-runtime.js) work exactly as before. */
import { BRAND } from '@talal-at/shared/dist/brand';

export function Loader() {
  return (
    <div className="loader" id="loader" aria-hidden="true">
      <div className="loader-in">
        <svg className="ico" viewBox={BRAND.icon.viewBox}><path className="p-sun" d={BRAND.icon.sun} /><path className="p-roof" d={BRAND.icon.roof} /><path className="p-door" d={BRAND.icon.door} /></svg>
        {' '}
        <svg className="sig wm" viewBox={BRAND.wordmark.viewBox}><use href="#word" /></svg>
        {' '}
        <div className="loader-bar"><i id="lbar" /></div>
      </div>
    </div>
  );
}

export function Tools() {
  return (
    <nav className="tools" id="tools" aria-label="Sections">
      <a href="#top" data-tip="Start" aria-label="Start">
        <svg viewBox="0 0 24 24"><path d="M6 3.5l12 7.2-5.4 1.3 3.3 6.3-2.4 1.2-3.3-6.3L6 17.3z" /></svg>
      </a>
      {' '}
      <a href="#idea" data-tip="The idea" aria-label="The idea">
        <svg viewBox="0 0 24 24">
          <path d="M12 3l3.4 4.6-2 7.4h-2.8l-2-7.4z" />
          <path d="M12 3v7" />
          <circle cx="12" cy="11" r="1.2" />
          <path d="M10 15h4v5h-4z" />
        </svg>
      </a>
      {' '}
      <a href="#work" data-tip="Selected work" aria-label="Selected work">
        <svg viewBox="0 0 24 24"><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" /><rect x="8" y="8" width="8" height="8" /></svg>
      </a>
      {' '}
      <a href="#studio" data-tip="The studio" aria-label="The studio">
        <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" /><path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16" /></svg>
      </a>
      {' '}
      <a href="#guidelines" data-tip="Brand guidelines" aria-label="Brand guidelines">
        <svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z" /><path d="M8 10h8M8 14h8M8 18h5" /></svg>
      </a>
      {' '}
      <a href="#reels" data-tip="Reels" aria-label="Reels">
        <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="3" /><path d="M10.5 9.5v5l4-2.5z" /></svg>
      </a>
      {' '}
      <a href="#archive" data-tip="Archive" aria-label="Archive">
        <svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
      </a>
      {' '}
      <a href="#clients" data-tip="Brands" aria-label="Brands">
        <svg viewBox="0 0 24 24"><path d="M12 4l9 4.5-9 4.5-9-4.5z" /><path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" /></svg>
      </a>
      {' '}
      <a href="/pricing" data-tip="Pricing" aria-label="Pricing">
        <svg viewBox="0 0 24 24"><path d="M4 12.5V4h8.5l7.5 7.5-8.5 8.5z" /><circle cx="8.5" cy="8.5" r="1.4" /></svg>
      </a>
      {' '}
      <a href="/contact" data-tip="Contact" aria-label="Contact">
        <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z" /><path d="M4 6l8 7 8-7" /></svg>
      </a>
    </nav>
  );
}

export function TopAnchor() {
  return (
    <div id="top" />
  );
}

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="bg3d" id="bg3d" aria-hidden="true" />
      {' '}
      <div className="wrap">
        <div className="top-l caps"><span>Technology · AI · Branding</span><span>Creative direction</span></div>
      </div>
      {' '}
      <div className="tri" id="tri">
        <div className="rule" id="rule" />
        {' '}
        <div className="frames l" data-depth="18">
          <svg viewBox="0 0 100 150" preserveAspectRatio="none"><rect x="0" y="0" width="92" height="140" /><rect x="8" y="8" width="92" height="140" /></svg>
          <span className="cap">A vision beyond the surface</span>
        </div>
        {' '}
        <div className="frames r" data-depth="-18">
          <svg viewBox="0 0 100 150" preserveAspectRatio="none"><rect x="0" y="0" width="92" height="140" /><rect x="8" y="8" width="92" height="140" /></svg>
          <span className="cap">Where imagination becomes form</span>
        </div>
        {' '}
        <div className="half l" id="halfL" data-depth="10">
          <svg className="sig" viewBox="0 0 584 415" aria-hidden="true"><use href="#sig" width="1143" height="415" /></svg>
        </div>
        {' '}
        <figure className="portrait" id="portrait"><img src="/assets/img/portrait.webp" alt="Talal Atallah, seated, in a grey studio. Think. Inspire. Design." /></figure>
        {' '}
        <div className="d3wrap" id="d3wrap" role="img" aria-label="Michelangelo's David in copper, wearing a magenta and neon visor" />
        {' '}
        <div className="half r" id="halfR" data-depth="-10">
          <svg className="sig" viewBox="584 0 559 415" aria-hidden="true"><use href="#sig" width="1143" height="415" /></svg>
        </div>
      </div>
      {' '}
      <div className="wrap">
        <div className="hero-foot">
          <div className="l"><span className="caps" style={{ color: "var(--mute)" }}>Dubai · UAE</span><p>I turn ideas into identities, with a reason behind every line, colour and space.</p></div>
          {' '}
          <div className="m">
            <a href="#idea" className="scroll-cue caps"><i />Scroll</a>
          </div>
          {' '}
          <div className="rr"><span className="caps" style={{ color: "var(--mute)" }}>Talal · Studio · Design</span><br /><span className="it">a vision beyond the surface</span></div>
        </div>
      </div>
    </section>
  );
}

export function Idea() {
  return (
    <section className="idea dark grid-bg sec" id="idea">
      <svg className="pen" id="pen" aria-hidden="true">
        <path className="curve" id="curve" />
        {' '}
        <line id="h1a" />
        <line id="h1b" />
        <line id="h2a" />
        <line id="h2b" />
        {' '}
        <circle className="h" id="c1" r="3.5" />
        <circle className="h" id="c2" r="3.5" />
        {' '}
        <rect className="anchor" id="a0" width="8" height="8" />
        <rect className="anchor" id="a1" width="8" height="8" />
        <rect className="anchor" id="a2" width="8" height="8" />
        {' '}
        <path className="arrow" id="arrow" d="M0 0l0 15 4-4 3 6 2.4-1.2-3-5.8 5.6 0z" />
      </svg>
      {' '}
      <span className="hint caps">Play · move the cursor · drag the points</span>
      {' '}
      <div className="idea-in wrap">
        <h2 className="think" aria-label="Think. with intention.">
          <span>T</span>
          <span>H</span>
          <span>I</span>
          <span>N</span>
          <span>K</span>
          <span>.</span>
        </h2>
        {' '}
        <span className="intent">with intention.</span>
        {' '}
        <p>Before I design, I notice. The rhythm of a building, a fold in fabric, the curve of a neck. Every identity begins with a way of seeing.</p>
      </div>
      {' '}
      <span className="corner caps">01 / The idea</span>
      {' '}
      <span className="corner r caps">Talal · Studio · Design</span>
    </section>
  );
}

export function Work() {
  return (
    <section className="sec" id="work" style={{ paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>02 / Structure</span><span id="featCount" /></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">Selected{' '}<em>work</em></h2>
          {' '}
          <p>Each frame is drawn first, then the work appears behind the lines. Hover a project to bring it to colour and pull a second frame out of it.</p>
        </div>
        {' '}
        <div className="grid tight" id="grid" />
        {' '}
        <div className="latest">
          <div className="latest-head">
            <h3 className="h-serif">New{' '}<em>case studies</em></h3>
            <p>Full sets with every frame and film. Tap one to open it here.</p>
          </div>
          {' '}
          <div className="pgrid cases" id="latestCases" />
        </div>
        {' '}
        <div className="more">
          <span className="caps" style={{ color: "var(--mute)" }}>Real estate · Branding · Campaigns · Art & type</span>
          <a className="btn2" href="/projects">View all projects{' '}<span className="ar">→</span></a>
        </div>
      </div>
    </section>
  );
}

export function Kern() {
  return (
    <section className="play" id="kern">
      <div className="wrap">
        <div className="stage">
          <div className="stage-top caps">
            <span><b>Play</b>{' '}· 02 / Kerning</span>
            <span>Drag the letters back into place</span>
          </div>
          {' '}
          <div className="area"><svg id="kernSvg" viewBox={BRAND.wordmark.viewBox} aria-label="TALAL·AT letters to space" /></div>
          {' '}
          <div className="stage-bot caps">
            <span className="msg" id="kernMsg">The logo lost its spacing. Can you fix it?</span>
            <span>Spacing{' '}<b id="kernScore" style={{ color: "var(--copper)" }}>0</b>{' '}/ 100</span>
            <span className="btns"><button className="pbtn" id="kernShuffle" type="button">Shuffle</button><button className="pbtn" id="kernShow" type="button">Show me</button></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Studio() {
  return (
    <section className="hre studio dark sec" id="studio" style={{ paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>03 / The studio</span><span>Personal work · grids · colour · type</span></div>
        {' '}
        <div className="hre-top">
          <h2 className="h-serif split-h">Talal{' '}<em>Studio</em><span className="caps-l">Beyond the brief</span></h2>
          {' '}
          <div>
            <p>Between client launches, the studio keeps its own practice. Instagram feeds art-directed nine frames at a time, colour forecasts, Arabic calligraphy and type experiments.</p>
            {' '}
            <p>This is where ideas are tested first, before they reach a brand book or a billboard.</p>
            {' '}
            <ul className="deliv">
              <li><span className="it">a</span><b>Instagram grid direction</b><span className="caps">Social</span></li>
              {' '}
              <li><span className="it">b</span><b>Colour trends & palettes</b><span className="caps">Research</span></li>
              {' '}
              <li><span className="it">c</span><b>Arabic desert calligraphy</b><span className="caps">Art</span></li>
              {' '}
              <li><span className="it">d</span><b>Type & font exploration</b><span className="caps">Type</span></li>
              {' '}
              <li><span className="it">e</span><b>Art direction & AI imagery</b><span className="caps">Image</span></li>
            </ul>
          </div>
        </div>
      </div>
      {' '}
      <div className="track-wrap" id="trackWrap"><div className="track" id="track" /></div>
      {' '}
      <div className="play" id="match">
        <div className="wrap">
          <div className="stage">
            <div className="stage-top caps">
              <span><b>Play</b>{' '}· 03 / Eyedropper</span>
              <span className="swatches">
                <span className="sw"><i style={{ background: "#B77536" }} />Target · Talal copper</span>
                <span className="sw"><i id="pickSw" style={{ background: "transparent" }} /><span id="pickHex">Your pick</span></span>
              </span>
            </div>
            {' '}
            <div className="area"><canvas id="matchCv" /><div className="eye" id="eye" /></div>
            {' '}
            <div className="stage-bot caps">
              <span className="msg" id="matchMsg">Find the copper of the TALAL·AT logo. Click to pick.</span>
              <span>Match{' '}<b id="matchScore" style={{ color: "var(--copper)" }}>—</b>{' '}/ 100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Guidelines() {
  return (
    <section className="gl sec" id="guidelines" style={{ paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>04 / Systems</span><span>Brand guidelines · examples</span></div>
        {' '}
        <div className="gl-head">
          <h2 className="h-serif split-h">Brand{' '}<em>guidelines</em></h2>
          {' '}
          <p>A logo is a beginning. The guidelines make it last: the mark, its colours, its patterns and the rules for every place it appears. Open a book.</p>
        </div>
        {' '}
        <div className="brands" id="brands" role="tablist" aria-label="Brand books" />
        {' '}
        <div className="book">
          <nav className="toc" id="toc" />
          {' '}
          <div className="pagewrap" id="pagewrap">
            <button className="nav2 p" id="pgPrev" type="button" aria-label="Previous page">
              <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            {' '}
            <button className="nav2 n" id="pgNext" type="button" aria-label="Next page">
              <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </button>
            {' '}
            <div className="folio caps"><span id="folioL" /><span id="folioR" /></div>
          </div>
        </div>
        {' '}
        <div className="rules">
          <div><span className="caps">01 · The mark</span><p>Primary logo, secondary lock-ups and the icon on its own, each with clear space and a minimum size.</p></div>
          {' '}
          <div><span className="caps">02 · Colour</span><p>Primary and supporting palettes in CMYK, RGB and HEX, with the ratios that keep the brand recognisable.</p></div>
          {' '}
          <div><span className="caps">03 · Type & pattern</span><p>Typefaces, hierarchy and a pattern system cut from the mark itself.</p></div>
          {' '}
          <div><span className="caps">04 · Application</span><p>Stationery, signage, packaging and social templates, ready for the printer and the team.</p></div>
        </div>
      </div>
    </section>
  );
}

export function Quiz() {
  return (
    <section className="play gl" id="quiz">
      <div className="wrap">
        <div className="stage">
          <div className="stage-top caps">
            <span><b>Play</b>{' '}· 04 / Do & don't</span>
            <span>Find the correct use of the mark</span>
          </div>
          {' '}
          <div className="area">
            <p className="qq" id="qq">Which one follows the{' '}<em>guidelines</em>?</p>
            <div className="tiles" id="tiles" />
          </div>
          {' '}
          <div className="stage-bot caps">
            <span className="msg" id="quizMsg">Five rounds. Every brand has rules.</span>
            <span>Score{' '}<b id="quizScore" style={{ color: "var(--copper)" }}>0</b>{' '}/{' '}<span id="quizRound">0</span></span>
            <button className="pbtn" id="quizNext" type="button">Next round</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reels() {
  return (
    <section className="rl dark sec" id="reels" style={{ paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>05 / Motion</span><a href="https://www.instagram.com/talal.ata11ah" target="_blank" rel="noopener">@talal.ata11ah ↗</a></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">The{' '}<em>reels</em></h2>
          {' '}
          <div>
            <p style={{ marginBottom: "18px" }}>Launch films, brand films and product reels, cut for the feed. They play right here. Tap the speaker for sound.</p>
            <div className="rl-ctrl">
              <button id="rlPrev" type="button" aria-label="Previous reels">
                <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button id="rlNext" type="button" aria-label="Next reels">
                <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {' '}
      <div className="strip" id="strip" />
      {' '}
      <div className="play" id="cut">
        <div className="wrap">
          <div className="stage">
            <div className="stage-top caps">
              <span><b>Play</b>{' '}· 05 / Cut</span>
              <span>Click, tap or press space on every diamond</span>
            </div>
            {' '}
            <div className="area" id="cutArea">
              <div className="tl" id="tl">
                <div className="ruler" />
                <div className="clips">
                  <span className="clip">Hook</span>
                  <span className="clip">Line</span>
                  <span className="clip">Curve</span>
                  <span className="clip">Mark</span>
                  <span className="clip">Reveal</span>
                  <span className="clip">Sign-off</span>
                </div>
                <div className="head" id="head" style={{ left: "0" }} />
              </div>
              {' '}
              <p className="cut-fb" id="cutFb">Every reel lives on the beat. Cut on the diamonds.</p>
              {' '}
              <div className="cut-btn"><button className="pbtn" id="cutStart" type="button">Start the edit</button></div>
            </div>
            {' '}
            <div className="stage-bot caps">
              <span className="msg" id="cutMsg">Three passes. Perfect cuts score double.</span>
              <span>Pass{' '}<b id="cutPass" style={{ color: "var(--copper)" }}>0</b>/3 · Score{' '}<b id="cutScore" style={{ color: "var(--copper)" }}>0</b></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  return (
    <div className="mq" aria-hidden="true"><div className="mq-t" id="mq" /></div>
  );
}

export function Archive() {
  return (
    <section className="sec arc" id="archive">
      <div className="wrap">
        <div className="label caps"><span>06 / Index</span><span>Every Behance project · in motion</span></div>
        {' '}
        <div className="arc-head">
          <h2 className="h-serif split-h">The{' '}<em>archive</em></h2>
          {' '}
          <div>
            <p>Sixty-seven projects, always moving. Hover a line to stop it, and a frame to bring it to colour.</p>
            <a className="btn2" href="/projects">Browse all projects{' '}<span className="ar">→</span></a>
          </div>
        </div>
      </div>
      {' '}
      <div className="arc-rows" id="arcRows" />
    </section>
  );
}

export function Clients() {
  return (
    <section className="sec logos-sec" id="clients" style={{ paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>07 / Brands</span><span>Trusted by</span></div>
        {' '}
        <h2 className="h-serif split-h">Brands I've{' '}<em>shaped</em></h2>
      </div>
      {' '}
      <div className="lrows" id="lrows" aria-label="Client logos" />
      {' '}
      <div className="play" id="wave">
        <div className="wrap">
          <div className="stage">
            <div className="stage-top caps">
              <span><b>Play</b>{' '}· 07 / Weight</span>
              <span>Move across the words</span>
            </div>
            {' '}
            <div className="area"><div className="wave-word" id="waveWord" aria-label="Think. Inspire. Design." /></div>
            {' '}
            <div className="stage-bot caps">
              <span className="msg">Type has a pulse. Thin to bold, 100 to 900.</span>
              <span>Weight{' '}<b id="waveW" style={{ color: "var(--copper)" }}>200</b></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
