import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Anchor, Fish, MapPin, Compass, Phone, Sun, Moon, Beer, Smile, Ship, Coffee, HelpCircle, Utensils, FileText } from 'lucide-react';
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
        <img src="./logo.svg" alt="Joe's Salmon Lodge Logo" className="w-8 h-8 object-contain" aria-hidden="true" />
        <span className="hidden lg:inline">JOE'S SALMON LODGE</span>
        <span className="lg:hidden">JOE'S</span>
      </div>
      <div className="hidden md:flex gap-6 font-sans text-sm font-semibold text-foreground">
        <a href="#about" className="hover:text-accent focus-ring transition-colors">ABOUT</a>
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
          Join Mike Matthews and the crew for world-class salmon fishing, unforgettable west coast buffets, and legendary evenings ringing the bell at the bar.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#pricing"><Button className="text-lg px-8 py-4">Book the Adventure <ArrowRight className="w-5 h-5 inline-block" /></Button></a>
          <a href="#fleet"><Button variant="outline" className="text-lg px-8 py-4 bg-background/80 backdrop-blur-md">View the Fleet</Button></a>
        </div>
      </div>
    </header>
  );
};

// About Section
const AboutLodge = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-muted relative overflow-hidden border-b border-foreground/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold inline-flex items-center gap-2 mb-6">
            <Fish className="w-4 h-4" /> Since 1985
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-6">Experience cut plug fishing at its finest!</h2>
          <p className="font-sans text-foreground/80 text-xl max-w-4xl mx-auto leading-relaxed mb-6">
            Come have the time of your life while catching salmon, halibut, ling cod and more in beautiful Hakai Pass located on the central coast of British Columbia. Explore the stunning fishing destinations where the abundance of diverse marine life awaits. With breathtaking coastal views, our fishing locations offer an unparalleled experience for anglers of all levels. South of Bella Bella, Hakai Pass is famous for its scenic waterways and large abundance of sport fishing opportunities.
          </p>
          <p className="font-sans text-primary font-bold text-xl max-w-3xl mx-auto leading-relaxed">
            Joe's Salmon Lodge has been in operation since 1985 with a simple mission... Provide anglers with an incredible fishing experience both on and off the water. We invite you to experience Joe's for yourself and create memories that will last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl overflow-hidden shadow-xl h-64 md:h-80">
            <SafeImage src="./scraped_images/img_30_.jpg" alt="Hakai Pass View" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl h-64 md:h-80 md:-translate-y-8">
            <SafeImage src="./scraped_images/C7F628CD-B4D7-4F0E-855D-B7F17822B14C.JPG" alt="Holding up a massive catch" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl h-64 md:h-80">
            <SafeImage src="./scraped_images/92707773-460B-4168-A7BD-B5AD91CFF5EA.JPG" alt="Relaxing at the lodge" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Only at Joe's Video Section
