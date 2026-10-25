import { SitePage } from '@/components/chrome/SitePage';

export default function NotFound() {
  return (
    <SitePage path="/404">
      <section className="sec nf">
        <div className="wrap">
          <div className="label caps"><span>404</span><span>Page not found</span></div>
          <h1>Off the <em>grid.</em></h1>
          <div className="divbtns">
            <a className="btn2 solid" href="/">Back home <span className="ar">→</span></a>
            <a className="btn2" href="/projects">Projects</a>
            <a className="btn2" href="/contact">Contact</a>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
