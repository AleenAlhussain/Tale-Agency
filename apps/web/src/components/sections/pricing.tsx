/* Ported from the approved static design. Markup, classes and ids are unchanged so the CSS and the
   interaction layer (lib/site-runtime.js) work exactly as before. */
import { ScopeForm } from '@/components/forms/ScopeForm';

export function Estimator() {
  return (
    <section className="sec est-sec" id="estimator" style={{ paddingTop: "clamp(50px,6vw,90px)" }}>
      <div className="wrap">
        <div className="label caps"><span>Project estimator</span><span>Tap to add · tap again to remove</span></div>
        {' '}
        <div className="presets" id="presets" aria-label="Quick packages" />
        {' '}
        <div className="est">
          <div className="est-l" id="estL" />
          {' '}
          <aside className="est-r" id="estR" aria-live="polite">
            <div className="sum">
              <div className="sum-top">
                <h2>Your estimate</h2>
                <div className="cur" role="group" aria-label="Currency"><button type="button" data-cur="AED" aria-pressed="true">AED</button><button type="button" data-cur="USD" aria-pressed="false">USD</button></div>
              </div>
              {' '}
              <ul className="sumlist" id="sumLines"><li className="empty">Nothing selected yet. Pick a service on the left.</li></ul>
              {' '}
              <div className="tot">
                <div className="row"><span className="caps">One-off project</span><b id="totOne">0</b></div>
                {' '}
                <div className="row" id="rowMo" hidden><span className="caps">Monthly retainer</span><b id="totMo">0</b></div>
                {' '}
                <div className="big"><span className="caps">Estimated investment</span><strong id="totBig">AED 0</strong><small id="totSub">{'\u00a0'}</small></div>
                {' '}
                <div className="row dep"><span className="caps">To start (50% + first month)</span><b id="totDep">0</b></div>
              </div>
              {' '}
              <div className="acts">
                <a className="btn2 solid" id="sendWa" href="https://wa.me/971542807100" target="_blank" rel="noopener">Send my scope on WhatsApp{' '}<span className="ar">↗</span></a>
                {' '}
                <a className="btn2" id="sendMail" href="mailto:talalatallah10@gmail.com">Email it instead</a>
                {' '}
                <a className="btn2 pay" id="payBtn" href="#" target="_blank" rel="noopener" hidden>Pay the deposit{' '}<span className="ar">↗</span></a>
                {' '}
                <button className="linkbtn caps" type="button" id="estReset">Start over</button>
              </div>
              <ScopeForm />
              {' '}
              <p className="fine">Estimate in AED. USD is shown at the fixed peg of 3.6725. Final price is confirmed in a written proposal after a short call. Prices exclude VAT where it applies; third-party costs such as ad spend, domains, hosting, stock, talent and app-store fees are paid at cost.</p>
            </div>
          </aside>
        </div>
      </div>
      {' '}
      <div className="mbar" id="mbar">
        <div><span className="caps">Estimate</span><b id="mbTot">AED 0</b></div>
        <a className="btn2 solid" href="#estR">Review</a>
      </div>
    </section>
  );
}

export function How() {
  return (
    <section className="sec" id="how" style={{ background: "var(--bg2)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="label caps"><span>How payment works</span><span>Simple, written, secure</span></div>
        {' '}
        <div className="work-head">
          <h2 className="h-serif split-h">Clear{' '}<em>terms</em></h2>
          <p>The same four steps for every project, so you always know what you pay and when.</p>
        </div>
        {' '}
        <div className="steps">
          <div className="step"><span className="no">01</span><h3>Send your scope</h3><p>Your selections arrive on WhatsApp or email, already itemised.</p></div>
          {' '}
          <div className="step"><span className="no">02</span><h3>Call & proposal</h3><p>A short call, then a written proposal with deliverables, timeline and the final price.</p></div>
          {' '}
          <div className="step"><span className="no">03</span><h3>50% to start</h3><p>Pay the deposit by card, Apple Pay or bank transfer. Work starts once it clears.</p></div>
          {' '}
          <div className="step"><span className="no">04</span><h3>50% on delivery</h3><p>The balance is paid before final files. Monthly plans are paid at the start of each month.</p></div>
          {' '}
          <div className="step"><span className="no">05</span><h3>Files & ownership</h3><p>Once paid in full, the final files and the rights to use them are yours.</p></div>
        </div>
        {' '}
        <div className="faq" id="faq">
          <details>
            <summary>What counts as a revision round?<i /></summary>
            <p>One round is one consolidated list of changes on a delivered concept. Each package lists how many rounds are included. Extra rounds are billed at AED 350 each.</p>
          </details>
          {' '}
          <details>
            <summary>Can I split the payment?<i /></summary>
            <p>Yes. Projects over AED 10,000 can be paid in three parts: 40% to start, 30% at the midpoint and 30% on delivery.</p>
          </details>
          {' '}
          <details>
            <summary>Do monthly plans have a contract?<i /></summary>
            <p>Monthly is month to month with 30 days' notice. Commit to 3 months and save 5%, or 6 months and save 10%. The discount is already in your estimate.</p>
          </details>
          {' '}
          <details>
            <summary>What isn't included?<i /></summary>
            <p>Third-party costs are paid at cost and never marked up: ad spend, domain and hosting, stock images, fonts with paid licences, models or creators' usage fees, printing and app-store accounts.</p>
          </details>
          {' '}
          <details>
            <summary>I need something that isn't listed.<i /></summary>
            <p>Send your scope anyway and write what's missing in the message. Custom work is quoted within 48 hours.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
