import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cover_Image from "../assets/pngtree-a-fully-equipped-gym-with-dumbbells-weight-machines-and-cardio-equipment-image_16843660.jpg";
import { Alert, Spinner, TextInput, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import Header from "../components/Header";

export default function EmployeeLogin() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/authemployee/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/admin-dashboard?tab=profile");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${Cover_Image})`,
      }}
    >
      <Header />

      <div className="flex items-start justify-center py-6 px-16 pb-20">
        <div className="bg-[#1f1f1f] bg-opacity-90 p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-2xl font-bold text-[#d4d4d4] mb-1">
            BM <span className="text-white">FITNESS WORLD</span>
          </div>
          <p className="text-sm text-[#d4d4d4] mb-6">Welcome Back!</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-[#d4d4d4]">Login</h3>
            <div>
              <Label value="Email" className="text-[#d4d4d4]" />
              <TextInput
                type="email"
                placeholder="Enter your email"
                id="email"
                onChange={handleChange}
                required
                className="bg-[#707070] placeholder:text-[#d4d4d4] text-white"
              />
            </div>
            <div>
              <Label value="Password" className="text-[#d4d4d4]" />
              <TextInput
                type="password"
                placeholder="••••••"
                id="password"
                onChange={handleChange}
                required
                className="bg-[#707070] placeholder:text-[#d4d4d4] text-white"
              />
            </div>

            <button
              type="submit"
              className="bg-[#4c0000] text-[#d4d4d4] py-2 rounded-md hover:bg-[#7e1010] transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {errorMessage && (
            <Alert className="mt-4" color="failure">
              {typeof errorMessage === "string"
                ? errorMessage
                : errorMessage.message || "An error occurred"}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
