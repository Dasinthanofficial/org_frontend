import React, { useState } from "react";
import Container from "../components/Container.jsx";

function ContactBlock({ icon, title, desc, sub, href }) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, className: "hover:text-white transition-colors" }
    : {};

  return (
    <div className="flex items-start gap-3 sm:gap-5 group">
      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition duration-300 shrink-0 shadow-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-bold text-white mb-1">
          {title}
        </h3>
        <Wrapper {...wrapperProps}>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
            {desc}
          </p>
        </Wrapper>
        {sub && <p className="text-xs text-violet-300/70 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    // TODO: Replace with actual API endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setSending(false);
  }

  return (
    <div className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-start max-w-7xl mx-auto">
          {/* LEFT */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-serif font-bold tracking-tight text-white leading-none">
              Get in{" "}
              <span className="text-violet-500 italic font-light pr-1">
                Touch
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-muted text-sm md:text-base max-w-md leading-relaxed">
              Whether you want to volunteer, partner, donate, or learn more
              about our work in Kilinochchi &mdash; we&apos;d love to hear from
              you.
            </p>

            <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
              <ContactBlock
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                }
                title="Visit Us"
                desc={"39, Vivekananthanagar West,\nKilinochchi, Sri Lanka"}
              />
              <ContactBlock
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                }
                title="Email Us"
                desc="info@action4bl.com"
                sub="We usually reply within 48 hours."
                href="mailto:info@action4bl.com"
              />
              <ContactBlock
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                }
                title="Call Us"
                desc="+94 77 886 6819"
                sub="Mon–Fri, 8:30am to 5:30pm"
                href="tel:+94778866819"
              />
            </div>

            {/* Social */}
            <div className="mt-8 sm:mt-12">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-3 sm:mb-4">
                Follow Us
              </h4>
              <a
                href="https://facebook.com/action4bl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-muted hover:text-violet-300 hover:border-violet-500/30 transition"
                aria-label="Facebook page"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                facebook.com/action4bl
              </a>
            </div>

            {/* Website */}
            <div className="mt-4">
              <a
                href="https://www.action4bl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-muted hover:text-violet-300 hover:border-violet-500/30 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                  />
                </svg>
                www.action4bl.com
              </a>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="relative mt-2 lg:mt-0">
            <div className="glass rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 md:p-12 relative border border-white/5 shadow-2xl bg-[#0B0713]/90 backdrop-blur-2xl">
              {sent ? (
                <div className="text-center py-10 sm:py-16">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                    <svg
                      className="w-7 sm:w-8 h-7 sm:h-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
                    Thank You!
                  </h2>
                  <p className="mt-3 text-sm text-muted max-w-xs mx-auto">
                    We&apos;ve received your message and will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        topic: "General Inquiry",
                        message: "",
                      });
                    }}
                    className="mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 rounded-full border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white hover:bg-white/5 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
                    Talk to{" "}
                    <span className="text-violet-500 italic font-light pr-1">
                      Us
                    </span>
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm text-muted">
                    Fill out the form below and we&apos;ll get back to you
                    shortly.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8 md:space-y-10"
                  >
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                      <div>
                        <label htmlFor="c-name" className="sr-only">
                          Name
                        </label>
                        <input
                          id="c-name"
                          type="text"
                          placeholder="Your Name"
                          aria-label="Your name"
                          required
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="c-email" className="sr-only">
                          Email
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          placeholder="Your Email"
                          aria-label="Your email"
                          required
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="c-topic"
                        className="text-xs font-medium text-violet-400 mb-2 block tracking-wide"
                      >
                        What is this about?
                      </label>
                      <div className="relative">
                        <select
                          id="c-topic"
                          value={form.topic}
                          onChange={(e) => updateField("topic", e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors appearance-none cursor-pointer"
                        >
                          <option className="bg-[#100A1C] text-white">
                            General Inquiry
                          </option>
                          <option className="bg-[#100A1C] text-white">
                            Volunteering
                          </option>
                          <option className="bg-[#100A1C] text-white">
                            Internship
                          </option>
                          <option className="bg-[#100A1C] text-white">
                            Partnership
                          </option>
                          <option className="bg-[#100A1C] text-white">
                            Donations
                          </option>
                          <option className="bg-[#100A1C] text-white">
                            Education Programs
                          </option>
                          <option className="bg-[#100A1C] text-white">
                            Parenting Programs
                          </option>
                          <option className="bg-[#100A1C] text-white">
                            Financial Reports
                          </option>
                        </select>
                        <div className="absolute right-0 bottom-3 pointer-events-none text-muted">
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
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        id="c-message"
                        placeholder="How can we help?"
                        aria-label="Your message"
                        required
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors resize-none h-20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full mt-4 sm:mt-6 py-3.5 sm:py-4 rounded-xl bg-violet-500 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {sending ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-4">
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-muted uppercase">
                        Your privacy matters to us.
                      </span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}