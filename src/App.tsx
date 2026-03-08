import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Anchor, Fish, MapPin, Compass, Phone, Sun, Moon, Beer, Smile, Ship, Coffee, HelpCircle, Utensils, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme Toggle
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  return { theme, toggleTheme };
};

// Accessible Button
const Button = ({ children, className, onClick, ariaLabel, variant = 'primary' }: { children: React.ReactNode, className?: string, onClick?: () => void, ariaLabel?: string, variant?: 'primary' | 'outline' | 'ghost' }) => {
  const variants = {
    primary: "bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:-translate-y-1",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-foreground hover:bg-muted"
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "relative rounded-full font-sans font-bold transition-all duration-300 ease-bounce-fun active:scale-95 focus-ring px-6 py-3",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

// Safe Image
const SafeImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn("bg-muted flex flex-col items-center justify-center text-foreground/50 italic", className)}>
        <Fish className="w-12 h-12 mb-2 opacity-50" />
        <span className="text-sm">Image Unavailable</span>
      </div>
    );
  }

  return (
    <img src={src} alt={alt} className={className} onError={() => setError(true)} loading="lazy" />
  );
};

// Navbar
const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50px',
        end: 99999,
        toggleClass: { className: 'shadow-md backdrop-blur-2xl', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} aria-label="Main Navigation" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[95%] max-w-7xl bg-overlay border border-foreground/10">
      <div className="font-heading font-bold text-xl tracking-tight shrink-0 flex items-center gap-2 text-primary">
        <Fish className="w-6 h-6" aria-hidden="true" />
        <span className="hidden lg:inline">JOE'S SALMON LODGE</span>
        <span className="lg:hidden">JOE'S</span>
      </div>
      <div className="hidden md:flex gap-6 font-sans text-sm font-semibold text-foreground">
        <a href="#lodge" className="hover:text-accent focus-ring transition-colors">THE LODGE</a>
        <a href="#fleet" className="hover:text-accent focus-ring transition-colors">THE FLEET</a>
        <a href="#gallery" className="hover:text-accent focus-ring transition-colors">GALLERY</a>
        <a href="#pricing" className="hover:text-accent focus-ring transition-colors">RATES & DATES</a>
        <a href="#faq" className="hover:text-accent focus-ring transition-colors">FAQ</a>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-muted text-foreground transition-colors focus-ring">
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        <a href="#pricing">
          <Button className="text-sm px-5 py-2 hidden sm:flex">Book Now</Button>
        </a>
      </div>
    </nav>
  );
};

// Hero
const Hero = () => {
  return (
    <header className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 z-0">
        <SafeImage src="./scraped_images/img_19_img_9032_2_edited_ed.jpg" alt="Hakai Pass Fishing" className="w-full h-full object-cover dark:opacity-40 opacity-90 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent dark:from-background dark:via-background/80" />
      </div>

      <div className="relative z-10 p-6 md:p-12 w-full max-w-6xl text-center flex flex-col items-center">
        <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold mb-6 flex items-center gap-2 transform rotate-2 animate-bounce">
          <Smile className="w-4 h-4" /> Welcome to Hakai Pass
        </div>
        <h1 className="flex flex-col mb-6 pointer-events-none">
          <span className="font-heading font-bold text-foreground text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight text-shadow-hero">
            Catch Fish.
          </span>
          <span className="font-heading font-black text-accent text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-shadow-hero transform -rotate-2">
            Have Fun.
          </span>
        </h1>
        <p className="font-sans text-foreground text-xl md:text-2xl max-w-3xl mb-10 leading-relaxed font-medium bg-background/50 backdrop-blur-sm p-4 rounded-2xl border border-foreground/10">
          Join Mike Matthews, Doug, Carl, and the crew for world-class salmon fishing, unforgettable west coast buffets, and legendary evenings ringing the bell at the bar.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#pricing"><Button className="text-lg px-8 py-4">Book the Adventure <ArrowRight className="w-5 h-5 inline-block" /></Button></a>
          <a href="#fleet"><Button variant="outline" className="text-lg px-8 py-4 bg-background/80 backdrop-blur-md">View the Fleet</Button></a>
        </div>
      </div>
    </header>
  );
};

