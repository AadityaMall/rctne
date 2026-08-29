import type { GalleryItem } from "@/types/content.types"

/**
 * Gallery data — currently seeded with project images.
 * Replace / extend with actual gallery photos once uploaded to public/images/gallery/
 * Aim for 30–60 curated photos total across all categories.
 */
export const galleryItems: GalleryItem[] = [
  // ── Community Service ──────────────────────────────────────────
  {
    id: "g-cs-1",
    src: "/images/projects/project-k3.jpg",
    alt: "K3 — Khaana Kapda Kambal distribution drive at Thane station",
    category: "Community Service",
    caption: "K3 — Food, clothes and blankets for those who need it most.",
  },
  {
    id: "g-cs-2",
    src: "/images/projects/project-biscute.jpg",
    alt: "Biscute — Street dog feeding drive",
    category: "Community Service",
    caption: "Biscute — Feeding street dogs across Thane, every month.",
  },
  {
    id: "g-cs-3",
    src: "/images/projects/project-saksham.jpg",
    alt: "Saksham — Women self-defence workshop",
    category: "Community Service",
    caption: "Saksham — Equipping women with confidence and self-defence.",
  },

  // ── Events ─────────────────────────────────────────────────────
  {
    id: "g-ev-1",
    src: "/images/projects/project-moreya.jpg",
    alt: "Moreya — Eco-friendly Ganpati awareness flash mob",
    category: "Events",
    caption: "Moreya — Dancing for a greener Ganpati celebration.",
  },

  // ── Leadership ─────────────────────────────────────────────────
  {
    id: "g-ld-1",
    src: "/images/projects/project-guns-for-glory.jpg",
    alt: "Guns for Glory — Rifle shooting experience for youth",
    category: "Leadership",
    caption: "Guns for Glory — Focus, discipline, and a steady hand.",
  },

  // ── Team ───────────────────────────────────────────────────────
  {
    id: "g-tm-1",
    src: "/images/team/Core team/President_Khushi_Mahajan.jpg",
    alt: "Khushi Mahajan — President, RCTNE 2026–27",
    category: "Team",
    caption: "Khushi Mahajan — President, Aagaz '26–27.",
  },
]

/**
 * NOTE TO MAINTAINER:
 * This is a starter set. To build a proper gallery:
 * 1. Upload 30–60 curated photos to public/images/gallery/
 * 2. Organise by category subfolder (events/, community/, team/, etc.)
 * 3. Add entries here following the GalleryItem interface
 */
