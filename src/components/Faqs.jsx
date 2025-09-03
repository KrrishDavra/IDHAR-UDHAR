import React, { useState } from 'react';
import { IndianRupee, Headphones, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultFaqs = [
    {
        question: 'What Makes A Good Taxi Service?',
        answer: 'A good taxi service is reliable, safe, clean, and provides good customer support.',
    },
    {
        question: 'What Is The Purpose Of A Taxi Service?',
        answer: 'To provide convenient and on-demand transportation for passengers.',
    },
    {
        question: 'How To Download The IdharUdhar Taxi App Online?',
        answer: 'Visit the Play Store or App Store and search for "IdharUdhar Taxi". Download and install the app.',
    },
    {
        question: 'What Should I Be Asking For First Trip?',
        answer: 'Ask about safety procedures, estimated cost, and rider credentials.',
    },
    {
        question: 'How Many Cars Does IdharUdhar Taxi Service Have?',
        answer: 'The fleet size depends on the city. You can check the app for real-time availability.',
    },
    {
        question: 'Are the riders background checked?',
        answer: 'Yes, all riders go through a thorough background verification process.',
    },
    {
        question: 'Can I pay by cash or card?',
        answer: 'You can pay both by cash or online payment methods through the app.',
    },
    {
        question: 'What is the cancellation policy?',
        answer: 'You can cancel a trip within 5 minutes without any charge.',
    },
    {
        question: 'Is there a loyalty or rewards program?',
        answer: 'Yes, frequent rs get reward points redeemable for discounts.',
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can contact support via the app or the 24/7 helpline number.',
    },
];

const allFaqs = {
    // bike: [
    //     {
    //         question: 'What safety measures are in place for bike trips?',
    //         answer: 'All riders must wear helmets and follow traffic rules strictly.',
    //     },
    //     {
    //         question: 'Can I choose the type of bike?',
    //         answer: 'Currently, the app assigns the nearest available bike automatically.',
    //     },
    //     {
    //         question: 'Are helmets provided with bike trips?',
    //         answer: 'Yes, helmets are provided and must be worn for your safety.',
    //     },
    //     {
    //         question: 'Can I carry luggage on the bike trip?',
    //         answer: 'Limited small luggage can be carried; large bags are not recommended.',
    //     },
    //     {
    //         question: 'Are bike trips available 24/7?',
    //         answer: 'Availability may vary by location, but we aim to provide 24/7 service.',
    //     },
    //     {
    //         question: 'Is there a minimum fare for bike trips?',
    //         answer: 'Yes, minimum fare applies based on the city and distance.',
    //     },
    // ],
    // car: [
    //     {
    //         question: 'Are IdharUdhar cars air-conditioned?',
    //         answer: 'Yes, all our cars are equipped with AC for your comfort.',
    //     },
    //     {
    //         question: 'Can I schedule a car trip in advance?',
    //         answer: 'Yes, you can schedule a trip up to 7 days in advance through the app.',
    //     },
    //     {
    //         question: 'What types of cars are available?',
    //         answer: 'We offer sedans, SUVs, and premium cars based on your preference.',
    //     },
    //     {
    //         question: 'Is there an option for a female rider?',
    //         answer: 'Yes, you can request a female rider for your trip through the app.',
    //     },
    //     {
    //         question: 'Can I pay tolls or parking through the app?',
    //         answer: 'Yes, toll and parking fees are included in your final bill.',
    //     },
    //     {
    //         question: 'Are child seats available?',
    //         answer: 'Child seats can be requested in advance for an additional charge.',
    //     },
    //     {
    //         question: 'What happens if my trip is late?',
    //         answer: 'You can track your rider in real-time and contact support for delays.',
    //     },
    // ],
    // auto: [
    //     {
    //         question: 'Is meter fare applicable for auto trips?',
    //         answer: 'We provide pre-estimated fares, so no meter charges apply.',
    //     },
    //     {
    //         question: 'Can I share an auto trip with others?',
    //         answer: 'Yes, shared trip options are available in select cities.',
    //     },
    //     {
    //         question: 'Are autos sanitized regularly?',
    //         answer: 'Yes, riders sanitize autos daily to ensure passenger safety.',
    //     },
    //     {
    //         question: 'How do I request an auto trip?',
    //         answer: 'Select the auto trip option in the app and book instantly.',
    //     },
    //     {
    //         question: 'Are auto trips available during peak hours?',
    //         answer: 'Autos are available but fares may surge during peak times.',
    //     },
    //     {
    //         question: 'Can I pay via digital wallets for auto trips?',
    //         answer: 'Yes, digital wallet payments are accepted through the app.',
    //     },
    // ],
    courier: [
        {
            question: 'What items can I send via courier delivery?',
            answer: 'You can send documents, parcels, and small items under 10kg.',
        },
        {
            question: 'Is real-time tracking available for delivery?',
            answer: 'Yes, you can track your courier in real time within the app.',
        },
        {
            question: 'What is the delivery time estimate?',
            answer: 'Delivery time depends on distance but usually within 24-48 hours.',
        },
        {
            question: 'Are fragile items accepted?',
            answer: 'Fragile items are accepted but should be properly packed by the sender.',
        },
        {
            question: 'Can I schedule a courier pickup?',
            answer: 'Yes, schedule pickups via the app for your convenience.',
        },
        {
            question: 'What is the compensation for lost items?',
            answer: 'We provide compensation as per our terms if an item is lost or damaged.',
        },
        {
            question: 'Are courier charges calculated upfront?',
            answer: 'Yes, charges are calculated based on weight and distance before booking.',
        },
    ]
};

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedRide, setSelectedRide] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqList = selectedRide ? allFaqs[selectedRide] : defaultFaqs;

    const rideTypes = [
        // { key: 'bike', label: 'Bike Trip' },
        // { key: 'car', label: 'Car Trip' },
        // { key: 'auto', label: 'Auto Trip' },
        { key: 'courier', label: 'Courier Delivery' },
    ];

    return (
        <div className="bg-black text-white py-10">

    

            {/* Ride Type Buttons */}
            <div className="max-w-4xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-4">
                {rideTypes.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => {
                            setSelectedRide(key);
                            setOpenIndex(null); // Reset open FAQ on switch
                        }}
                        className={`px-4 py-2 rounded-md border ${selectedRide === key
                            ? 'bg-orange-600 text-white border-[#166534]'
                            : 'bg-white text-[#166534] border-[#166534]'
                            } hover:bg-orange-700 hover:text-white transition`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* FAQ Section */}
            <section className="min-h-[60vh] flex flex-col items-center justify-start px-4 py-6">
                <div className="w-full max-w-4xl space-y-4">
                    {faqList.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full px-4 py-4 flex justify-between items-center text-base font-semibold text-gray-400"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-left">{item.question}</span>
                                <span className="text-2xl text-orange-600">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div
                                className={`px-4 text-white transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 py-4' : 'max-h-0 py-0'
                                    }`}
                            >
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="relative bg-orange-600 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage:
                            "url('https://www.shutterstock.com/image-vector/travel-tourism-concept-set-tourists-260nw-2294415843.jpg')",
                    }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                    {[{
                        Icon: IndianRupee,
                        title: "Best Price Guaranteed",
                        desc: "Get the best rates for quality trips."
                    }, {
                        Icon: Headphones,
                        title: "24/7 Customer Care",
                        desc: "We’re always here to support you."
                    }, {
                        Icon: Calendar,
                        title: "Easy Bookings",
                        desc: "Plan your trip effortlessly."
                    }].map(({ Icon, title, desc }, i) => (
                        <div key={i} className="flex flex-col items-center space-y-3 hover:scale-105 transition-transform">
                            <Icon className="w-12 h-12 border-2 rounded-full p-3 border-white" />
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="text-white/80 text-sm">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call To Action */}
            <section className="text-white py-10 text-center px-4">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to book your next trip?</h2>
                <p className="text-base sm:text-lg mb-6">
                    Download the IdharUdhar Taxi App and trip smarter, safer, and faster.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="#" className="bg-black text-white px-5 py-3 rounded-md hover:bg-orange-600 transition text-sm">
                        Download on App Store
                    </Link>
                    <Link to="#" className="bg-black text-white px-5 py-3 rounded-md hover:bg-orange-600 transition text-sm">
                        Get it on Google Play
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Faqs;
