import React from "react";
import Container from "../components/Container.jsx";
import { Link } from "react-router-dom";

export default function Join() {
  return (
    <div className="pb-20 sm:pb-24 overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="pt-14 sm:pt-20 md:pt-28 text-center px-4">
        <Container>
          <div className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6 sm:mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-violet-300 uppercase">
              Get Involved
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white leading-tight">
            Help us build a <br className="hidden sm:block" />
            <span className="italic text-violet-400 font-light pr-2">
              better life
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Every hand makes a difference. Join Action for Better Life and help
            empower children, families, and communities across Kilinochchi and
            beyond.
          </p>
        </Container>
      </section>

      {/* ===== WAYS TO HELP ===== */}
      <section className="mt-14 sm:mt-20 md:mt-32">
        <Container>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
              Ways you can help
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
            {/* Volunteer */}
            <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col items-center text-center hover:border-violet-500/30 transition duration-500">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/5 flex items-center justify-center text-violet-400 mb-4 sm:mb-5">
                <svg
                  className="w-6 sm:w-7 h-6 sm:h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-serif text-white mb-2 sm:mb-3">
                Volunteer
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed flex-1 mb-5 sm:mb-6">
                Share your time and skills with our local teams at our
                Iyakkachchi center.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 rounded-full border border-white/10 text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white hover:bg-white/5 transition text-center block"
              >
                Volunteer
              </Link>
            </div>

            {/* Donate — Highlighted */}
            <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.05)] hover:border-violet-500/40 transition duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none"></div>

              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 sm:mb-5 relative z-10">
                <svg
                  className="w-6 sm:w-7 h-6 sm:h-7 drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-serif text-white mb-2 sm:mb-3 relative z-10">
                Donate
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed flex-1 mb-5 sm:mb-6 relative z-10">
                Your gifts fund education, nutrition, and essential resources for
                children and families.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:brightness-110 transition relative z-10 text-center block"
              >
                Give Today
              </Link>
            </div>

            {/* Internship */}
            <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col items-center text-center hover:border-violet-500/30 transition duration-500">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/5 flex items-center justify-center text-violet-400 mb-4 sm:mb-5">
                <svg
                  className="w-6 sm:w-7 h-6 sm:h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-serif text-white mb-2 sm:mb-3">
                Internship
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed flex-1 mb-5 sm:mb-6">
                Gain hands-on experience in community development and
                humanitarian work.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 rounded-full border border-white/10 text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white hover:bg-white/5 transition text-center block"
              >
                Apply
              </Link>
            </div>

            {/* Partner */}
            <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 flex flex-col items-center text-center hover:border-violet-500/30 transition duration-500">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/5 flex items-center justify-center text-violet-400 mb-4 sm:mb-5">
                <svg
                  className="w-6 sm:w-7 h-6 sm:h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-serif text-white mb-2 sm:mb-3">
                Partner
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed flex-1 mb-5 sm:mb-6">
                Join us as an organization. Like Hope4Child Canada, your
                partnership creates lasting impact.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 rounded-full border border-white/10 text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white hover:bg-white/5 transition text-center block"
              >
                Partner
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== BRIGHT FUTURES SPOTLIGHT ===== */}
      <section className="mt-16 sm:mt-24 md:mt-32">
        <Container>
          <div className="glass rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 lg:p-16 border border-white/5 shadow-2xl overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-violet-600/10 blur-[100px] pointer-events-none rounded-full"></div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center relative z-10">
              {/* Image */}
              <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-[#120A1F] border border-white/5 overflow-hidden shadow-2xl max-w-sm mx-auto md:mx-0 w-full">
                <div className="aspect-[4/5] relative bg-black/50">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Children in the Bright Futures education program at Iyakkachchi"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A1F] via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="py-4 sm:py-6 px-4 text-center">
                  <div className="text-sm font-bold tracking-widest text-white uppercase">
                    Bright Futures
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-muted uppercase mt-1 sm:mt-2">
                    &mdash; Iyakkachchi Education Center &mdash;
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
                  Your kindness
                  <br />
                  <span className="italic text-violet-400 font-light pr-2">
                    makes this possible
                  </span>
                </h2>

                <p className="mt-4 sm:mt-6 text-muted text-sm md:text-base leading-relaxed max-w-md">
                  Operating from a rented center in Iyakkachchi, we provide
                  children with essential education, nutritional support, indoor
                  and outdoor activities, and drug prevention awareness. Teachers
                  and principals report significant improvements in children&apos;s
                  character and academic performance.
                </p>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[9px] sm:text-[10px] font-bold tracking-widest text-violet-300 uppercase mb-1 sm:mb-2">
                    Supported By
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 text-[10px] sm:text-xs font-bold shrink-0">
                      H
                    </div>
                    Hope4Child Canada
                  </div>
                </div>

                <div className="mt-6 sm:mt-10 flex items-center gap-6 sm:gap-12 md:gap-16">
                  <div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-white flex items-baseline gap-1">
                      16
                      <span className="text-violet-400 text-xl sm:text-2xl md:text-4xl font-light">
                        +
                      </span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-muted uppercase mt-2 sm:mt-3">
                      Years of Service
                    </div>
                  </div>

                  <div className="w-[1px] h-10 sm:h-12 bg-white/10"></div>

                  <div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-white flex items-baseline gap-1">
                      5
                      <span className="text-violet-400 text-xl sm:text-2xl md:text-4xl font-light">
                        +
                      </span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-muted uppercase mt-2 sm:mt-3">
                      Active Programs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== FUTURE PLANS ===== */}
      <section className="mt-14 sm:mt-20 md:mt-24">
        <Container>
          <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12 text-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6 text-violet-400">
              <svg
                className="w-7 sm:w-8 h-7 sm:h-8 drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.13 22.19l-1.63-3.83c-.04-.08-.12-.13-.21-.13h0c-.09 0-.17.05-.21.13l-1.63 3.83c-.11.25-.46.25-.57 0l-1.74-4.06c-.05-.11-.15-.19-.26-.22C3.89 17.13 2 14.67 2 11.5 2 6.81 5.81 3 10.5 3S19 6.81 19 11.5c0 3.17-1.89 5.63-4.88 6.41-.12.03-.22.11-.26.22l-1.74 4.06c-.11.25-.46.25-.57 0zM10.5 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4">
              Future Plans
            </h3>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed mb-5 sm:mb-6">
              We are planning to expand our education, health, environment,
              livelihoods, and parenting programs to other deprived areas across
              Sri Lanka. We are actively seeking diversified funding sources and
              building organizational capacity to make this a reality.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-[10px] font-bold tracking-widest text-white uppercase shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition"
            >
              Support Our Expansion
              <svg
                className="w-3.5 h-3.5"
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
          </div>
        </Container>
      </section>
    </div>
  );
}