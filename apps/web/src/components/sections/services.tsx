/* Ported from the approved static design. Markup, classes and ids are unchanged so the CSS and the
   interaction layer (lib/site-runtime.js) work exactly as before. */

export function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="label caps"><span>01 / What we do</span><span>Tap a service</span></div>
        {' '}
        <div className="svc-wrap">
          <ol className="svc" id="svc" />
          {' '}
          <aside className="svc-prev" aria-hidden="true">
            <div className="pv" id="svcPv"><span className="ph-name" id="svcPh" /></div>
            {' '}
            <div className="meta2 caps"><span id="svcCap" /><span id="svcNo" /></div>
            {' '}
            <div className="big" id="svcBig">01</div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Brief() {
  return (
    <section className="play" id="brief" style={{ paddingTop: "0" }}>
      <div className="wrap">
        <div className="stage">
          <div className="stage-top caps">
            <span><b>Play</b>{' '}· Brief</span>
            <span>Spin a creative brief</span>
          </div>
          {' '}
          <div className="area">
            <div className="reels" id="briefReels" />
            {' '}
            <button className="spin" id="spinBtn" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4" /></svg>
              Spin the brief
            </button>
            {' '}
            <p className="brief-out" id="briefOut">Three reels, one idea. Pull the lever.</p>
          </div>
          {' '}
          <div className="stage-bot caps">
            <span className="msg">Every project starts as a sentence.</span>
            <span>Briefs{' '}<b id="briefN" style={{ color: "var(--copper)" }}>0</b></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SocialMedia() {
  return (
    <section className="sec" id="social-media" style={{ background: "var(--bg2)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="label caps"><span>02 / New</span><span>Monthly retainer</span></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">Social media{' '}<em>management</em></h2>
          {' '}
          <p>Your accounts, run like a brand and not like a noticeboard. One plan, one look, one voice, every month.</p>
        </div>
        {' '}
        <div className="steps">
          <div className="step"><span className="no">01</span><h3>Audit & strategy</h3><p>Where the account stands, who it speaks to, and the three pillars every post will serve.</p></div>
          {' '}
          <div className="step"><span className="no">02</span><h3>Content calendar</h3><p>A monthly plan of posts, stories and reels, approved before anything is made.</p></div>
          {' '}
          <div className="step"><span className="no">03</span><h3>Shoot & design</h3><p>Art-directed photos, grid layouts, reels edits and covers in the brand's own palette.</p></div>
          {' '}
          <div className="step"><span className="no">04</span><h3>Publish & community</h3><p>Captions in English and Arabic, scheduling, replies and daily care of the comments.</p></div>
          {' '}
          <div className="step"><span className="no">05</span><h3>Report & refine</h3><p>A clear monthly report on reach and engagement, and what changes next month.</p></div>
        </div>
        {' '}
        <div className="smm">
          <figure className="reveal">
            <button type="button" data-lb="/assets/img/grids/grid-07.webp" data-cap="Legend of Avara · social identity" style={{ all: "unset", cursor: "zoom-in", display: "block" }} aria-label="Open Legend of Avara social identity"><img src="/assets/img/grids/grid-07.webp" alt="Legend of Avara: social media identity, three Instagram feeds in the brand palette" loading="lazy" /></button>
          </figure>
          {' '}
          <div>
            <span className="caps" style={{ color: "var(--copper)" }}>Case · Legend of Avara</span>
            {' '}
            <h3 className="h-serif" style={{ fontSize: "clamp(34px,4vw,60px)", margin: "14px 0 26px" }}>One identity,{' '}<em>every feed.</em></h3>
            {' '}
            <ul>
              <li>Monthly content calendar<span className="caps">Plan</span></li>
              {' '}
              <li>Feed, stories & highlight design<span className="caps">Design</span></li>
              {' '}
              <li>Reels editing & covers<span className="caps">Motion</span></li>
              {' '}
              <li>Captions in English & Arabic<span className="caps">Copy</span></li>
              {' '}
              <li>Community management<span className="caps">Care</span></li>
              {' '}
              <li>Paid boosts & monthly reports<span className="caps">Growth</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GridDesign() {
  return (
    <section className="sec" id="grid-design">
      <div className="wrap">
        <div className="label caps"><span>03 / New</span><span>Instagram grid design</span></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">Grid{' '}<em>design</em></h2>
          {' '}
          <p>Nine frames, one composition. Every post stands on its own, and the feed reads as a single mood board. Tap a grid to see it full size.</p>
        </div>
        {' '}
        <div className="gridshow" id="gridshow" />
      </div>
    </section>
  );
}

export function Moodboards() {
  return (
    <section className="sec" id="moodboards" style={{ background: "var(--bg2)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="label caps"><span>04 / Direction</span><span>Where every identity starts</span></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">Mood<em>boards</em></h2>
          {' '}
          <p>Before a single line is drawn, the direction is agreed on one page: mood, palette, texture and type. Tap a board to see it full size.</p>
        </div>
        {' '}
        <div className="moodshow" id="moodshow" />
      </div>
    </section>
  );
}
