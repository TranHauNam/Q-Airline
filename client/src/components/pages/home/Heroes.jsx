import { useRef, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { MdFlightTakeoff } from "react-icons/md";

const SECTION_HEIGHT = 1500;

export const Heroes = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollRef} className="bg-gradient-to-b from-white to-gray-100">
      {/* <FloatingNav /> */}
      <HeroSection />
      <FlightSchedule />
    </div>
  );
};

const FloatingNav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3">
      <MdFlightTakeoff className="text-3xl text-red-600" />
      <button
        onClick={() => {
          document.getElementById("flight-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 transition-colors"
      >
        FLIGHT SCHEDULE <FiArrowRight />
      </button>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-gray-100" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2670"
        alt="Airplane view"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?q=80&w=2674"
        alt="Travel destination"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2670"
        alt="Luxury travel"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2670"
        alt="Airport terminal"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} rounded-lg shadow-lg`}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const FlightSchedule = () => {
  return (
    <section
      id="flight-schedule"
      className="mx-auto max-w-5xl px-4 py-48"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-gray-800"
      >
        Popular Flights
      </motion.h1>
      <FlightItem 
        title="Delhi → London" 
        date="Daily Flights" 
        location="Terminal 3" 
      />
      <FlightItem 
        title="Mumbai → Dubai" 
        date="Twice Daily" 
        location="Terminal 2" 
      />
      <FlightItem 
        title="Bangalore → Singapore" 
        date="Every Mon, Wed, Fri" 
        location="Terminal 1" 
      />
      <FlightItem 
        title="Chennai → Paris" 
        date="Every Tue, Thu, Sat" 
        location="Terminal 3" 
      />
    </section>
  );
};

const FlightItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-gray-200 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-gray-800">{title}</p>
        <p className="text-sm uppercase text-gray-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-gray-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

export default Heroes; 