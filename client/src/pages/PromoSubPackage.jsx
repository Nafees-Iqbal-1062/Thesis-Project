import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PromoSubPackage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState(false);
  const [subPackages, setSubPackage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/api/subpackage/getSubPackage`)
      .then((response) => {
        setSubPackage(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="relative">
        <div className="min-h-screen bg-[url('./src/assets/SubCover.jpg')] bg-center bg-cover">
          <Header />
          <h1 className="m-3 text-[#a80000] font-extrabold text-5xl text-center lg:text-4xl ">
            <span className="text-white">Membership</span> Plans
          </h1>
          <p className="m-3 text-center text-white dark:text-white text-base">
            Become a privileged Member of BM FITNESS WORLD today and join <br /> Bangladesh’s most modern and exclusive fitness community!
          </p>

          <div className="w-80 mx-auto mt-5 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-between">
            <Link
              to="/SubscriptionPackages"
              className={`w-1/2 h-full flex items-center justify-center rounded-full ${
                selectedTab === false
                  ? "bg-red-700 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelectedTab(false)}
              style={{ padding: "0.40rem 0.9rem", fontSize: "2.0rem" }}
            >
              <span className="text-xs font-bold">Stranded</span>
            </Link>
            <Link
              to="/PromoSubPackage"
              className={`w-1/2 h-full flex items-center justify-center rounded-full ${
                selectedTab === true
                  ? "bg-red-700 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelectedTab(true)}
              style={{ padding: "0.40rem 0.9rem", fontSize: "2.0rem" }}
            >
              <span className="text-xs font-bold">Promotion</span>
            </Link>
          </div>
          {/* w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 */}

          <div className="container mx-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-5 rounded-lg">
            {subPackages.map((subPackage) => (
              <>
                {subPackage.Pactype === "PromotionPackage" &&
                  subPackage.status === "Approved" &&
                  new Date(subPackage.startDate) <= new Date() &&
                  new Date(subPackage.endDate) >= new Date() && (
                    <div
                      key={subPackage._id}
                      className="p-5 mx-3 rounded-3xl border border-solid border-gray-600 bg-gray-600 bg-opacity-50 hover:bg-gray-600"
                    >
                      <h1 className="text-4xl font-bold text-center text-white">
                        {subPackage.subPackageName}
                      </h1>
                      <p className="m-2 text-center text-xl text-red-600 font-bold">
                        LKR {subPackage.price}
                      </p>
                      <p className="m-2 text-center text-lg text-white font-extrabold">
                        per {subPackage.validTime}
                      </p>
                      <p className="mt-2 m-3 text-center text-[#f5cb5c] font-bold text-base">
                        {subPackage.description}
                      </p>
                      <div className="flex justify-center">
                        <ul className="max-w-md space-y-1 list-disc list-inside font-bold text-white justify-center">
                          <li>{subPackage.note1}</li>
                          <li>{subPackage.note2}</li>
                          <li>{subPackage.note3}</li>
                        </ul>
                      </div>
                      <p className="mt-2 m-4 text-center text-[#f5cb5c] font-bold text-base">
                        Valid until:
                        {new Date(subPackage.endDate).toLocaleDateString()}
                      </p>
                      <div className="mt-4 flex justify-center">
                        <button className="rounded-3xl px-4 py-2 text-white font-bold bg-red-700 hover:bg-red-800 h-15 w-40 text-xl">
                          Join Us
                        </button>
                      </div>
                    </div>
                  )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoSubPackage;
