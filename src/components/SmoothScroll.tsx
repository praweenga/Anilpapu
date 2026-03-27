"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.6,
            touchMultiplier: 1.2,
        });

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        // Start RAF loop
        rafId = requestAnimationFrame(raf);

        // Handle anchor links
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(anchor.hash);
                if (element) {
                    lenis.scrollTo(element as HTMLElement, {
                        offset: -80,
                        duration: 1.2,
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        // Performance optimization: pause when tab is not visible
        const handleVisibilityChange = () => {
            if (document.hidden) {
                lenis.stop();
                cancelAnimationFrame(rafId);
            } else {
                lenis.start();
                rafId = requestAnimationFrame(raf);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Reduce motion for users who prefer it
        const handleReducedMotion = () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                lenis.destroy();
            }
        };

        handleReducedMotion();
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleReducedMotion);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
            document.removeEventListener('click', handleAnchorClick);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', handleReducedMotion);
        };
    }, []);

    return <>{children}</>;
}
