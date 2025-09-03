import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Rentals() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      mirror: true,
      easing: 'ease-in-out'
    });
  }, []);

  const slides = [
    {
      image: "/images/Idhar Udhar Car 6.png",
      title: "Idhar Udhar Rentals",
      subtitle: "Flexible vehicle rentals by the hour, day, or week for all your travel needs",
      bgColor: "from-green-600/80 to-green-800/80"
    },
    {
      image: "/images/Idhar Udhar Car 3.png",
      title: "Premium Trips",
      subtitle: "Experience luxury on wheels",
      bgColor: "from-blue-600/80 to-blue-800/80"
    },
    {
      image: "/images/Idhar Udhar Car 1.png",
      title: "24/7 Service",
      subtitle: "Your trusted trip partner anytime, anywhere",
      bgColor: "from-purple-600/80 to-purple-800/80"
    }
  ];


  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Flexible Duration",
      desc: "Rent by the hour, day, or week with easy extensions and early returns",
      iconPath: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </>
      ),
    },
    {
      title: "Diverse Fleet",
      desc: "Choose from cars, SUVs, luxury vehicles, and more to suit your specific needs",
      iconPath: (
        <path d="M5 16l1.5-4.5h11L19 16M3 16v2a1 1 0 0 0 1 1h1a2 2 0 1 0 4 0h6a2 2 0 1 0 4 0h1a1 1 0 0 0 1-1v-2M6.5 9l1.5-4h8l1.5 4" />
      ),
    },
    {
      title: "Fully Insured",
      desc: "All rentals come with comprehensive insurance coverage for peace of mind",
      iconPath: (
        <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
      ),
    },
  ];

  const packages = [
    {
      title: "Hourly Rental",
      price: "₹149",
      unit: "/hour",
      subtext: "Minimum 4 hours",
      features: [
        "Perfect for short trips",
        "Fuel included",
        "Unlimited km within city",
      ],
      badge: "",
    },
    {
      title: "Daily Rental",
      price: "₹1,299",
      unit: "/day",
      subtext: "24-hour period",
      features: [
        "Ideal for day trips",
        "300 km included",
        "Free delivery & pickup",
      ],
      badge: "POPULAR",
    },
    {
      title: "Weekly Rental",
      price: "₹6,999",
      unit: "/week",
      subtext: "7-day period",
      features: [
        "Perfect for long trips",
        "1500 km included",
        "24/7 roadside assistance",
      ],
      badge: "",
    },
  ];

  return (
    <div className="relative overflow-hidden">

      {/* Hero Slider */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-green-700 to-green-900 text-white overflow-hidden flex items-center py-10 px-4 sm:px-6 lg:px-12">
        {/* Sea Wave Animation Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="ocean">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`wave wave${i + 1}`}></div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-700/40 to-green-900/40"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full h-full gap-10 relative z-20 mt-10">
          {/* Left Content */}
          <div className="w-full lg:w-[40%] relative z-20 flex items-center justify-center min-h-[300px] rounded-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-full transition-all duration-1000 ease-in-out ${index === currentSlide
                  ? 'opacity-100 scale-100 absolute'
                  : 'opacity-0 scale-95 pointer-events-none absolute'
                  } px-2 sm:px-6 flex flex-col items-center lg:items-start text-center lg:text-left`}
              >
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 leading-tight transition text-white ">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg lg:text-xl mb-5 transition duration-1000 delay-200 text-gray-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition duration-1000 delay-400 min-w-[280px] sm:min-w-[320px]">
                  <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.03] ease-in-out transform hover:bg-gray-100 hover:shadow-xl whitespace-nowrap w-full sm:w-auto">
                    Rent a Vehicle
                  </button>
                  <Link to="/safety" className="w-full sm:w-auto">
                    <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.03] ease-in-out transform hover:bg-green-700 hover:shadow-xl whitespace-nowrap w-full">
                      Learn About Safety
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Slider */}
          <div className="w-full lg:w-[60%] h-[40vh] sm:h-[50vh] md:h-[70vh] relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 flex items-center justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/50 z-10 rounded-2xl" />
              </div>
            ))}

          </div>
        </div>

        {/* Wave CSS */}
        <style jsx>{`
        .ocean {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: linear-gradient(to bottom, #166534, rgb(1, 136, 52));
        }
        .wave {
          position: absolute;
          width: 200%;
          height: 100%;
          background: linear-gradient(45deg, rgba(13, 50, 27, 0.6), rgba(20, 83, 45, 0.3));
          border-radius: 50%;
          transform-origin: 50% 50%;
        }
        .wave1 { animation: wave1 8s linear infinite; z-index: 1; opacity: 0.9; top: 0; left: -50%; }
        .wave2 { animation: wave2 12s linear infinite; z-index: 2; opacity: 0.8; top: 20%; left: -45%; animation-delay: -2s; }
        .wave3 { animation: wave3 15s linear infinite; z-index: 3; opacity: 0.7; top: 40%; left: -55%; animation-delay: -4s; }
        .wave4 { animation: wave4 10s linear infinite; z-index: 4; opacity: 0.6; top: 60%; left: -40%; animation-delay: -6s; }
        .wave5 { animation: wave5 18s linear infinite; z-index: 5; opacity: 0.5; top: 80%; left: -60%; animation-delay: -3s; }
        .wave6 { animation: wave6 14s linear infinite; z-index: 6; opacity: 0.4; top: 90%; left: -50%; animation-delay: -5s; }

        @keyframes wave1 { 0%, 100% { transform: translateX(0) scaleY(1); } 50% { transform: translateX(-25%) scaleY(0.8); } }
        @keyframes wave2 { 0%, 100% { transform: translateX(0) scaleY(1); } 50% { transform: translateX(-25%) scaleY(0.8); } }
        @keyframes wave3 { 0%, 100% { transform: translateX(0) scaleY(1); } 50% { transform: translateX(-25%) scaleY(0.8); } }
        @keyframes wave4 { 0%, 100% { transform: translateX(0) scaleY(1); } 50% { transform: translateX(-25%) scaleY(0.8); } }
        @keyframes wave5 { 0%, 100% { transform: translateX(0) scaleY(1); } 50% { transform: translateX(-25%) scaleY(0.8); } }
        @keyframes wave6 { 0%, 100% { transform: translateX(0) scaleY(1); } 50% { transform: translateX(-25%) scaleY(0.8); } }
      `}</style>
      </section>

      {/* Why Choose GreenCar */}
      <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold text-green-600 mb-4"
            whileHover={{
              color: "#16a34a",
              transition: { ease: "easeInOut" },
            }}
            data-aos="fade-up"
            data-aos-easing="ease-in-out"
          >
            Why Choose Idhar Udhar Rentals?
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10"
            data-aos-easing="ease-in-out"
          >
            The most convenient and flexible way to rent vehicles for any
            duration with no hidden fees
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
                  transition: { duration: 0.1, ease: "easeOut" },
                }}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-left transition-all duration-300 hover:scale-[1.01] ease-in-out transform"
                data-aos="fade-up"
                data-aos-easing="ease-in-out"
              >
                <div className="mb-4 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {item.iconPath}
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* 3d */}
      <section className="py-16 px-4 sm:px-8">
        <div
          className="max-w-6xl mx-auto text-center"
          data-aos="zoom-in"
          data-aos-easing="ease-in-out"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-green-600"
          >
            Choose Your Rental Package
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 mt-2 text-base"
          >
            We offer a variety of rental options to fit your specific needs and
            budget
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mx-auto">
            {packages.map((plan, index) => (
              <motion.div
                key={index}
                className="relative border border-gray-300 dark:border-gray-600 rounded-lg shadow-md bg-white dark:bg-gray-900 transition-all duration-300"
                data-aos="fade-up"
                data-aos-easing="ease-in-out"
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-b rounded-tr shadow">
                    {plan.badge}
                  </div>
                )}

                <div className="bg-green-600 text-white py-3 rounded-t-lg text-center">
                  <motion.h3 className="text-lg font-semibold">
                    {plan.title}
                  </motion.h3>
                </div>

                <div className="py-6 text-center">
                  <motion.h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                    <span className="text-sm font-light">{plan.unit}</span>
                  </motion.h2>
                  <motion.p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                    {plan.subtext}
                  </motion.p>

                  <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-200 text-sm text-left px-6">
                    {plan.features.map((feature, fIndex) => (
                      <motion.p key={fIndex}>
                        <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-4 shadow-[0_0_8px_0.2px_#bbf7d0]" />
                        {feature}
                      </motion.p>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <Link to="/Book_ride">
                    <motion.button
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded hover:scale-102"
                    >
                      Book Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
        <section className="bg-[#166534] rounded-2xl text-white py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto transition-all duration-700 ease-in-out ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Text */}
            <div data-aos="zoom-in" className="space-y-5 text-center md:text-left">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
                whileHover={{
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
              >
                Need a Vehicle for Longer?
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-white/90 leading-relaxed"
                whileHover={{
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
              >
                Contact our team for special monthly rates and corporate fleet
                solutions. Custom packages available.
              </motion.p>

              <div className="pt-3">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium h-11 px-8 rounded-md bg-white text-green-700 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Rent Now
                </Link>
                
              </div>

              
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end" data-aos="zoom-in">
              <motion.img
                whileHover={{
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                className="w-full h-auto rounded-lg shadow-lg transition-all duration-700 ease-in-out hover:shadow-xl hover:shadow-green-500/20"
                src="/images/Rentals2.png"

                alt="GreenCar App"
              />
            </div>
          </div>
        </section>
      </div>


    </div>
  );
}
