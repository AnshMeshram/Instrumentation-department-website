import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

const GALLERY_CATEGORIES = ["All", "Events", "Labs", "Fests", "Sports"];

const GALLERY_IMAGES = [
  { src: "/department-images/Dept-Photo-768x512.jpeg", title: "Department Building & Main Entrance", category: "Events" },
  { src: "/department-images/dept2.jpg", title: "Advanced Process Automation Station", category: "Labs" },
  { src: "/department-images/dept3.jpg", title: "Industrial Instrumentation Lab Setup", category: "Labs" },
  { src: "/department-images/dept2.jpg", title: "MESA Technical Workshop", category: "Events" },
  { src: "/department-images/Dept-Photo-768x512.jpeg", title: "Department Project Exhibition", category: "Fests" },
  { src: "/department-images/dept3.jpg", title: "Annual Sports Meet - Cricket Team", category: "Sports" }
];

export default function Gallery() {
  useDocumentMetadata({
    title: "Department Gallery",
    description: "Browse images from the department's labs, cultural events, sports matches, and technical festivals.",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Department Gallery"
        description="A visual look at the classrooms, labs, events, achievements, and student life in the department."
      />

      {/* Category Tabs */}
      <div className="flex justify-center">
        <div className="bg-white border border-[var(--color-border)] p-1 rounded-full shadow-sm max-w-md w-full">
          <div className="flex justify-between items-center">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative flex-1 py-2 text-xs font-bold rounded-full transition cursor-pointer ${
                  activeCategory === cat
                    ? "text-[var(--color-primary)] font-black"
                    : "text-[var(--color-text-soft)] hover:text-[var(--color-primary)]"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <Motion.span
                    layoutId="gallery-tab-bg"
                    className="absolute inset-0 bg-slate-100 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Uniform/Masonry Grid */}
      <Motion.div
        layout
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, index) => (
            <Motion.div
              key={img.src + index}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(index)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 relative aspect-4/3"
            >
              <LazyLoadImage
                src={img.src}
                alt={img.title}
                effect="blur"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                wrapperClassName="h-full w-full bg-slate-100"
              />
              {/* Overlay Hover Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-1">
                  {img.category}
                </span>
                <h3 className="text-sm font-bold truncate leading-tight">
                  {img.title}
                </h3>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>
      </Motion.div>

      {/* Lightbox Modal */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={filteredImages.map((img) => ({ src: img.src, title: img.title }))}
      />
    </div>
  );
}
