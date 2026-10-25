/* Ported from the approved static design. Markup, classes and ids are unchanged so the CSS and the
   interaction layer (lib/site-runtime.js) work exactly as before. */

export function CaseStudies() {
  return (
    <section className="sec" id="case-studies" style={{ paddingTop: "clamp(50px,6vw,90px)", paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>01 / Case studies</span><span>Tap a project to open the full set</span></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">Case{' '}<em>studies</em></h2>
          <p>Brand books, launches, grids and motion, shown in full. Images and films open in a gallery.</p>
        </div>
        {' '}
        <div className="pgrid cases" id="cases" />
      </div>
    </section>
  );
}

export function Logos() {
  return (
    <section className="sec" id="logos" style={{ paddingBottom: "0" }}>
      <div className="wrap">
        <div className="label caps"><span>02 / Logofolio</span><span>Marks & symbols</span></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">Logo<em>folio</em></h2>
          <p>Wordmarks, symbols and brand boards. Hover to bring a mark to colour, tap to see it full size.</p>
        </div>
        {' '}
        <div className="logofolio" id="logofolio" />
      </div>
    </section>
  );
}

export function All() {
  return (
    <section className="sec" id="all" style={{ paddingTop: "clamp(70px,9vw,140px)" }}>
      <div className="wrap">
        <div className="label caps"><span>03 / The archive</span><span>Every Behance project</span></div>
        {' '}
        <div className="pfilters" id="pfilters" role="group" aria-label="Filter projects" />
        {' '}
        <div className="pgrid" id="pgrid" />
      </div>
    </section>
  );
}

export function GridPlay() {
  return (
    <section className="play" id="grid-play" style={{ paddingTop: "0" }}>
      <div className="wrap">
        <div className="stage">
          <div className="stage-top caps">
            <span><b>Play</b>{' '}· Grid</span>
            <span>Move through the grid · click to place the mark</span>
          </div>
          {' '}
          <div className="area" style={{ touchAction: "pan-y" }}><canvas id="gridCv" /></div>
          {' '}
          <div className="stage-bot caps">
            <span className="msg" id="gridMsg">Everything snaps to the grid. Even you.</span>
            <span>Marks{' '}<b id="gridCount" style={{ color: "var(--copper)" }}>0</b></span>
            <button className="pbtn" id="gridClear" type="button">Clear</button>
          </div>
        </div>
      </div>
    </section>
  );
}
