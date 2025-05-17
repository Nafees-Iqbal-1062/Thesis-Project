import Header from "../components/Header";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-900 text-white">
      <Header />
      <div className="py-12 px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-red-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="text-4xl font-extrabold text-center mb-6 text-white tracking-wide">
            About BM Fitness World
          </h1>

          <p className="text-lg text-gray-200 leading-relaxed mb-6">
            <strong className="text-white">BM Fitness World</strong> is more
            than just a gym — it's a full-fledged fitness destination dedicated
            to helping individuals lead healthier, stronger lives. Located in
            the heart of Mirpur, Dhaka, we offer personalized training,
            professional guidance, and a welcoming environment for all fitness
            levels.
          </p>

          <SectionTitle>🏋️ Services Offered</SectionTitle>
          <ul className="list-disc pl-6 space-y-2 text-gray-100">
            <li>In-store training sessions with certified trainers</li>
            <li>Online booking for seamless scheduling</li>
            <li>Live & recorded online fitness classes</li>
            <li>Equipment sales and fitness gear</li>
            <li>Custom workout planning and nutritional tips</li>
          </ul>

          <SectionTitle>📍 Location</SectionTitle>
          <p className="text-gray-200">
            H-33, Ave-1, Kalshi Main Road, Mirpur, Dhaka <br />
            (Opposite of Kalshi Graveyard), Dhaka, Bangladesh
          </p>

          <SectionTitle>☎️ Contact</SectionTitle>
          <p className="text-gray-200">
            Phone:{" "}
            <a
              href="tel:01880085074"
              className="text-yellow-300 hover:underline"
            >
              01880-085074
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:bminternational31@gmail.com"
              className="text-yellow-300 hover:underline"
            >
              bminternational31@gmail.com
            </a>
          </p>

          <SectionTitle>🕒 Availability</SectionTitle>
          <p className="text-gray-200">
            <strong className="text-white">Open now</strong> — Offering{" "}
            <span className="text-yellow-300 font-semibold">Online Booking</span>
            ,{" "}
            <span className="text-yellow-300 font-semibold">
              In-Store Shopping
            </span>
            , and{" "}
            <span className="text-yellow-300 font-semibold">Online Classes</span>
            .
          </p>

          <SectionTitle>🔗 Follow Us on Social Media</SectionTitle>
          <div className="flex gap-6 items-center mt-2">
            <a
              href="https://www.facebook.com/bmfitnessworld73"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bmfitnessworld_bd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-400 hover:underline"
            >
              <img
                src="https://www.svgrepo.com/show/452229/instagram-1.svg"
                alt="Instagram"
                className="w-6 h-6"
              />
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <motion.h2
      className="text-2xl font-bold mt-8 mb-3 text-white border-l-4 border-red-400 pl-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
}
