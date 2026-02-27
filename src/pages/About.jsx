import React from "react";
import Container from "../components/Container.jsx";
import { Link } from "react-router-dom";

import education from "../assets/Education.jpeg";
import livelihood from "../assets/Livelihoods.jpeg"; 
import health from "../assets/Health.jpeg";
import environment from "../assets/Environment.jpeg";
import parenting from "../assets/Parenting.jpeg";

export default function About() {
  return (
    <div className="pb-20 overflow-hidden bg-bg0 text-text transition-colors duration-300">
      
      {/* ===== HERO SECTION (Vision & Mission) ===== */}
      <section className="relative w-full py-24 lg:py-36 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={education} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#1e2330]/90 mix-blend-multiply"></div>
        </div>

        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 text-center text-white">
            
            {/* Vision */}
            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 tracking-wide">
                Our Vision
              </h1>
              <p className="text-base md:text-lg lg:text-xl font-light max-w-md mx-auto leading-relaxed text-gray-200">
               A society where all individuals are empowered, included, and thrive together in 
harmony.
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 tracking-wide">
                Our Mission
              </h1>
              <p className="text-base md:text-lg lg:text-xl font-light max-w-lg mx-auto leading-relaxed text-gray-200">
               Our mission is to empower individuals with knowledge, resource, and networks to 
create sustainable changes in communities.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* ===== OUR JOURNEY ===== */}
      <section className="mt-16 md:mt-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24 items-center">
            {/* Left Image Card */}
            <div className="relative max-w-sm sm:max-w-md mx-auto md:max-w-none md:ml-0">
              <div className="glass rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[4/5] bg-black/40 border border-border relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 sm:p-8 text-center">
                  <svg className="w-10 sm:w-12 h-10 sm:h-12 text-white/80 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                    Bright Futures<br />Education
                  </h3>
                  <p className="mt-2 text-[10px] sm:text-xs text-white/70 max-w-[200px]">
                    Iyakkachchi Education Center
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1497375638960-ca368c7231e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Iyakkachchi"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                />
              </div>
            </div>

            {/* Right Text Content (Added to fix blank space) */}
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Our History</span>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif text-text">From Humble Beginnings</h2>
              <p className="mt-4 text-muted text-sm leading-loose">
                Established in 2008, our journey began with a vision to rebuild lives and restore hope in Kilinochchi. Over the years, we have expanded our reach, establishing the Iyakkachchi Education Center in 2020 to serve the growing needs of the community.
              </p>
              <p className="mt-4 text-muted text-sm leading-loose">
                Today, we continue to grow, believing that every individual possesses the potential to transform their world given the right tools and opportunities.
              </p>
            </div>
            
          </div>
        </Container>
      </section>

      {/* ===== CORE VALUES ===== */}
      {/* Reduced margin from mt-40 to mt-28 for better spacing */}
      <section className="mt-20 md:mt-28">
        <Container>
          <div className="mb-8 sm:mb-12 text-center sm:text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Core Values</span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-serif">What We Believe In</h2>
            <p className="mt-2 sm:mt-3 text-muted text-sm max-w-md leading-relaxed">The principles rooted in faith and love that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { title: "Compassion & Love", desc: "Inspired by the teachings of Jesus to love one's neighbour. We reach out with empathy.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
              { title: "Human Dignity", desc: "We believe that all people are created in the image of God. Every person deserves respect.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { title: "Justice & Reconciliation", desc: "We promote reconciliation and healing in communities affected by violence or division.", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 01-6.001 0M18 7l-3 9m-5.544-2.644L12 2m0 0l2.544 11.356" },
              { title: "Service & Humility", desc: "Following the example of Jesus, who came to serve rather than be served.", icon: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" },
              { title: "Stewardship", desc: "We are stewards of the resources we have been given, ensuring maximum impact.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" },
              { title: "Faith & Hope", desc: "We are motivated by a deep faith in God and a hope for a better future.", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
            ].map((val, i) => (
              <div key={i} className="glass rounded-[1.2rem] sm:rounded-[1.5rem] p-5 sm:p-6 lg:p-8 hover:bg-bg1 transition duration-300 border border-border">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-[0.6rem] sm:rounded-[0.8rem] bg-primary/10 border border-border flex items-center justify-center text-primary mb-4 sm:mb-6">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={val.icon} /></svg>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-serif mb-2 sm:mb-3 text-text">{val.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== AREAS OF FOCUS ===== */}
      <section className="mt-20 md:mt-28">
        <Container>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Our Programs</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif text-text">Five Areas of Focus</h2>
            <p className="mt-4 text-muted text-sm max-w-lg mx-auto leading-relaxed">Our programs span five key areas addressing the most pressing needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Child Development", desc: "Literacy, scholarships", img: education },
              { title: "Health", desc: "Medical camps", img: health },
              { title: "Environment", desc: "Conservation", img: environment },
              { title: "Livelihoods", desc: "Skills training", img: livelihood },
              { title: "Parenting", desc: "Mother Design", img: parenting },
            ].map((area, i) => (
              <div key={i} className="group relative rounded-[2rem] p-8 text-center bg-panel border border-border hover:border-primary transition-all duration-500 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500 border border-border">
                  <img src={area.img} alt={area.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-serif text-text mb-3">{area.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-light">{area.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== GOVERNANCE ===== */}
      <section className="mt-20 md:mt-28">
        <Container>
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Governance</span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-serif">Our Leadership</h2>
            <p className="mt-2 sm:mt-3 text-muted text-sm max-w-lg mx-auto">Three signatories ensure financial transparency.</p>
          </div>

          {/* Board */}
          <div className="mb-10 sm:mb-12">
            <h3 className="text-base sm:text-lg font-semibold mb-5 sm:mb-6 text-center text-text">Board of Directors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {[
                { name: "Mr. N. Paraneeswaran", role: "Chairman / Director" },
                { name: "Mr. R. Ramiro", role: "Secretary" },
                { name: "Pas M. Neethiraja Titus", role: "Treasurer / Accountant" },
              ].map((m, i) => (
                <div key={i} className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-border flex flex-col items-center justify-center">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/10 border border-border flex items-center justify-center text-primary text-base sm:text-lg font-bold mb-2">
                    {m.name.charAt(m.name.indexOf(".") + 2)}
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-text leading-tight">{m.name}</h4>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full border border-border bg-primary/10 text-[8px] sm:text-[9px] tracking-wider font-bold text-primary uppercase">
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Members */}
          <div className="mb-10 sm:mb-12">
            <h3 className="text-sm sm:text-base font-semibold mb-4 sm:mb-5 text-center text-muted">Board Members</h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
              {["Pas R. Nagatheepan", "Mr. Nagaraj", "Pas. Delon Ratna", "Mr. Sivor Jeyanth"].map((name, i) => (
                <div key={i} className="glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-text border border-border">{name}</div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== MILESTONES ===== */}
      <section className="mt-20 md:mt-28 mb-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        <Container className="relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Timeline</span>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-serif text-text">Key Milestones</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[
              { year: "2008", label: "Founded", sub: "Kilinochchi" },
              { year: "2020", label: "Education", sub: "Iyakkachchi" },
              { year: "2024", label: "Parenting", sub: "WNAF" },
              { year: "Next", label: "Expanding", sub: "New Areas" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-[1.2rem] sm:rounded-[2rem] p-5 sm:p-8 md:p-10 text-center flex flex-col items-center justify-center shadow-lg border border-border min-h-[140px] sm:min-h-[180px]">
                <div className="text-2xl sm:text-3xl md:text-5xl font-serif font-medium text-text">{item.year}</div>
                <div className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-muted uppercase">{item.label}</div>
                <div className="mt-1 text-[8px] sm:text-[9px] text-primary/60 tracking-wider uppercase">{item.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== FINANCIAL TRANSPARENCY ===== */}
      <section className="mt-10 sm:mt-16">
        <Container>
          <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12 text-center border border-border">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mx-auto mb-4 sm:mb-6">
              <svg className="w-6 sm:w-7 h-6 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-text mb-3 sm:mb-4">Financial Transparency</h3>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed">Three signatories are required for fund withdrawals. Audited statements available on request.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 rounded-full border border-border text-[10px] font-bold tracking-widest text-text uppercase hover:bg-bg1 transition">
              Request Reports
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}