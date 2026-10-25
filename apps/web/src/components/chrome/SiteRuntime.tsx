'use client';
/* Starts the interaction layer once React has hydrated the page: smooth scroll (Lenis), scroll motion (GSAP),
   the cursor, galleries, games and the estimator. Same libraries and versions as the approved static site. */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initSite } from '@/lib/site-runtime';

declare global {
  interface Window {
    gsap?: unknown;
    ScrollTrigger?: unknown;
    Lenis?: unknown;
    __taSay?: (m: string) => void;
    __taScope?: () => { state: unknown; currency: 'AED' | 'USD' };
  }
}

export function SiteRuntime() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;
    window.Lenis = Lenis;
    let data = {};
    try {
      data = JSON.parse(document.getElementById('ta-data')?.textContent || '{}');
    } catch {
      /* keep the page working without data */
    }
    initSite(data);
  }, []);
  return null;
}
