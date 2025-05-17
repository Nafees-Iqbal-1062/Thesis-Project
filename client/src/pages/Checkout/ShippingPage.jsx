import Header from "../../components/Header";
import ShippingSelector from "../../components/PaymentComponents/ShippingSelectror";

export default function ShippingPage() {
  return (
    <div className="bg-black">
      <Header />

      <ShippingSelector />
    </div>
  );
}
