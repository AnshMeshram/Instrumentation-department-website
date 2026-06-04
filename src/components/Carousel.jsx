import { useEffect, useState, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  images = [],
  autoPlay = true,
  interval = 5000,
  className = "",
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

  const current = images[index];
  const imageSrc = typeof current === "string" ? current : current?.src;
  const imageAlt =
    typeof current === "string"
      ? `Slide ${index + 1}`
      : current?.alt || `Slide ${index + 1}`;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <AnimatePresence initial={false}>
        {imageSrc && (
          <Motion.div
            key={imageSrc ?? index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              onError={(e) => { e.target.src = "/faculty_images/image.png"; }}
              loading="lazy"
              decoding="async"
            />
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(5,8,22,0.35)_0%,rgba(5,8,22,0.12)_55%,rgba(5,8,22,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,164,0.18)_0%,transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />

      {images.length > 1 && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md ring-1 ring-white/25 sm:right-6 sm:top-6">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            className="group absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/18 p-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-md ring-1 ring-white/30 transition-all hover:bg-white/90 hover:text-[var(--color-primary)] active:scale-95 sm:left-6"
            onClick={prev}
          >
            <ChevronLeft
              size={22}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </button>

          <button
            aria-label="Next image"
            className="group absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/18 p-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-md ring-1 ring-white/30 transition-all hover:bg-white/90 hover:text-[var(--color-primary)] active:scale-95 sm:right-6"
            onClick={next}
          >
            <ChevronRight
              size={22}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/12 px-3 py-2 backdrop-blur-md ring-1 ring-white/25 sm:bottom-6">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  clearInterval(timerRef.current);
                  setIndex(i);
                }}
                className="relative h-2.5 w-8"
              >
                <Motion.span
                  className="absolute left-0 top-0 h-2.5 rounded-full bg-white"
                  animate={{
                    width: i === index ? 26 : 8,
                    opacity: i === index ? 1 : 0.5,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
