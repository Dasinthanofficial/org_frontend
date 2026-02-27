import React, { useState } from "react";

export default function BuyMeCoffee() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  const bmcLink = "https://buymeacoffee.com/action4bl";

  const handleSupport = () => {
    // Redirect to the official BMC page to process the actual donation securely
    window.open(bmcLink, "_blank");
  };

  const handleAmountClick = (val) => {
    setAmount(val);
  };

  return (
    <>
      {/* ===== FLOATING TRIGGER BUTTON ===== */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 active:scale-95
          ${isOpen ? "bg-[#FF813F] rotate-0" : "bg-[#FF813F] hover:shadow-orange-500/30"}`}
        aria-label="Support Us"
      >
        {isOpen ? (
          // Chevron Down Icon (when open)
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          // Coffee Cup Icon (when closed)
          <svg className="w-7 h-7 text-white animate-wiggle" viewBox="0 0 24 24" fill="currentColor">
             <path d="M20.2 12.87c.1-.47.16-.94.16-1.42 0-3.87-3.13-7-7-7S6.36 7.58 6.36 11.45c0 .48.06.95.16 1.42C3.69 13.78 2 16.29 2 19c0 .55.45 1 1 1h18c.55 0 1-.45 1-1 0-2.71-1.69-5.22-4.52-6.13zM13.5 17h-3v-2h3v2zm-3-3.5v-2h3v2h-3z" />
             <path d="M19 3H5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 4H5V5h14v2z" opacity=".3"/>
          </svg>
        )}
      </button>

      {/* ===== WIDGET POPUP ===== */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[380px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden font-sans animate-fade-in-up">
          
          {/* SCROLLABLE CONTENT AREA */}
          <div className="overflow-y-auto p-6 scrollbar-hide">
            
            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Support ABL
            </h2>

            {/* Amount Input */}
            <div className="relative mb-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-gray-100/80 border-none rounded-xl py-4 pl-8 pr-28 text-gray-900 placeholder-gray-500 font-medium focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                {[10, 25, 50].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAmountClick(val)}
                    className="px-2 py-1 bg-white rounded-md text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-100 transition-colors"
                  >
                    +{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name or @yoursocial"
                className="w-full bg-gray-100/80 border-none rounded-xl p-4 text-gray-900 placeholder-gray-500 text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>

            {/* Message Input */}
            <div className="relative mb-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice..."
                rows="3"
                className="w-full bg-gray-100/80 border-none rounded-xl p-4 text-gray-900 placeholder-gray-500 text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
              ></textarea>
              {/* Smiley Icon placeholder */}
              <div className="absolute bottom-3 right-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>

            {/* Monthly Checkbox */}
            <label className="flex items-center gap-2 mb-6 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={isMonthly}
                  onChange={() => setIsMonthly(!isMonthly)}
                  className="peer sr-only" 
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#FF813F] peer-checked:border-[#FF813F] transition-all"></div>
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-sm text-gray-600">Make this monthly</span>
            </label>

            {/* Support Button */}
            <button
              onClick={handleSupport}
              className="w-full bg-[#FF813F] hover:bg-[#F5712F] text-white font-bold py-3.5 rounded-full shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
            >
              Support
            </button>
            
          </div>

          {/* Footer Link */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
            <a 
              href={bmcLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-200/50 hover:bg-gray-200 rounded-full transition-colors"
            >
              <div className="w-4 h-4">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M20.2 12.87c.1-.47.16-.94.16-1.42 0-3.87-3.13-7-7-7S6.36 7.58 6.36 11.45c0 .48.06.95.16 1.42C3.69 13.78 2 16.29 2 19c0 .55.45 1 1 1h18c.55 0 1-.45 1-1 0-2.71-1.69-5.22-4.52-6.13zM13.5 17h-3v-2h3v2zm-3-3.5v-2h3v2h-3z" /></svg>
              </div>
              <span className="text-xs font-bold text-gray-600">buymeacoffee.com/action4bl</span>
            </a>
          </div>

        </div>
      )}
    </>
  );
}