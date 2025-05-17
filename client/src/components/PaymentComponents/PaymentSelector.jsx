import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;
  const [paymentMethod, setPaymentMethod] = useState("pay-on-delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const submitPayment = async () => {
    setIsSubmitting(true); // Set loading indicator

    try {
      const paymentData = {
        shippingMethod: formData.selectedMethod,
        paymentId: formData.formData.paymentId,
        email: formData.formData.email,
        phoneNumber: formData.formData.phone,
        firstName: formData.formData.firstName,
        lastName: formData.formData.lastName,
        company: formData.formData.company,
        address: formData.formData.address,
        addressCont: formData.formData.addressCont,
        city: formData.formData.city,
        postalCode: formData.formData.postalCode,
      };

      const response = await axios
        .post("/api/pay/addPayment", paymentData)
        .then(() => {
          setIsSubmitting(false);
          navigate("/Checkout/payment/success", {
            state: { email: formData.formData.email },
          });
        });
      console.log("Data Added Successfully:", response.data);
    } catch (error) {
      console.error("Failed to add payment shop data:", error);
      setIsSubmitting(false); // Reset loading indicator
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <div className="p-4 rounded-md bg-[#1F1F1F]">
      <div className="group mb-4 ">
        <h2 className="text-white text-xl py-5">Select Payment Method</h2>

        <div className="payment-method-group mb-4">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              id="pay-on-delivery"
              name="payment-method"
              value="pay-on-delivery"
              checked={paymentMethod === "pay-on-delivery"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 border-[#A80000] rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-[#A80000]"
            />
            <span className="text-base font-medium">Pay on Delivery</span>
          </label>
        </div>
        <div className="payment-method-group mb-4">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              id="credit-debit-card"
              name="payment-method"
              value="credit-debit-card"
              checked={paymentMethod === "credit-debit-card"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 border-[#A80000] rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-[#A80000]"
            />
            <span className="text-base font-medium">Credit/Debit Cards</span>
          </label>
          {paymentMethod === "credit-debit-card" && (
            <div className="card-details mt-4 px-4 py-2 border-[#A80000] rounded-lg shadow-sm">
              <label
                htmlFor="card-number"
                className="block text-sm font-medium text-white mb-2 bg-[#1F1F1F]"
              >
                Card number
              </label>
              <input
                type="text"
                id="card-number"
                placeholder="**** **** **** ****"
                className="w-full px-3 py-2 rounded-lg border border-[#A80000] focus:outline-none focus:ring-[#A80000] focus:ring-[#A80000]  bg-[#1F1F1F]"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4 border-[#A80000]">
                  <label
                    htmlFor="expiry-date"
                    className="block text-sm font-medium text-gray-700 mb-2 text-white"
                  >
                    MM/YY
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 rounded-lg border border-[#A80000]focus:outline-none focus:ring-[#A80000] focus:ring-[#A80000]  bg-[#1F1F1F]"
                  />
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-2 text-white"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="CVV"
                    className="w-20 px-3 py-2 rounded-lg border border-[#A80000] focus:outline-none focus:ring-[#A80000] focus:ring-1 bg-[#1F1F1F]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
       
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        onClick={submitPayment}
        className="text-white bg-[#A80000] hover:bg-[#A80000] focus:ring-4 focus:ring-[#A80000] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Checkout
      </button>
    </div>
  );
}
