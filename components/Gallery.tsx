'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig, type GalleryImage } from '@/lib/config';

type LightboxGroup = 'preview' | 'all';

export default function Gallery() {
  const allImages = siteConfig.gallery;
  const previewImages = useMemo<GalleryImage[]>(() => {
    const byFile = new Map(allImages.map((img) => [img.file, img]));
    return siteConfig.galleryPreview
      .map((file) => byFile.get(file))
      .filter((img): img is GalleryImage => Boolean(img));
  }, [allImages]);

  const [modalOpen, setModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ group: LightboxGroup; index: number } | null>(null);

  const modalOpenBtnRef = useRef<HTMLButtonElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const activeSet = lightbox?.group === 'all' ? allImages : previewImages;
  const activeImage = lightbox ? activeSet[lightbox.index] : null;

  const openLightbox = (group: LightboxGroup, index: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setLightbox({ group, index });
  };
  const closeLightbox = () => {
    setLightbox(null);
    lastFocused.current?.focus();
  };
  const step = (dir: number) => {
    setLightbox((cur) => {
      if (!cur) return cur;
      const set = cur.group === 'all' ? allImages : previewImages;
      return { ...cur, index: (cur.index + dir + set.length) % set.length };
    });
  };

  const openModal = () => {
    lastFocused.current = document.activeElement as HTMLElement;
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    modalOpenBtnRef.current?.focus();
  };

  useEffect(() => {
    document.body.classList.toggle('no-scroll', modalOpen || Boolean(lightbox));
  }, [modalOpen, lightbox]);

  useEffect(() => {
    if (lightbox) lightboxCloseRef.current?.focus();
  }, [lightbox]);

  useEffect(() => {
    if (modalOpen) modalCloseBtnRef.current?.focus();
  }, [modalOpen]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      } else if (modalOpen && e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  let touchX: number | null = null;
  const onTouchStart = (e: React.TouchEvent) => {
    touchX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) step(dx > 0 ? -1 : 1);
    touchX = null;
  };

  const Cell = ({ img, group, index, eager }: { img: GalleryImage; group: LightboxGroup; index: number; eager?: boolean }) => (
    <figure className="gcell" data-category={img.category}>
      <button type="button" className="gcell__btn" aria-label={`Open larger view: ${img.alt}`} onClick={() => openLightbox(group, index)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/${img.file}`} alt={img.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </button>
    </figure>
  );

  return (
    <>
      <section id="work">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Signature Work</p>
            <h2 className="section-title mask-wrap">
              <span className="mask-line">The range, in full</span>
            </h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: '0.75rem' }}>
              A glimpse of our work across nikkahs, mehndis, receptions and milestones.
            </p>
          </div>
          <div className="gallery-grid">
            {previewImages.map((img, i) => (
              <Cell img={img} group="preview" index={i} eager key={img.file} />
            ))}
          </div>
          <div className="gallery-viewall">
            <button ref={modalOpenBtnRef} type="button" className="btn btn--ghost" onClick={openModal}>
              <span>View All Our Work</span>
            </button>
          </div>
        </div>
      </section>

      <div className={`gallery-modal${modalOpen ? ' gallery-modal--open' : ''}`} role="dialog" aria-modal="true" aria-label="Full gallery">
        <div className="gallery-modal__bar">
          <p className="gallery-modal__title">All Our Work</p>
          <button ref={modalCloseBtnRef} type="button" className="gallery-modal__close" aria-label="Close gallery" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="gallery-modal__inner">
          <div className="gallery-grid gallery-grid--modal">
            {allImages.map((img, i) => (
              <Cell img={img} group="all" index={i} key={img.file} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`lightbox${lightbox ? ' lightbox--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="lightbox__prev" aria-label="Previous image" onClick={() => step(-1)}>
          &#8249;
        </button>
        <figure style={{ margin: 0 }}>
          {activeImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="lightbox__img" src={`/${activeImage.file}`} alt={activeImage.alt} />
          )}
          <figcaption className="lightbox__caption">{activeImage?.alt ?? ''}</figcaption>
        </figure>
        <button className="lightbox__next" aria-label="Next image" onClick={() => step(1)}>
          &#8250;
        </button>
        <button ref={lightboxCloseRef} className="lightbox__close" aria-label="Close image viewer" onClick={closeLightbox}>
          &times;
        </button>
      </div>
    </>
  );
}
