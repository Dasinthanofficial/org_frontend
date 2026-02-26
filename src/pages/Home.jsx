import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import { api } from "../lib/api.js";

import education from "../assets/Education.jpeg";
import livelihood from "../assets/Livelihoods.jpeg"; 
import health from "../assets/Health.jpeg";
import hero from "../assets/hero.jpeg";
import classroom from "../assets/Classroom.jpeg"; 



export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Children of Kilinochchi"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05030A] via-[#05030A]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05030A] via-transparent to-transparent"></div>
        </div>

        <Container className="relative z-10 pt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-[0.9] tracking-tight mb-6">
              ACTION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-200 italic pr-2">
                FOR
              </span>
              BETTER <br />
              LIFE.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-8 font-light">
              Empowering the war-affected communities of Kilinochchi through
              education, nutrition, and sustainable livelihood programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/join"
                className="px-8 py-4 rounded-full bg-white text-black font-bold tracking-wider uppercase text-xs hover:bg-violet-50 transition-colors flex items-center justify-center gap-2"
              >
                Get Involved
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-wider uppercase text-xs hover:bg-white/10 transition-colors flex items-center justify-center"
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
          <div className="glass rounded-[2rem] p-6 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 shadow-2xl bg-[#0B0713]/80 backdrop-blur-xl">
            {[
              { label: "Years Active", value: "16+" },
              { label: "Families Helped", value: "2k+" },
              { label: "Children Educated", value: "500+" },
              { label: "Active Programs", value: "05" },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-violet-300 uppercase">
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
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden aspect-[4/5] border border-white/10 rotate-[-2deg] hover:rotate-0 transition duration-500">
                <img
                  src={classroom}
                  alt="Classroom"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                />
              </div>
              <div className="absolute top-10 -right-4 sm:-right-10 w-2/3 aspect-square rounded-[2rem] overflow-hidden border border-white/10 z-0 rotate-[5deg] opacity-60">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <span className="text-violet-400 font-bold tracking-[0.2em] uppercase text-xs">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
                We believe in a future where every child has a
                <span className="text-violet-400 italic px-2">
                  fighting chance.
                </span>
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">
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
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300">
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
                    <span className="text-sm text-white font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= FEATURED PROGRAMS (Cards) ================= */}
      <section className="py-20 bg-[#0B0713]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-serif text-white">
                Holistic Growth
              </h2>
              <p className="text-muted mt-3 max-w-md">
                We address the root causes of poverty through five key pillars.
              </p>
            </div>
            <Link
              to="/about"
              className="text-white border-b border-violet-500 pb-1 hover:text-violet-400 transition"
            >
              View all programs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-1 bg-violet-500 mb-4 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
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
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-violet-400 font-bold tracking-[0.2em] uppercase text-xs">
                From the Field
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white mt-4">
                Stories of Change
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-white border-b border-violet-500 pb-1 hover:text-violet-400 transition"
            >
              View all posts &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-muted">Loading updates...</div>
          ) : latest.length === 0 ? (
            <div className="text-center text-muted">
              No recent stories found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latest.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-white/5 border border-white/5">
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
                  <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-violet-400 mb-2">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                    <span className="text-muted">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors leading-tight">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="pb-20">
        <Container>
          <div className="rounded-[2.5rem] bg-gradient-to-br from-violet-900 via-[#150e26] to-black border border-white/10 p-8 sm:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white mb-6">
                Be the change.
              </h2>
              <p className="text-muted max-w-xl mx-auto mb-8 text-sm sm:text-lg">
                Your contribution directly funds education materials, nutritional
                meals, and hope for the children of Kilinochchi.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-black font-bold tracking-wider uppercase text-xs hover:bg-gray-200 transition"
                >
                  Donate Now
                </Link>
                <Link
                  to="/join"
                  className="px-8 py-4 rounded-full bg-white/10 text-white border border-white/10 font-bold tracking-wider uppercase text-xs hover:bg-white/20 transition"
                >
                  Become a Partner
                </Link>
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
          </div>
        </Container>
      </section>
    </div>
  );
}