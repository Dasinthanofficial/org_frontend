import React, { useState } from "react";
import Container from "../components/Container.jsx";

function ContactBlock({ icon, title, desc, sub, href }) {
  const Wrapper = href ? "a" : "div";
  return (
    <div className="flex items-start gap-3 sm:gap-5 group">
      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-panel border border-border flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition duration-300 shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-bold text-text mb-1">{title}</h3>
        <Wrapper href={href} className={href ? "hover:text-primary transition-colors block" : ""}>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-line">{desc}</p>
        </Wrapper>
        {sub && <p className="text-xs text-primary/70 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "General Inquiry", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function updateField(key, value) { setForm((prev) => ({ ...prev, [key]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setSending(false);
  }

  return (
    <div className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden bg-bg0 text-text transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-start max-w-7xl mx-auto">
          {/* LEFT */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-serif font-bold tracking-tight text-text leading-none">
              Get in <span className="text-primary italic font-light pr-1">Touch</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-muted text-sm md:text-base max-w-md leading-relaxed">Whether you want to volunteer, partner, donate, or learn more about our work.</p>

            <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
              <ContactBlock
                icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>}
                title="Visit Us"
                desc={"39, Vivekananthanagar West,\nKilinochchi, Sri Lanka"}
              />
              <ContactBlock
                icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>}
                title="Email Us"
                desc="info@action4bl.com"
                sub="We usually reply within 48 hours."
                href="mailto:info@action4bl.com"
              />
              <ContactBlock
                icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>}
                title="Call Us"
                desc="+94 77 886 6819"
               sub="Mon—Fri, 8:30am to 5:30pm"
                href="tel:+94778866819"
              />
            </div>
          </div>

          {/* RIGHT â€” FORM */}
          <div className="relative mt-2 lg:mt-0">
            <div className="glass bg-panel/90 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 md:p-12 relative border border-border shadow-2xl">
              {sent ? (
                <div className="text-center py-10 sm:py-16">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-text">Thank You!</h2>
                  <p className="mt-3 text-sm text-muted max-w-xs mx-auto">We've received your message.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", topic: "General Inquiry", message: "" }); }} className="mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 rounded-full border border-border text-[10px] font-bold tracking-widest uppercase text-text hover:bg-bg1 transition">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text">Talk to <span className="text-primary italic font-light pr-1">Us</span></h2>
                  <form onSubmit={handleSubmit} className="mt-6 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8 md:space-y-10">
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                      <div>
                        <label className="sr-only">Name</label>
                        <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full bg-transparent border-b border-border pb-3 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div>
                        <label className="sr-only">Email</label>
                        <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full bg-transparent border-b border-border pb-3 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-primary transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-primary mb-2 block tracking-wide">What is this about?</label>
                      <select value={form.topic} onChange={(e) => updateField("topic", e.target.value)} className="w-full bg-transparent border-b border-border pb-3 text-sm text-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                        {["General Inquiry", "Volunteering", "Internship", "Partnership", "Donations"].map(opt => (
                          <option key={opt} className="bg-panel text-text">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="sr-only">Message</label>
                      <textarea placeholder="How can we help?" required value={form.message} onChange={(e) => updateField("message", e.target.value)} className="w-full bg-transparent border-b border-border pb-3 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-primary transition-colors resize-none h-20" />
                    </div>
                    <button type="submit" disabled={sending} className="w-full mt-4 sm:mt-6 py-3.5 sm:py-4 rounded-xl bg-primary text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg">
                      {sending ? "Sending..." : "SEND MESSAGE"}
                    </button>
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