/* Ported from the approved static design. Markup, classes and ids are unchanged so the CSS and the
   interaction layer (lib/site-runtime.js) work exactly as before. */

export function Lightbox() {
  return (
    <div className="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Grid preview"><button className="lbx" type="button" aria-label="Close">×</button><img alt="" /><span className="lbcap caps" /></div>
  );
}
