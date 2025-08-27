"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  images: string[];
  title: string;
  subtitle?: string;
  heightClass?: string; // e.g., "h-[360px]"
  intervalMs?: number;
};

export default function HeroSlider({
  images,
  title,
  subtitle,
  heightClass = "h-[360px]",
  intervalMs = 3500,
}: Props) {
  const slides = useMemo(() => (images && images.length ? images : ["/images/hero.jpg"]), [images]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx((i) => (i + 1) % slides.length);

  return (
    <section className="relative overflow-hidden rounded-2xl">
      {/* Slides */}
      <div className={`relative w-full ${heightClass}`}>
        {slides.map((src, i) => {
          const isActive = i === idx;
          return (
            <div
              key={src + i}
              className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          );
        })}
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">{title}</h1>
          {subtitle ? <p className="mt-3 text-white/90 text-lg">{subtitle}</p> : null}
        </div>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 w-2.5 rounded-full border border-white/70 ${i === idx ? "bg-white" : "bg-white/30"}`}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white grid place-items-center"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white grid place-items-center"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
}
