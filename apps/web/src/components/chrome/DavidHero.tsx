'use client';
/* Loads the 3D David only in the browser, after the page is interactive. If WebGL is missing,
   the portrait in the hero stays as it is. */
import { useEffect } from 'react';
import meta from '@/lib/david-mesh-meta.json';

export function DavidHero() {
  useEffect(() => {
    let alive = true;
    let stop = () => {};
    Promise.all([import('@/lib/hero3d'), fetch('/assets/3d/david-mesh.bin').then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error('mesh ' + r.status))))])
      .then(([m, buf]) => {
        if (alive) stop = m.startHero({ ...meta, buf: new Uint8Array(buf) });
      })
      .catch((e) => console.warn('3D hero off:', e));
    return () => {
      alive = false;
      stop();
    };
  }, []);
  return null;
}
