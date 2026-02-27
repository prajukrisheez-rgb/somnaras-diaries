import { useState, useEffect, useRef } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #faf7f2;
    --beige: #f0e8d8;
    --warm-sand: #e8d9c0;
    --light-brown: #c4a882;
    --medium-brown: #9b7d5a;
    --dark-brown: #6b4f35;
    --espresso: #3d2b1f;
    --text-dark: #2c1f14;
    --text-mid: #6b5040;
    --text-light: #9b8575;
    --white: #ffffff;
  }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--text-dark);
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 3rem;
    background: rgba(250,247,242,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(196,168,130,0.25);
    transition: all 0.3s ease;
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem; font-weight: 500; font-style: italic;
    color: var(--espresso); letter-spacing: 0.02em; cursor: pointer;
    transition: color 0.2s;
  }
  .nav-logo:hover { color: var(--medium-brown); }
  .nav-links { display: flex; gap: 2.5rem; align-items: center; }
  .nav-link {
    font-size: 0.8rem; font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--text-mid); cursor: pointer;
    position: relative; transition: color 0.2s;
    background: none; border: none; font-family: 'Jost', sans-serif;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
    height: 1px; background: var(--medium-brown);
    transform: scaleX(0); transition: transform 0.25s ease;
  }
  .nav-link:hover { color: var(--dark-brown); }
  .nav-link:hover::after { transform: scaleX(1); }
  .nav-link.active { color: var(--dark-brown); }
  .nav-link.active::after { transform: scaleX(1); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    background: linear-gradient(160deg, #f5ede0 0%, #ede0cc 40%, #e2d0b8 100%);
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      radial-gradient(ellipse 60% 50% at 75% 30%, rgba(196,168,130,0.22) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(155,125,90,0.12) 0%, transparent 60%);
  }
  .hero-texture {
    position: absolute; inset: 0; z-index: 0; opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px;
  }
  .hero-deco-line {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 1px; height: 80px; background: linear-gradient(to bottom, transparent, var(--light-brown));
    animation: lineGrow 1.2s ease-out 0.5s both;
  }
  @keyframes lineGrow { from { height: 0; opacity: 0; } to { height: 80px; opacity: 1; } }
  .hero-content {
    position: relative; z-index: 1; text-align: center; padding: 2rem;
    animation: heroFade 1.2s ease-out 0.3s both;
  }
  @keyframes heroFade { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .hero-eyebrow {
    font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--medium-brown); margin-bottom: 1.5rem; font-weight: 400;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 8vw, 6.5rem); font-weight: 300; font-style: italic;
    color: var(--espresso); line-height: 1.1; margin-bottom: 1.8rem;
    letter-spacing: -0.01em;
  }
  .hero-title span { font-weight: 500; color: var(--dark-brown); }
  .hero-divider {
    width: 60px; height: 1px; background: var(--light-brown);
    margin: 0 auto 1.8rem; opacity: 0.7;
  }
  .hero-quote {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 1.25rem; color: var(--text-mid); font-weight: 300;
    max-width: 400px; line-height: 1.7; letter-spacing: 0.01em;
  }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    cursor: pointer; animation: heroFade 1s ease-out 1.2s both;
  }
  .hero-scroll span {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-light);
  }
  .scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, var(--light-brown), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }

  /* ── SECTIONS ── */
  .section { padding: 7rem 2rem; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--light-brown); margin-bottom: 1rem; display: block;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; font-style: italic;
    color: var(--espresso); margin-bottom: 2rem; line-height: 1.25;
  }

  /* ── ABOUT ── */
  .about { background: var(--white); }
  .about-layout {
    display: grid; grid-template-columns: 1fr 1.6fr; gap: 5rem; align-items: center;
  }
  .about-left { position: relative; }
  .about-img-wrap {
    width: 100%; aspect-ratio: 3/4; border-radius: 2px; overflow: hidden;
    box-shadow: 12px 20px 50px rgba(61,43,31,0.12);
    position: relative;
  }
  .about-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .about-img-deco {
    position: absolute; bottom: -20px; right: -20px; width: 70%; height: 80%;
    border: 1px solid var(--warm-sand); border-radius: 2px; z-index: -1;
  }
  .about-text p {
    font-size: 1.05rem; line-height: 1.9; color: var(--text-mid);
    font-weight: 300; margin-bottom: 1.4rem;
  }
  .about-text p:last-child { margin-bottom: 0; }
  .about-sig {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 1.4rem; color: var(--dark-brown); margin-top: 2rem;
  }

  /* ── CATEGORIES ── */
  .categories { background: var(--cream); }
  .cat-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
    margin-top: 3rem;
  }
  .cat-card {
    background: var(--white); border: 1px solid var(--warm-sand);
    border-radius: 4px; padding: 2.8rem 2rem; text-align: center; cursor: pointer;
    transition: all 0.35s ease; position: relative; overflow: hidden;
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
  }
  .cat-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(160deg, var(--beige), var(--warm-sand));
    opacity: 0; transition: opacity 0.35s ease;
  }
  .cat-card:hover { transform: translateY(-6px); box-shadow: 0 18px 48px rgba(61,43,31,0.1); border-color: var(--light-brown); }
  .cat-card:hover::before { opacity: 1; }
  .cat-card * { position: relative; z-index: 1; }
  .cat-icon {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, var(--beige), var(--warm-sand));
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; margin-bottom: 0.5rem;
    transition: transform 0.3s ease;
  }
  .cat-card:hover .cat-icon { transform: scale(1.1) rotate(5deg); }
  .cat-name {
    font-family: 'Cormorant Garamond', serif; font-size: 1.6rem;
    font-weight: 500; color: var(--espresso); letter-spacing: 0.02em;
  }
  .cat-desc { font-size: 0.85rem; color: var(--text-light); line-height: 1.6; font-weight: 300; }
  .cat-btn {
    margin-top: 0.8rem; padding: 0.55rem 1.5rem;
    border: 1px solid var(--medium-brown); border-radius: 30px;
    background: transparent; color: var(--medium-brown); cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.75rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    transition: all 0.25s ease;
  }
  .cat-btn:hover { background: var(--medium-brown); color: var(--white); }

  /* ── GALLERY ── */
  .gallery { background: var(--beige); }
  .gallery-grid {
    display: grid; grid-template-columns: 1.2fr 0.8fr 1fr;
    grid-template-rows: auto; gap: 1.2rem; margin-top: 3rem;
  }
  .gallery-item {
    border-radius: 3px; overflow: hidden; position: relative;
    box-shadow: 0 6px 24px rgba(61,43,31,0.08);
  }
  .gallery-item:first-child { grid-row: span 2; }
  .gallery-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.6s ease; filter: sepia(15%) saturate(85%);
  }
  .gallery-item:hover img { transform: scale(1.04); }
  .gallery-item::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(61,43,31,0.18) 0%, transparent 50%);
  }

  /* ── BLOG LISTING (for inner pages) ── */
  .blog-hero {
    padding: 8rem 2rem 4rem;
    background: linear-gradient(160deg, var(--beige) 0%, var(--warm-sand) 100%);
    text-align: center;
  }
  .blog-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; font-style: italic;
    color: var(--espresso); margin-bottom: 1rem;
  }
  .blog-hero-sub { font-size: 0.95rem; color: var(--text-mid); font-weight: 300; }

  .posts-section { padding: 5rem 2rem; background: var(--cream); }
  .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; margin-top: 3rem; }
  .post-card {
    background: var(--white); border: 1px solid var(--warm-sand);
    border-radius: 4px; overflow: hidden; cursor: pointer;
    transition: all 0.3s ease; display: flex; flex-direction: column;
  }
  .post-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(61,43,31,0.1); }
  .post-card-img { height: 200px; overflow: hidden; background: var(--beige); position: relative; }
  .post-card-img img { width: 100%; height: 100%; object-fit: cover; filter: sepia(10%) saturate(85%); transition: transform 0.5s ease; }
  .post-card:hover .post-card-img img { transform: scale(1.05); }
  .post-card-img-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem; opacity: 0.3;
  }
  .post-card-body { padding: 1.8rem; flex: 1; display: flex; flex-direction: column; }
  .post-tag {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--light-brown); margin-bottom: 0.8rem;
  }
  .post-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem; font-weight: 500; color: var(--espresso);
    margin-bottom: 0.8rem; line-height: 1.35;
  }
  .post-excerpt { font-size: 0.88rem; color: var(--text-light); line-height: 1.7; font-weight: 300; flex: 1; }
  .post-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--beige); }
  .post-date { font-size: 0.75rem; color: var(--text-light); letter-spacing: 0.05em; }
  .read-more-btn {
    font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--medium-brown); cursor: pointer; background: none; border: none;
    font-family: 'Jost', sans-serif; transition: color 0.2s;
    display: flex; align-items: center; gap: 0.4rem;
  }
  .read-more-btn:hover { color: var(--dark-brown); }
  .read-more-btn::after { content: '→'; transition: transform 0.2s; }
  .read-more-btn:hover::after { transform: translateX(4px); }

  /* ── PERSONAL JOURNAL LAYOUT ── */
  .journal-section { padding: 5rem 2rem; background: var(--cream); }
  .journal-inner { max-width: 750px; margin: 0 auto; }
  .journal-entry {
    background: var(--white); border-radius: 4px; padding: 3rem;
    margin-bottom: 2rem; border-left: 3px solid var(--warm-sand);
    transition: all 0.3s ease; cursor: pointer;
    box-shadow: 0 2px 16px rgba(61,43,31,0.04);
  }
  .journal-entry:hover { border-left-color: var(--medium-brown); box-shadow: 0 8px 32px rgba(61,43,31,0.09); transform: translateX(4px); }
  .journal-date {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 0.9rem; color: var(--text-light); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.8rem;
  }
  .journal-date::after { content: ''; flex: 1; height: 1px; background: var(--warm-sand); }
  .journal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem; font-weight: 500; color: var(--espresso);
    margin-bottom: 1rem; line-height: 1.3;
  }
  .journal-body { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; font-weight: 300; }
  .journal-read {
    display: inline-flex; align-items: center; gap: 0.5rem;
    margin-top: 1.5rem; font-size: 0.75rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--medium-brown);
    background: none; border: none; cursor: pointer; font-family: 'Jost', sans-serif;
    transition: color 0.2s;
  }
  .journal-read:hover { color: var(--dark-brown); }

  /* ── CMS MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(61,43,31,0.4); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 2rem; animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--white); border-radius: 6px; padding: 3rem;
    max-width: 580px; width: 100%;
    max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.3s ease;
    box-shadow: 0 24px 80px rgba(61,43,31,0.2);
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .modal h2 {
    font-family: 'Cormorant Garamond', serif; font-size: 1.8rem;
    font-weight: 500; font-style: italic; color: var(--espresso); margin-bottom: 2rem;
  }
  .form-group { margin-bottom: 1.5rem; }
  .form-group label {
    display: block; font-size: 0.72rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--text-mid); margin-bottom: 0.6rem;
  }
  .form-group input, .form-group textarea, .form-group select {
    width: 100%; padding: 0.75rem 1rem;
    border: 1px solid var(--warm-sand); border-radius: 3px;
    background: var(--cream); color: var(--text-dark);
    font-family: 'Jost', sans-serif; font-size: 0.9rem; font-weight: 300;
    transition: border-color 0.2s; outline: none;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
    border-color: var(--medium-brown);
  }
  .form-group textarea { min-height: 120px; resize: vertical; }
  .modal-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; }
  .btn-cancel {
    padding: 0.65rem 1.5rem; border: 1px solid var(--warm-sand); border-radius: 30px;
    background: transparent; color: var(--text-mid); cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.8rem; letter-spacing: 0.1em;
    transition: all 0.2s;
  }
  .btn-cancel:hover { border-color: var(--medium-brown); color: var(--medium-brown); }
  .btn-save {
    padding: 0.65rem 1.8rem; border: 1px solid var(--medium-brown); border-radius: 30px;
    background: var(--medium-brown); color: var(--white); cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 0.8rem; letter-spacing: 0.1em;
    transition: all 0.25s;
  }
  .btn-save:hover { background: var(--dark-brown); border-color: var(--dark-brown); }

  /* ── CMS TOOLBAR ── */
  .cms-bar {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 150;
    display: flex; flex-direction: column; gap: 0.8rem; align-items: flex-end;
  }
  .cms-fab {
    width: 52px; height: 52px; border-radius: 50%;
    background: var(--dark-brown); color: var(--cream); border: none; cursor: pointer;
    font-size: 1.4rem; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 24px rgba(61,43,31,0.25); transition: all 0.25s ease;
  }
  .cms-fab:hover { background: var(--espresso); transform: scale(1.08); }
  .cms-label {
    background: var(--espresso); color: var(--cream);
    padding: 0.4rem 1rem; border-radius: 20px;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(61,43,31,0.2); white-space: nowrap;
  }
  .cms-action-row { display: flex; align-items: center; gap: 0.8rem; }

  /* ── POST DELETE ── */
  .post-actions { display: flex; gap: 0.6rem; }
  .btn-edit, .btn-delete {
    padding: 0.3rem 0.7rem; border-radius: 20px; font-size: 0.7rem;
    letter-spacing: 0.08em; cursor: pointer; font-family: 'Jost', sans-serif;
    border: 1px solid; transition: all 0.2s;
  }
  .btn-edit { border-color: var(--warm-sand); color: var(--text-light); background: transparent; }
  .btn-edit:hover { border-color: var(--medium-brown); color: var(--medium-brown); }
  .btn-delete { border-color: #deb8b8; color: #a06060; background: transparent; }
  .btn-delete:hover { background: #f5e8e8; }

  /* ── FOOTER ── */
  .footer {
    background: var(--espresso); padding: 4rem 2rem 2.5rem;
    text-align: center; color: var(--warm-sand);
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif; font-size: 1.8rem;
    font-weight: 400; font-style: italic; color: var(--cream);
    margin-bottom: 1.5rem; display: block;
  }
  .footer-social { display: flex; gap: 1.2rem; justify-content: center; margin-bottom: 2.5rem; }
  .social-icon {
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid rgba(196,168,130,0.3); display: flex; align-items: center;
    justify-content: center; cursor: pointer; font-size: 0.95rem;
    color: var(--light-brown); transition: all 0.25s ease;
  }
  .social-icon:hover { border-color: var(--light-brown); background: rgba(196,168,130,0.1); transform: translateY(-2px); }
  .footer-copy { font-size: 0.78rem; color: rgba(196,168,130,0.5); letter-spacing: 0.08em; }

  /* ── UTILITY ── */
  .fade-in { animation: heroFade 0.6s ease-out both; }

  .empty-state {
    text-align: center; padding: 4rem 2rem; color: var(--text-light);
  }
  .empty-state p { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.2rem; margin-bottom: 1rem; }

  /* ── HAMBURGER ── */
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
  .hamburger span { width: 22px; height: 1.5px; background: var(--espresso); transition: all 0.3s; display: block; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .about-layout { grid-template-columns: 1fr; gap: 2.5rem; }
    .about-left { max-width: 320px; }
    .cat-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr 1fr; }
    .gallery-item:first-child { grid-row: span 1; grid-column: span 2; height: 220px; }
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .mobile-menu {
      position: fixed; inset: 0; z-index: 90;
      background: var(--cream); display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 2.5rem;
      animation: fadeIn 0.2s ease;
    }
    .mobile-menu .nav-link { font-size: 1.1rem; }
  }
  @media (max-width: 600px) {
    .nav { padding: 1rem 1.5rem; }
    .section { padding: 5rem 1.2rem; }
    .gallery-grid { grid-template-columns: 1fr; }
    .gallery-item:first-child { grid-column: span 1; }
    .posts-grid { grid-template-columns: 1fr; }
    .modal { padding: 2rem 1.5rem; }
    .cms-bar { bottom: 1.2rem; right: 1.2rem; }
  }
`;

// Placeholder images using picsum (warm-toned filters via CSS)
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80",
  about: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
  g1: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
  g2: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
  g3: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80",
  college1: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80",
  college2: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&q=80",
  travel1: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  travel2: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
};

const INITIAL_POSTS = {
  college: [
    { id: 1, title: "The Day I Got My First A+", excerpt: "It felt like the universe paused for just a moment to acknowledge the effort — the late nights, the cold coffee, the highlighter-stained fingers.", date: "Feb 10, 2026", img: IMAGES.college1 },
    { id: 2, title: "Friendships That Bloom in Lecture Halls", excerpt: "There is something about shared stress that bonds people in ways ordinary life rarely can. We were strangers who became constants.", date: "Jan 22, 2026", img: IMAGES.college2 },
  ],
  travel: [
    { id: 1, title: "A Weekend Lost in the Mountains", excerpt: "The road curved endlessly, and for once I didn't mind being lost. The mountains have a way of making small worries feel very far away.", date: "Feb 18, 2026", img: IMAGES.travel1 },
    { id: 2, title: "Solo and Somewhere New", excerpt: "Traveling alone teaches you that your own company, given the right backdrop, is more than enough. Sometimes it is everything.", date: "Jan 5, 2026", img: IMAGES.travel2 },
  ],
  personal: [
    { id: 1, title: "On Slowness and Learning to Rest", date: "Feb 20, 2026", excerpt: "I used to think productivity was the measure of a good day. Now I think a long walk counts. A warm cup of tea counts. Sitting quietly counts." },
    { id: 2, title: "Things I Noticed This Winter", date: "Jan 30, 2026", excerpt: "The way steam rises from a mug. How silence sounds different in the cold. The particular warmth of lamp light on old wood. Small gifts, all of them." },
  ],
};

let nextId = 10;

export default function App() {
  const [page, setPage] = useState("home");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [modal, setModal] = useState(null); // null | 'new' | post object
  const [form, setForm] = useState({ title: "", excerpt: "", date: "", category: "college" });
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = (p) => { setPage(p); setMobileMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const openNew = () => {
    const cat = page === "home" ? "college" : page === "personal" ? "personal" : page;
    setForm({ title: "", excerpt: "", date: new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}), category: cat });
    setModal("new");
  };
  const openEdit = (post, cat) => {
    setForm({ ...post, category: cat });
    setModal(post);
  };
  const closeModal = () => setModal(null);
  const savePost = () => {
    if (!form.title.trim()) return;
    const cat = form.category;
    if (modal === "new") {
      const newPost = { id: nextId++, title: form.title, excerpt: form.excerpt, date: form.date };
      setPosts(p => ({ ...p, [cat]: [newPost, ...p[cat]] }));
    } else {
      setPosts(p => ({ ...p, [cat]: p[cat].map(x => x.id === modal.id ? { ...x, title: form.title, excerpt: form.excerpt, date: form.date } : x) }));
    }
    closeModal();
  };
  const deletePost = (cat, id) => {
    if (!window.confirm("Delete this entry?")) return;
    setPosts(p => ({ ...p, [cat]: p[cat].filter(x => x.id !== id) }));
  };

  return (
    <>
      <style>{FONTS}{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>Somnara's Diaries</div>
        <div className="nav-links">
          {[["home","Home"],["college","College"],["travel","Travel"],["personal","Personal Reflections"]].map(([k,v]) => (
            <button key={k} className={`nav-link${page===k?" active":""}`} onClick={() => navigate(k)}>{v}</button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="mobile-menu">
          {[["home","Home"],["college","College"],["travel","Travel"],["personal","Personal Reflections"]].map(([k,v]) => (
            <button key={k} className="nav-link" onClick={() => navigate(k)}>{v}</button>
          ))}
        </div>
      )}

      {/* PAGES */}
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "college" && <BlogPage title="College" subtitle="Chapters of growth, late nights, and becoming." posts={posts.college} category="college" onEdit={openEdit} onDelete={deletePost} />}
      {page === "travel" && <BlogPage title="Travel" subtitle="Places visited, horizons widened, self discovered." posts={posts.travel} category="travel" onEdit={openEdit} onDelete={deletePost} />}
      {page === "personal" && <JournalPage posts={posts.personal} onEdit={openEdit} onDelete={deletePost} />}

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-logo">Somnara's Diaries</span>
        <div className="footer-social">
          {["✦","◎","⊹","△"].map((icon, i) => (
            <div key={i} className="social-icon">{icon}</div>
          ))}
        </div>
        <p className="footer-copy">© 2026 Somnara's Diaries · All rights reserved</p>
      </footer>

      {/* CMS FAB */}
      <div className="cms-bar">
        <div className="cms-action-row">
          <span className="cms-label">New Entry</span>
          <button className="cms-fab" onClick={openNew} title="Add new post">+</button>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <h2>{modal === "new" ? "New Entry" : "Edit Entry"}</h2>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                <option value="college">College</option>
                <option value="travel">Travel</option>
                <option value="personal">Personal Reflections</option>
              </select>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Entry title…" />
            </div>
            <div className="form-group">
              <label>Excerpt / Body</label>
              <textarea value={form.excerpt} onChange={e => setForm(f => ({...f, excerpt: e.target.value}))} placeholder="Write something beautiful…" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} placeholder="e.g. Feb 27, 2026" />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-save" onClick={savePost}>Save Entry</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-texture" />
        <div className="hero-deco-line" />
        <div className="hero-content">
          <p className="hero-eyebrow">est. 2026 · a personal journal</p>
          <h1 className="hero-title">Somnara's<br /><span>Diaries</span></h1>
          <div className="hero-divider" />
          <p className="hero-quote">"In quiet moments,<br />stories bloom."</p>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about">
        <div className="section-inner">
          <div className="about-layout">
            <div className="about-left">
              <div className="about-img-wrap">
                <img src={IMAGES.about} alt="Writing desk" onError={e => e.target.style.display='none'} />
              </div>
              <div className="about-img-deco" />
            </div>
            <div className="about-text">
              <span className="section-label">About this space</span>
              <h2 className="section-title">Where thoughts rest<br />and memories linger.</h2>
              <p>This is a space where fleeting thoughts find permanence. A diary of moments, memories, and musings — written slowly, carefully, and with intention.</p>
              <p>Here you will find stories from college corridors, roads less traveled, and the quiet interior of everyday life. Nothing is too small to be worthy of a page.</p>
              <p>This is not a blog. It is a journal, left open.</p>
              <div className="about-sig">— Somnara</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section categories">
        <div className="section-inner">
          <span className="section-label">Explore</span>
          <h2 className="section-title">Choose your chapter.</h2>
          <div className="cat-grid">
            {[
              { key: "college", icon: "📖", name: "College", desc: "Notes from the years of studying, discovering, and quietly becoming someone." },
              { key: "travel", icon: "✈︎", name: "Travel", desc: "Places that changed my perspective and roads that brought me back to myself." },
              { key: "personal", icon: "🌿", name: "Personal Reflections", desc: "Honest thoughts on slowness, wonder, and the small beauty of ordinary days." },
            ].map(cat => (
              <div key={cat.key} className="cat-card" onClick={() => navigate(cat.key)}>
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-desc">{cat.desc}</div>
                <button className="cat-btn" onClick={e => { e.stopPropagation(); navigate(cat.key); }}>Explore</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section gallery">
        <div className="section-inner">
          <span className="section-label">Aesthetic</span>
          <h2 className="section-title">Life in warm tones.</h2>
          <div className="gallery-grid">
            <div className="gallery-item" style={{ height: 420 }}>
              <img src={IMAGES.g1} alt="Books" />
            </div>
            <div className="gallery-item" style={{ height: 200 }}>
              <img src={IMAGES.g2} alt="Coffee" />
            </div>
            <div className="gallery-item" style={{ height: 200 }}>
              <img src={IMAGES.g3} alt="Candle" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BlogPage({ title, subtitle, posts, category, onEdit, onDelete }) {
  return (
    <>
      <div className="blog-hero">
        <span className="section-label" style={{ display: "block", marginBottom: "0.8rem" }}>{category}</span>
        <h1 className="blog-hero-title">{title}</h1>
        <p className="blog-hero-sub">{subtitle}</p>
      </div>
      <section className="posts-section">
        <div className="section-inner">
          {posts.length === 0 ? (
            <div className="empty-state">
              <p>No entries yet. Begin writing your first.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post.id} className="post-card fade-in">
                  <div className="post-card-img">
                    {post.img
                      ? <img src={post.img} alt={post.title} />
                      : <div className="post-card-img-placeholder">✦</div>
                    }
                  </div>
                  <div className="post-card-body">
                    <div className="post-tag">{category}</div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-excerpt">{post.excerpt}</div>
                    <div className="post-footer">
                      <span className="post-date">{post.date}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        <div className="post-actions">
                          <button className="btn-edit" onClick={() => onEdit(post, category)}>Edit</button>
                          <button className="btn-delete" onClick={() => onDelete(category, post.id)}>Delete</button>
                        </div>
                        <button className="read-more-btn">Read More</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function JournalPage({ posts, onEdit, onDelete }) {
  return (
    <>
      <div className="blog-hero">
        <span className="section-label" style={{ display: "block", marginBottom: "0.8rem" }}>personal</span>
        <h1 className="blog-hero-title">Personal Reflections</h1>
        <p className="blog-hero-sub">Honest, unhurried, entirely my own.</p>
      </div>
      <section className="journal-section">
        <div className="journal-inner">
          {posts.length === 0 ? (
            <div className="empty-state">
              <p>The page is blank. A beginning awaits.</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="journal-entry fade-in">
                <div className="journal-date">{post.date}</div>
                <div className="journal-title">{post.title}</div>
                <div className="journal-body">{post.excerpt}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem" }}>
                  <button className="journal-read">Continue reading →</button>
                  <div className="post-actions">
                    <button className="btn-edit" onClick={() => onEdit(post, "personal")}>Edit</button>
                    <button className="btn-delete" onClick={() => onDelete("personal", post.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