// The Lodge Data Section
const TheLodge = () => {
  return (
    <section id="lodge" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4">The Lodge & Dining</h2>
        <p className="font-sans text-foreground/70 text-lg max-w-2xl mx-auto">Comfortable accommodations and legendary West Coast buffets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Accommodations */}
        <div className="space-y-8">
          <h3 className="font-heading font-bold text-3xl text-primary flex items-center gap-3"><Ship className="w-8 h-8 text-accent" /> Accommodations</h3>

          <div className="bg-card border border-foreground/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-sans font-bold text-xl mb-2 text-foreground">Main Barge Rooms</h4>
            <ul className="space-y-4 font-sans text-foreground/80">
              <li><strong className="text-primary">The Angler's Suite:</strong> 1-2 fishermen, 2 beds, private half-bath.</li>
              <li><strong className="text-primary">The Shoal Suite:</strong> 2-3 fishermen, 3 beds (single + bunk), private half-bath.</li>
              <li><span className="italic">Ammenities:</span> In-room heater, USB port, outlets, nature facing windows, complementary wifi.</li>
              <li><strong className="text-primary">Showers:</strong> 3 communal showers on the main level, cleaned daily.</li>
            </ul>
          </div>

          <div className="bg-card border border-foreground/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-sans font-bold text-xl mb-2 text-foreground">Small Barge (Large Groups)</h4>
            <p className="font-sans text-foreground/80 mb-4">Perfect for groups of 8-12 seeking a private area on the North side of the dock.</p>
            <ul className="space-y-2 font-sans text-foreground/80">
              <li><strong className="text-primary">Lounging Area:</strong> Couches, TV, non-alcoholic mini bar, snacks.</li>
              <li><strong className="text-primary">Bedrooms:</strong> 3 spacious rooms with two bunk beds each.</li>
              <li><strong className="text-primary">Bathrooms:</strong> 2 full private bathrooms.</li>
            </ul>
          </div>
        </div>

        {/* Dining */}
        <div className="space-y-8">
          <h3 className="font-heading font-bold text-3xl text-primary flex items-center gap-3"><Utensils className="w-8 h-8 text-accent" /> Food & Drink</h3>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mb-6">
            <SafeImage src="./scraped_images/img_16_dining_main_png.jpg" alt="Delicious buffet style food" className="w-full h-full object-cover" />
          </div>

          <div className="bg-card border border-foreground/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-sans font-bold text-xl mb-2 text-foreground">West Coast Buffet</h4>
            <p className="font-sans text-foreground/80 mb-4">
              Delicious buffet style breakfast, lunch, and dinner. All meals included with your stay. Prefer to fish? Fill out a sandwich form and we'll pack your lunch for the boat.
            </p>
          </div>

          <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md">
            <h4 className="font-sans font-bold text-xl mb-2 flex items-center gap-2"><Beer className="w-5 h-5" /> The Bar</h4>
            <p className="font-sans text-primary-foreground/90 mb-2">
              Alcohol is available for purchase at the bar (paid at checkout). Ring the bell and share your fishing stories!
            </p>
            <div className="bg-background/20 p-3 rounded-lg text-sm border-l-4 border-accent">
              <strong>Rules:</strong> Due to BC Liquor licensing, guests cannot bring outside alcohol. Must be purchased from Joe's.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// The Fleet Section
const TheFleet = () => {
  return (
    <section id="fleet" className="py-24 px-6 md:px-12 bg-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold inline-flex items-center gap-2">
              <Anchor className="w-4 h-4" /> 17' Boston Whalers
            </div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground">Ready for the Ocean</h2>
            <p className="font-sans text-foreground/80 text-lg leading-relaxed">
              Our 17 foot, 60 horsepower Boston Whalers are well-equipped to ensure your comfort and safety. Each person is assigned a boat number that matches their room number. At the end of the day, our crew completely restocks and fuels your boat for the next morning.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-background p-4 rounded-xl border border-foreground/5 shadow-sm">
                <strong className="block text-primary font-sans mb-1">Electronics & Safety</strong>
                <p className="text-sm text-foreground/70">Pre-programmed GPS, VHF Marine Radios, Lowrance Sounders, lifejackets, water ladder.</p>
              </div>
              <div className="bg-background p-4 rounded-xl border border-foreground/5 shadow-sm">
                <strong className="block text-primary font-sans mb-1">Fishing Gear</strong>
                <p className="text-sm text-foreground/70">Rods, reels, bait knives, coolers, bait box, hooks, measuring tape, and a bonker.</p>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl !mt-8">
              <strong className="block text-primary font-sans flex items-center gap-2 mb-2"><Info className="w-5 h-5" /> Important Requirements</strong>
              <p className="text-sm text-foreground/80">
                You must have a <strong>Boating License</strong> to operate the whalers. You also need a <strong>BC Recreational Fishing License</strong> (with a Pacific Salmon Stamp). You also must bring your own <strong>Rain Gear and Rain Boots</strong> as we no longer provide them.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <SafeImage src="./scraped_images/img_14_.jpg" alt="Boat on the water" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery Archive (Injecting real, scraped history)
const Gallery = () => {
  const images = [
    "./scraped_images/img_23_img_0207_jpg.jpg",
    "./scraped_images/img_31_.jpg",
    "./scraped_images/img_32_.jpg",
    "./scraped_images/img_20_.jpg",
    "./scraped_images/img_24_img_0129_jpg.jpg",
    "./scraped_images/img_26_.jpg",
    "./scraped_images/img_12_dji_0988_jpg.jpg",
    "./scraped_images/img_27_.jpg",
    "./scraped_images/img_28_.jpg",
    "./scraped_images/img_29_.jpg",
    "./scraped_images/img_30_.jpg",
    "./scraped_images/img_33_.jpg",
    "./scraped_images/img_4_.jpg",
    "./scraped_images/img_5_.jpg",
    "./scraped_images/img_8_.jpg",
    "./scraped_images/img_13_.jpg",
    "./scraped_images/img_15_.jpg",
    "./scraped_images/img_1_dsc00213_edited_jpg.jpg",
    "./scraped_images/img_2_.jpg",
    "./scraped_images/img_3_.jpg"
  ];

  return (
    <section id="gallery" className="py-24 bg-background overflow-hidden border-t border-b border-foreground/5">
      <div className="text-center mb-16 px-6">
        <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground">Hakai Pass Archive</h2>
        <p className="font-sans text-foreground/70 text-lg mt-4 max-w-2xl mx-auto">Decades of legendary moments, monster catches, and unmatched hospitality on the water.</p>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 px-4 w-full max-w-7xl mx-auto space-y-4">
        {images.map((img, i) => (
          <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-md bg-muted">
            <SafeImage src={img} alt={`Joe's Salmon Lodge History ${i}`} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Rates, Dates and Packages
const PricingAndDates = () => {
  const dates = {
    June: ["25th - 29th (Call/Email)", "29th - July 3rd (Call/Email)"],
    July: ["3rd - 7th (Call/Email)", "7th - 11th (Call/Email)", "11th - 15th (Call/Email)", "15th - 19th (Call/Email)", "19th - 23rd (Call/Email)", "23rd - 27th (SOLD OUT)", "27th - 31st (SOLD OUT)", "31st - Aug 4th (SOLD OUT)"],
    August: ["4th - 8th (SOLD OUT)", "8th - 12th (SOLD OUT)", "12th - 16th (SOLD OUT)", "16th - 20th (Call/Email)", "20th - 24th (Call/Email)", "24th - 28th (SOLD OUT)", "28th - Sept 1st (SOLD OUT)"],
    September: ["1st - 5th (SPECIAL EVENT)"]
  };

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-background flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="font-heading font-black text-5xl md:text-6xl text-foreground mb-6">Rates & 2026 Dates</h2>
        <p className="font-sans text-foreground/70 text-xl max-w-2xl mx-auto font-medium">Lock in your spot for the hardcore angler's dream.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mb-16">
        {/* 5 Day Trip */}
        <article className="bg-primary text-primary-foreground rounded-[2rem] p-10 shadow-2xl relative flex flex-col ring-4 ring-accent">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent text-accent-foreground px-6 py-2 text-sm font-sans font-black uppercase tracking-widest rounded-full shadow-lg">
            The Expedition
          </div>
          <h3 className="font-heading font-bold text-3xl mb-2">5-Day All-Inclusive</h3>
          <p className="font-sans text-primary-foreground/80 mb-6">Maximum fishing time from first light to sun down.</p>
          <div className="font-sans font-black text-5xl md:text-6xl mb-8 tracking-tighter">$3,700 <span className="text-2xl font-sans text-primary-foreground/60 font-medium tracking-normal">USD</span> <span className="text-xl font-sans text-primary-foreground/40 font-medium tracking-normal">($5000 CAD)</span></div>
          <ul className="space-y-4 mb-12 font-sans font-medium text-primary-foreground/90 flex-1">
            <li className="flex items-center gap-3"><Fish className="w-6 h-6 text-accent shrink-0" /> Unmatched fishing in Hakai Pass</li>
            <li className="flex items-center gap-3"><Coffee className="w-6 h-6 text-accent shrink-0" /> All meals served buffet style</li>
            <li className="flex items-center gap-3"><Sun className="w-6 h-6 text-accent shrink-0" /> Comfortable Lodge Accommodations</li>
            <li className="flex items-center gap-3"><Anchor className="w-6 h-6 text-accent shrink-0" /> Outfitted 17ft Boston Whaler included</li>
          </ul>
        </article>

        {/* Guided Pack */}
        <article className="bg-card rounded-[2rem] p-10 border-2 border-primary/20 shadow-xl flex flex-col">
          <h3 className="font-heading font-bold text-3xl text-foreground mb-2">Guided Fishing Add-On</h3>
          <p className="font-sans text-foreground/60 mb-6">Let our seasoned experts find the monster fish for you.</p>
          <div className="font-sans font-black text-6xl text-primary mb-8 tracking-tighter">$600 <span className="text-2xl font-sans text-foreground/40 font-medium">/ day</span></div>
          <ul className="space-y-4 mb-12 font-sans font-medium text-foreground/80 flex-1">
            <li className="flex items-center gap-3"><Anchor className="w-6 h-6 text-accent shrink-0" /> Master navigation of Hakai Pass</li>
            <li className="flex items-center gap-3"><Fish className="w-6 h-6 text-accent shrink-0" /> Hands-on instruction and gear management</li>
            <li className="flex items-center gap-3"><Smile className="w-6 h-6 text-accent shrink-0" /> Great company on the water</li>
          </ul>
        </article>
      </div>

      {/* Availability Calendar */}
      <div className="w-full max-w-6xl bg-muted rounded-[2rem] p-8 md:p-12 shadow-inner border border-foreground/10">
        <h3 className="font-heading font-black text-3xl text-primary mb-8 text-center flex items-center justify-center gap-3"><Compass className="w-8 h-8 text-accent" /> 2026 Season Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(dates).map(([month, specificDates]) => (
            <div key={month} className="space-y-4">
              <h4 className="font-sans font-bold text-xl text-foreground border-b-2 border-accent pb-2">{month}</h4>
              <ul className="space-y-2 font-sans text-sm">
                {specificDates.map((dateStr, idx) => {
                  const isSoldOut = dateStr.includes("SOLD OUT");
                  return (
                    <li key={idx} className={cn("p-2 rounded flex justify-between items-center", isSoldOut ? "bg-foreground/5 text-foreground/40 line-through decoration-red-500/50" : "bg-card shadow-sm border border-foreground/5 text-foreground")}>
                      <span>{dateStr.split('(')[0]}</span>
                      {!isSoldOut && <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-1 rounded">Open</span>}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="font-sans text-foreground/70 mb-4 font-medium">Dates are filling up fast. Call Mike to reserve your trip.</p>
          <a href="tel:1-503-816-4281"><Button className="text-xl">Call 1-503-816-4281 to Book</Button></a>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    { q: "What do I need to bring on my trip to Joe's?", a: "Tidal waters sport fishing license, Pacific Salmon Stamp, and your boating license. Sunscreen, glasses/sunglasses, toiletries, medications, AND your own personal rain gear and boots (we do not supply rain gear)." },
    { q: "When do I need to be at the airport?", a: "All flights leave from the SOUTH TERMINAL at 4pm PST and return at 8pm. Check-in is 2 hours prior to departure. (4440 CROWLEY CRESCENT, RICHMOND BC)" },
    { q: "How many fish can I bring back?", a: "Salmon limits: 4 per day, Possession total 8 (max 2 per day/4 per trip Chinook). Ling Cod: 2 per day/4 total. Rock Fish: 5 per day/10 total." },
    { q: "How do I get the fish home?", a: "Your fish will be cleaned, vacuum-sealed, frozen and boxed (max 50lbs per box). Canned, candied, or smoked options available via St. Jean's Cannery." },
    { q: "What documents do I need to enter Canada?", a: "A current passport valid for 6 months post-arrival. Note: Canada classifies DUI/DWI as a felony which could cause denial of entry at the border." }
  ];

  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-muted/50 border-t border-foreground/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading font-black text-4xl text-center mb-12 flex items-center justify-center gap-3"><HelpCircle className="w-10 h-10 text-accent" /> Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-card border border-foreground/10 rounded-xl p-6 group shadow-sm open:shadow-md transition-shadow">
              <summary className="font-sans font-bold text-lg text-foreground cursor-pointer list-none flex justify-between items-center outline-none focus-ring rounded-md">
                {faq.q}
                <span className="text-accent group-open:-rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 font-sans text-foreground/80 leading-relaxed border-l-4 border-primary pl-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-card border-t border-foreground/10 text-foreground px-6 py-20 md:px-12 relative overflow-hidden" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Fish className="w-8 h-8" />
            <h2 className="font-heading text-3xl font-black tracking-tight">JOE'S SALMON LODGE</h2>
          </div>
          <p className="font-sans text-foreground/70 max-w-md font-medium text-lg">Incredible fishing, comfortable accommodations, and the best hospitality on the central coast of British Columbia.</p>

          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 inline-block font-sans">
            <strong className="block text-primary text-xl mb-1">Owner & Operator</strong>
            <span className="text-foreground font-bold text-lg block">Mike Matthews</span>
            <a href="mailto:mike.matthews@joessalmonlodge.com" className="text-accent hover:underline block mb-1">mike.matthews@joessalmonlodge.com</a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-heading font-bold text-2xl text-primary">Experience</h4>
          <ul className="space-y-3 font-sans text-base font-medium text-foreground/70">
            <li><a href="#lodge" className="hover:text-accent focus-ring outline-none transition-colors">The Lodge</a></li>
            <li><a href="#fleet" className="hover:text-accent focus-ring outline-none transition-colors">The Fleet</a></li>
            <li><a href="#pricing" className="hover:text-accent focus-ring outline-none transition-colors">Rates & Packages</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-heading font-bold text-2xl text-primary">Contact</h4>
          <address className="space-y-3 font-sans text-base font-medium text-foreground/70 not-italic">
            <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-accent" /> Hakai Pass, BC</div>
            <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-accent" /> <a href="tel:1-503-816-4281" className="hover:text-accent focus-ring outline-none font-black text-foreground">1-503-816-4281</a></div>
            <br />
            <a href="#faq" className="block hover:text-accent focus-ring outline-none transition-colors">FAQ</a>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-foreground/10 text-center text-sm font-sans text-foreground/50 font-medium">
        © {new Date().getFullYear()} Joe's Salmon Lodge. Designed for the ultimate fishing experience.
      </div>
    </footer>
  );
};

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full min-h-screen selection:bg-accent selection:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TheLodge />
        <TheFleet />
        <Gallery />
        <PricingAndDates />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