const OnlyAtJoes = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-background border-b border-foreground/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground relative inline-block mb-4">
            Only at Joe's
            <div className="absolute -bottom-4 left-0 flex items-center gap-1 text-foreground/30">
              <Fish className="w-8 h-8 opacity-50 transform rotate-12" />
              <div className="h-px w-24 bg-foreground/20"></div>
            </div>
          </h2>
          <div>
            <p className="font-sans text-foreground/80 text-xl leading-relaxed mt-4">
              Discover the ultimate fishing experience at Joe's Salmon Lodge. Our expert guides and top-notch equipment ensure an incredible adventure on the waters of central coast British Columbia.
            </p>
          </div>
          <div className="pt-4">
            <a href="#lodge" className="inline-block">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 shadow-lg shadow-accent/20">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        <div className="flex-1 w-full rounded-3xl overflow-hidden shadow-2xl relative aspect-video bg-muted border-4 border-foreground/5">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/mmSCcI9jFps?si=qfOqVlV0-yU_1lJt"
            title="What to expect at Joe's"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </section>
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
              We know that you want to get out and enjoy the waters as much as possible. That’s why we offer our guests a delicious, west coast style buffet for breakfast, lunch, and dinner.
            </p>
            <p className="font-sans text-foreground/80 mb-4">
              Prefer to take your lunch on the water? We've got you covered! Fill out a sandwich form and your lunch will be packed and ready for you in the morning. All meals are included with your stay. <span className="font-bold text-accent">Please let us know if you have any dietary restrictions when you book your trip.</span>
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
            <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground">Boats & Licensing</h2>
            <p className="font-sans text-primary font-bold text-xl leading-relaxed">
              Get ready to kick ass in Hakai Pass with our 17 foot, 60 horsepower Boston Whalers.
            </p>
            <p className="font-sans text-foreground/80 text-lg leading-relaxed mb-6">
              Our fleet of well-equipped boats is ready to take you on an unforgettable fishing journey. Each vessel is designed to ensure your comfort and safety throughout your fishing expedition. At the end of each fishing day our crew will restock your boat with all of the equipment and bait needed for the following action packed day of fishing.
            </p>

            <div className="space-y-6 pt-2">
              <div className="bg-background p-6 rounded-2xl border border-foreground/5 shadow-md hover:shadow-lg transition-shadow">
                <strong className="block text-primary font-heading text-xl mb-3 flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-accent" /> Stocked & Serviced
                </strong>
                <p className="font-sans text-foreground/80 leading-relaxed text-sm lg:text-base">
                  Every boat comes complete with a pre-programmed GPS, Marine Radios (VHF), up to date Lowrance Sounders, and safety equipment (lifejackets, water ladder). Fishing equipment includes Rod, reel, pliers, bait knives, salt, coolers, bait box, tackle box with measuring tape, salmon/halibut beads and hooks, and a bonker.
                </p>
              </div>

              <div className="bg-background p-6 rounded-2xl border border-foreground/5 shadow-md hover:shadow-lg transition-shadow">
                <strong className="block text-primary font-heading text-xl mb-3 flex items-center gap-2">
                  <Ship className="w-5 h-5 text-accent" /> Boat Assignments
                </strong>
                <p className="font-sans text-foreground/80 leading-relaxed text-sm lg:text-base mb-4">
                  At Joe’s, we like to keep things simple. Our boat assignment runs off that same philosophy. Each person will be assigned a number at the beginning of their trip. That number is your room and boat number.
                </p>
                <p className="font-sans text-foreground/80 leading-relaxed text-sm lg:text-base">
                  If you’re in room 4, your boat will be #4. Your name will also be written under #4 on our fishing board to ensure that you can track your catches. It doesn’t matter if you decide to fish in another buddy’s boat, your number is your number. We do not change those numbers.
                </p>
              </div>

              <div className="bg-primary p-6 rounded-2xl shadow-xl text-primary-foreground border-t-4 border-accent">
                <strong className="block font-heading text-xl mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Licensing
                </strong>
                <p className="font-sans text-primary-foreground/90 leading-relaxed text-sm lg:text-base mb-6">
                  At Joe’s we do not allow fishermen to fish without their boat and fishing licenses. Please click the links down below to purchase a fishing and boat license. When purchasing a BC Recreational Fishing License, please purchase a salmon tag in addition to your license.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://recfish-pechesportive.dfo-mpo.gc.ca/nrls-sndpp/index-eng.cfm" target="_blank" rel="noreferrer" className="inline-block bg-white text-primary px-5 py-3 rounded-xl font-bold text-sm shadow hover:-translate-y-1 transition duration-300">
                    Recreational Fishing License
                  </a>
                  <a href="https://tc.canada.ca/en/marine-transportation/vessel-safety/pleasure-craft-safety" target="_blank" rel="noreferrer" className="inline-block bg-white text-primary px-5 py-3 rounded-xl font-bold text-sm shadow hover:-translate-y-1 transition duration-300">
                    Boating License
                  </a>
                </div>
              </div>
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
    "./scraped_images/2916F1B6-32EA-46A1-A827-49FCDD8C1DF4.JPG",
    "./scraped_images/img_31_.jpg",
    "./scraped_images/img_32_.jpg",
    "./scraped_images/img_20_.jpg",
    "./scraped_images/45347F94-794A-48CB-9461-F3CAF3E3E1C2.JPG",
    "./scraped_images/img_26_.jpg",
    "./scraped_images/4EC8B3ED-E004-4C84-9EBA-77B3217F6411.JPG",
    "./scraped_images/img_27_.jpg",
    "./scraped_images/img_28_.jpg",
    "./scraped_images/img_29_.jpg",
    "./scraped_images/img_30_.jpg",
    "./scraped_images/7CB2D607-1471-4ADD-A8FE-0997D76EDF6A.JPG",
    "./scraped_images/img_33_.jpg",
    "./scraped_images/img_4_.jpg",
    "./scraped_images/img_5_.jpg",
    "./scraped_images/92707773-460B-4168-A7BD-B5AD91CFF5EA.JPG",
    "./scraped_images/img_15_.jpg",
    "./scraped_images/9D7E69AB-5264-4638-AB1B-634FC02DE00D.JPG",
    "./scraped_images/img_2_.jpg",
    "./scraped_images/img_3_.jpg",
    ...Array.from({ length: 32 }, (_, i) => `./scraped_images/about_gallery/about_img_${i}.jpg`)
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

// Google Calendar Dynamic Booking Integration
// Instructions for Mike: 
// 1. Open Google Calendar on desktop -> Settings -> "Integrate Calendar"
// 2. Make sure the calendar is set to "Make available to public"
// 3. Paste the Calendar ID below (usually an email or string ending in @group.calendar.google.com)
const GOOGLE_CALENDAR_ID = "joessalmonlodge@gmail.com";

// Rates, Dates and Packages
const PricingAndDates = () => {
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

      {/* Live Google Calendar Embed */}
      <div className="w-full max-w-6xl bg-muted rounded-[2rem] p-8 md:p-12 shadow-inner border border-foreground/10">
        <h3 className="font-heading font-black text-3xl text-primary mb-8 text-center flex items-center justify-center gap-3"><Compass className="w-8 h-8 text-accent" /> Live 2026 Availability</h3>

        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-foreground/10 bg-white">
          <iframe
            src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FVancouver&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&src=${encodeURIComponent(GOOGLE_CALENDAR_ID)}&color=%23039BE5`}
            style={{ width: "100%", height: "100%", border: "none" }}
            frameBorder="0"
            scrolling="no"
            title="Joe's Salmon Lodge Live Availability"
          ></iframe>
        </div>

        <div className="mt-12 text-center">
          <p className="font-sans text-foreground/70 mb-4 font-medium">Dates are filling up fast. Check the calendar above, then call Mike to reserve your trip.</p>
          <a href="tel:1-503-816-4281"><Button className="text-xl shadow-xl hover:shadow-2xl">Call 1-503-816-4281 to Book</Button></a>
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
            <img src="./logo.svg" alt="Joe's Salmon Lodge Logo" className="w-10 h-10 object-contain" />
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
            <li><a href="#about" className="hover:text-accent focus-ring outline-none transition-colors">About Us</a></li>
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
        <AboutLodge />
        <OnlyAtJoes />
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
