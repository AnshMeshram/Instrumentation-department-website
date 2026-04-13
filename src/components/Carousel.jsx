import { useEffect, useState, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carousel
 * props:
 *  - images: array of { src, alt }
 *  - autoPlay: boolean
 *  - interval: number (ms)
 */
export default function Carousel({
  images = [],
  autoPlay = true,
  interval = 4000,
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    images.forEach((img) => {
      const preloaded = new Image();
      preloaded.src = typeof img === "string" ? img : img?.src;
    });
  }, [images]);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") {
        clearInterval(timerRef.current);
        setIndex((i) => (i - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        clearInterval(timerRef.current);
        setIndex((i) => (i + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length]);

  const prev = () => {
    if (images.length === 0) return;
    clearInterval(timerRef.current);
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    if (images.length === 0) return;
    clearInterval(timerRef.current);
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_8px_22px_rgba(15,47,102,0.12)]">
      <div className="relative h-55 w-full bg-[#dfeaf7] md:h-85 lg:h-105">
        <AnimatePresence initial={false} mode="sync">
          {images[index] && (
            <Motion.div
              key={`${images[index].src}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <LazyLoadImage
                src={images[index].src}
                alt={images[index].alt || `slide-${index}`}
                effect="blur"
                className="h-full w-full object-cover"
                wrapperClassName="h-full w-full bg-[#dfeaf7]"
              />
            </Motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
      </div>

      {images.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/85 p-2 text-[#0f2f66] shadow-sm backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#93b4df]"
            onClick={prev}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/85 p-2 text-[#0f2f66] shadow-sm backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#93b4df]"
            onClick={next}
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/40 bg-black/20 px-3 py-1.5 backdrop-blur-sm">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  clearInterval(timerRef.current);
                  setIndex(i);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
