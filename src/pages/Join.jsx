import React from "react";
import Container from "../components/Container.jsx";
import { Link } from "react-router-dom";
import help from "../assets/help.jpeg"



export default function Join() {
  return (
    <div className="pb-20 sm:pb-24 overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">

      {/* ===== HERO WITH BACKGROUND IMAGE ===== */}
      <section className="relative pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-24 text-center px-4 overflow-hidden">
        
        {/* 1. BACKGROUND IMAGE & OVERLAY */}
        <div className="absolute inset-0 z-0">
          <img 
            // Replace this URL with your local image import or URL
            src={help} 
            alt="Volunteers helping" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to make text readable */}
          <div className="absolute inset-0 bg-black/70 dark:bg-black/80"></div>
          {/* Optional: Gradient fade at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg0 via-transparent to-transparent"></div>
        </div>

        {/* 2. CONTENT (Added relative & z-10 to sit on top of image) */}
        <Container className="relative z-10">
          
          <div className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6 sm:mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Get Involved</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white leading-tight drop-shadow-lg">
            Help us build a <br className="hidden sm:block" />
            <span className="italic text-violet-400 font-light pr-2">better life</span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-gray-200 text-sm md:text-base max-w-xl mx-auto leading-relaxed drop-shadow-md">
            Every hand makes a difference. Join Action for Better Life to empower children in Kilinochchi.
          </p>

        </Container>
      </section>

      {/* ===== WAYS TO HELP ===== */}
      <div className="bg-bg1 pb-6">
        <section className="mt-14 sm:mt-20 md:mt-32 ">
          <Container>
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">Ways you can help</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

              {/* 1. Volunteer */}
              <div className="group flex flex-col items-center text-center h-full rounded-[2rem] p-8 transition duration-500 
                            bg-white border border-gray-100 shadow-xl shadow-gray-200/50
                            dark:bg-[#0B0618] dark:border-white/5 dark:shadow-none">

                <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center mb-6 
                              shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
                </div>

                <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-3">Volunteer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-10">Share your time and skills with our local teams at our Iyakkachchi center.</p>

                <Link to="/contact" className="w-full py-3.5 rounded-full border text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                                           border-gray-200 text-gray-900 hover:border-violet-500 hover:text-violet-600
                                           dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30">
                  Volunteer
                </Link>
              </div>

              {/* 2. Donate */}
              <div className="group flex flex-col items-center text-center h-full rounded-[2rem] p-8 transition duration-500 relative overflow-hidden
                            bg-white border border-gray-100 shadow-xl shadow-gray-200/50
                            dark:bg-[#0B0618] dark:border-white/5 dark:shadow-none">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-100 shadow-[0_0_20px_rgba(139,92,246,0.6)]"></div>
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 dark:opacity-100 pointer-events-none"></div>

                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500
                              bg-gray-50 text-violet-600 border border-gray-100
                              dark:bg-[#161025] dark:text-violet-300 dark:border-white/5">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </div>

                <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-3 relative z-10">Donate</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-10 relative z-10">Your gifts fund education, nutrition, and essential resources for children.</p>

                <Link to="/contact" className="relative z-10 w-full py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-[10px] font-bold tracking-[0.2em] uppercase text-white shadow-lg shadow-violet-900/20 hover:shadow-violet-600/40 transition-all duration-300">
                  Give Today
                </Link>
              </div>

              {/* 3. Internship */}
              <div className="group flex flex-col items-center text-center h-full rounded-[2rem] p-8 transition duration-500 
                            bg-white border border-gray-100 shadow-xl shadow-gray-200/50
                            dark:bg-[#0B0618] dark:border-white/5 dark:shadow-none">

                <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center mb-6 
                              shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>

                <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-3">Internship</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-10">Gain hands-on experience in community development and humanitarian work.</p>

                <Link to="/contact" className="w-full py-3.5 rounded-full border text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                                           border-gray-200 text-gray-900 hover:border-violet-500 hover:text-violet-600
                                           dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30">
                  Apply
                </Link>
              </div>

              {/* 4. Partner */}
              <div className="group flex flex-col items-center text-center h-full rounded-[2rem] p-8 transition duration-500 
                            bg-white border border-gray-100 shadow-xl shadow-gray-200/50
                            dark:bg-[#0B0618] dark:border-white/5 dark:shadow-none">

                <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center mb-6 
                              shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>

                <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-3">Partner</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-10">Join us as an organization. Like Hope4Child Canada, your partnership creates impact.</p>

                <Link to="/contact" className="w-full py-3.5 rounded-full border text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                                           border-gray-200 text-gray-900 hover:border-violet-500 hover:text-violet-600
                                           dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30">
                  Partner
                </Link>
              </div>

            </div>
          </Container>
        </section>
      </div>

      {/* ===== FUTURE PLANS ===== */}
      <section className="mt-14 sm:mt-24 md:mt-32 px-4">
        <Container>
          <div className="rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden
                          bg-white border border-gray-200 shadow-xl
                          dark:bg-[#0B0618] dark:border-white/5 dark:shadow-none">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-serif text-gray-900 dark:text-white mb-4">Future Plans</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed mb-8">We are planning to expand our education, health, and livelihood programs to other deprived areas across Sri Lanka.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-[10px] font-bold tracking-widest text-white uppercase shadow-lg hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-300">
                Support Our Expansion
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}