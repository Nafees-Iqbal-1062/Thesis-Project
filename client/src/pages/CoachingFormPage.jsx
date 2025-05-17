import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import gymImg from "../assets/cimg2.jpg";

export default function CoachingFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [coach, setCoach] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/books/bookAdd", {
        name,
        email,
        age: contact,
        cname: coach,
        date,
        time,
        msg: message,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div  className=" items-center justify-center min-h-screen bg-cover bg-center px-4" style={{ backgroundImage: `url(${gymImg})` }}>
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
       
      >
        
        <div className="bg-black bg-opacity-80 w-full max-w-2xl p-8 rounded-2xl shadow-lg mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Book Your Coaching Session
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-white font-medium mb-1">
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="coach" className="block text-white font-medium mb-1">
                  Select Coach
                </label>
                <select
                  id="coach"
                  value={coach}
                  onChange={(e) => setCoach(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Choose Coach</option>
                  {["Coach 1", "Coach 2", "Coach 3", "Coach 4", "Coach 5"].map((coachOption) => (
                    <option key={coachOption} value={coachOption}>
                      {coachOption}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-white font-medium mb-1">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  min={getCurrentDate()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-white font-medium mb-1">
                  Time Slot
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Choose Time</option>
                  {[
                    "18:00", "18:30", "19:00", "19:30",
                    "20:00", "20:30", "21:00", "21:30",
                    "22:00", "22:30", "23:00",
                  ].map((slot) => (
                    <option key={slot} value={slot}>
                      {new Date(`1970-01-01T${slot}`).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-medium mb-1">
                Special Message (Optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
