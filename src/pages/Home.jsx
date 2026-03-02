import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import { api } from "../lib/api.js";

import education from "../assets/Education.jpeg";
import livelihood from "../assets/Livelihoods.jpeg";
import health from "../assets/Health.jpeg";
import play from "../assets/play.jpeg";

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  // HERO CAROUSEL STATE
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const [partners, setPartners] = useState([]);


  /* ================= FETCH PARTNERS ================= */
  useEffect(() => {
    api
      .get("/api/partners")
      .then(({ data }) => setPartners(data.partners || []))
      .catch((err) => console.error(err));
  }, []);

  /* ================= FETCH HERO SLIDES ================= */
  useEffect(() => {
    api
      .get("/api/hero")
      .then(({ data }) => setSlides(data.slides || []))
      .catch((err) => console.error(err));
  }, []);

  /* ================= AUTO ROTATE EVERY 10 SECONDS ================= */
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides]);

  /* ================= FETCH LATEST BLOG ================= */
  useEffect(() => {
    const controller = new AbortController();
    api
      .get("/api/blog/latest?limit=3", { signal: controller.signal })
      .then(({ data }) => setLatest(data.posts || []))
      .catch((err) => {
        if (err.name !== "CanceledError") console.error(err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <div className="overflow-x-hidden bg-bg0 text-text transition-colors duration-300">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* HERO CAROUSEL BACKGROUND */}
        <div className="absolute inset-0 z-0">
          {slides.length > 0 ? (
            slides.map((slide, index) => (
              <img
                key={slide._id}
                src={slide.image.url}
                alt="Hero Slide"
                className={`absolute inset-0 w-full h-full object-cover object-top md:object-right transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}

          {/* 1. Frosted glass overlay */}
          <div className="absolute inset-0 bg-bg0/50 backdrop-blur-[3px] transition-colors duration-300"></div>

          {/* 2. Left-to-right gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg0 via-bg0/80 to-transparent w-full md:w-[85%] transition-colors duration-300"></div>

          {/* 3. Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg0 to-transparent transition-colors duration-300"></div>
        </div>

        <Container className="relative z-10 pt-20 pb-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-text leading-[1] tracking-tight mb-6 drop-shadow-sm">
              ACTION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-primary italic pr-2 font-medium">
                FOR
              </span>
              BETTER <br />
              LIFE.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text/80 max-w-xl leading-relaxed mb-10 font-medium">
              Empowering the war-affected communities of Kilinochchi through
              education, nutrition, and sustainable livelihood programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <Link
                to="/join"
                className="px-8 py-4 rounded-full bg-text text-bg0 font-bold tracking-wider uppercase text-xs hover:bg-primary hover:text-white transition-all shadow-lg active:scale-[0.98]"
              >
                Get Involved
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-full border-2 border-border text-text font-bold tracking-wider uppercase text-xs hover:bg-bg1 transition-all active:scale-[0.98]"
              >
                Our Story
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="relative z-20 -mt-10 sm:-mt-16">
        <Container>
          <div className="glass rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 border border-border shadow-2xl bg-panel/90 backdrop-blur-xl">
            {[
              { label: "Years Active", value: "16+" },
              { label: "Families Helped", value: "2k+" },
              { label: "Children Educated", value: "500+" },
              { label: "Active Programs", value: "05" },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text mb-2">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= MISSION STATEMENT ================= */}
      <section className="py-20 sm:py-32">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 relative w-full max-w-md mx-auto md:max-w-none">
              <div className="relative z-10 rounded-[2rem] overflow-hidden aspect-[4/5] border border-border rotate-[-2deg] hover:rotate-0 transition duration-500 shadow-xl">
                <img
                  src={play}
                  alt="Classroom"
                  className="w-full h-full object-cover transition duration-700"
                />
              </div>
              <div className="absolute top-10 -right-4 sm:-right-10 w-2/3 aspect-square rounded-[2rem] overflow-hidden border border-border z-0 rotate-[5deg] opacity-60">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 mt-8 md:mt-0">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text mt-4 mb-6 leading-tight transition-colors duration-300">
                We believe in a future where every child has a
                <span className="text-primary italic pr-2 font-medium">
                  {" "}fighting chance.
                </span>
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed mb-8 transition-colors duration-300">
                Based in Iyakkachchi, our flagship "Bright Futures" initiative
                provides a safe haven for children. Beyond textbooks, we focus on
                nutrition, character building, and protecting the next
                generation from the drug crisis affecting our region.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Education Support",
                  "Nutritional Meals",
                  "Drug Awareness",
                  "Parental Guidance",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-border flex items-center justify-center text-primary shrink-0">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-text font-medium transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= FEATURED PROGRAMS ================= */}
      <section className="py-20 sm:py-28 bg-bg1 border-y border-border transition-colors duration-300">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text transition-colors duration-300">
                Holistic Growth
              </h2>
              <p className="text-muted mt-3 sm:mt-4 text-sm sm:text-base max-w-md transition-colors duration-300">
                We address the root causes of poverty through five key pillars.
              </p>
            </div>
            <Link
              to="/about"
              className="text-primary text-sm font-bold tracking-widest uppercase hover:text-text transition-colors flex items-center gap-2 group"
            >
              View all programs
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Education",
                desc: "Scholarships & evening classes.",
                img: education,
              },
              {
                title: "Livelihood",
                desc: "Microfinance for mothers.",
                img: livelihood,
              },
              {
                title: "Health",
                desc: "Medical camps & hygiene.",
                img: health,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative h-[350px] sm:h-[400px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg border border-border"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-10 h-1 bg-primary mb-4 rounded-full"></div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= LATEST STORIES ================= */}
      <section className="py-20 sm:py-32 relative">
        <div className="absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                From the Field
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text mt-3 transition-colors duration-300">
                Stories of Change
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-primary text-sm font-bold tracking-widest uppercase hover:text-text transition-colors flex items-center gap-2 group"
            >
              View all posts
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-muted py-10">Loading updates...</div>
          ) : latest.length === 0 ? (
            <div className="text-center text-muted py-10">
              No recent stories found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {latest.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group block p-4 sm:p-5 rounded-[1.5rem] bg-panel border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-bg1 border border-border">
                    {post.coverImage?.url ? (
                      <img
                        src={post.coverImage.url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-primary mb-3">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-muted">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
      {/* ================= PARTNER CAROUSEL ================= */}
      {partners.length > 0 && (
        <section className="py-16 sm:py-24 bg-bg0 relative overflow-hidden border-y border-border transition-colors duration-300">

          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

          <Container className="relative z-10">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-primary">
                Our Partners
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-text">
                Trusted Organizations
              </h3>
            </div>
          </Container>

          {/* Carousel Track */}
          <div
            className="relative w-full max-w-[1600px] mx-auto overflow-hidden z-10"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: '-webkit-linear-gradient(left, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div className="flex gap-6 sm:gap-8 px-4 py-8 animate-partner-scroll hover:[animation-play-state:paused] w-max">

              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <a
                  key={index}
                  href={partner.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col w-[240px] sm:w-[280px] 
                       rounded-[1.5rem] sm:rounded-[2rem] bg-panel backdrop-blur-xl 
                       border border-border overflow-hidden
                       shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                       hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:border-primary/50
                       transition-all duration-500 ease-out flex-shrink-0"
                >
                  {/* 
                UPDATED: Image Container 
                Changed h-36 sm:h-44  ->  h-16 sm:h-24 (Reduced height by ~50%)
            */}
                  <div className="w-full h-16 sm:h-24 bg-bg1 relative flex items-center justify-center border-b border-border">
                    <img
                      src={`${partner.logo.url}?f_auto,q_auto,w_400`}
                      alt={partner.name}
                      loading="lazy"
                      /* 
                         Suggestion: If logos get cut off because the box is short, 
                         change 'object-cover' to 'object-contain' and add 'p-2' padding.
                      */
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-500 pointer-events-none"></div>
                  </div>

                  {/* 
                800px x 300px 
            */}
                  <div className="w-full py-1 text-center px-4">
                    <span className="text-sm sm:text-base italic text-text tracking-wide group-hover:text-primary transition-colors duration-300">
                      {partner.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ================= FINAL CTA ================= */}
      <section className="pb-20">
        <Container>
          <div className="rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-violet-900 via-[#150e26] to-black border border-border p-8 sm:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                Be the change.
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
                Your contribution directly funds education materials, nutritional
                meals, and hope for the children of Kilinochchi.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-black font-bold tracking-wider uppercase text-xs hover:bg-gray-200 transition-colors shadow-lg active:scale-[0.98]"
                >
                  Donate Now
                </Link>
                <Link
                  to="/join"
                  className="px-8 py-4 rounded-full bg-white/10 text-white border border-white/20 font-bold tracking-wider uppercase text-xs hover:bg-white/20 transition-colors active:scale-[0.98]"
                >
                  Become a Partner
                </Link>
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -top-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/30 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 blur-[100px] rounded-full"></div>
          </div>
        </Container>
      </section>
    </div>

  );
}