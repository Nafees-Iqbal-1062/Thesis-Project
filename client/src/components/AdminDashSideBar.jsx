import {
  HiArrowSmRight,
  HiDocumentText,
  HiUser,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import {
  MdSchedule,
  MdOutlineScheduleSend,
  MdDashboard,
  MdOutlineCardMembership,
  MdAnnouncement,
} from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function AdminDashSideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpenEmp, setIsOpenEmp] = useState(false);
  const [isOpenReq, setIsOpenReq] = useState(false);
  const [isOpenSupplement, setIsOpenSupplement] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [isOpenSubscription, setIsOpenSubscription] = useState(false);

  const [isOpenPlan, setIsOpenPlan] = useState(false);
  const [isOpenMemberPlan, setIsOpenMemberPlan] = useState(false);

  const [isOpenServ, setIsOpenServ] = useState(false);
  const [isOpenInventory, setIsOpenInventory] = useState(false);

  const toggleDropdownEmp = () => {
    setIsOpenEmp(!isOpenEmp);
  };

  const toggleDropdownReq = () => {
    setIsOpenReq(!isOpenReq);
  };
  const toggleDropdownPayment = () => {
    setIsOpenPayment(!isOpenPayment);
  };

  const toggleDropdownSubscription = () => {
    setIsOpenSubscription(!isOpenSubscription);
  };

  const toggleDropdownSupplement = () => {
    setIsOpenSupplement(!isOpenSupplement);
  };

  const toggleDropdownPlans = () => {
    setIsOpenPlan(!isOpenPlan);
  };
  const toggleDropdownMemberPlans = () => {
    setIsOpenMemberPlan(!isOpenMemberPlan);
  };
  const toggleDropdownServ = () => {
    setIsOpenServ(!isOpenServ);
  };

  const toggleDropdownInventory = () => {
    setIsOpenInventory(!isOpenInventory);
  };

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const urlParama = new URLSearchParams(location.search);
    const tabFromUrl = urlParama.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-full h-full md:w-56 drop-shadow-2xl border-b-white">
      <div className="flex-col h-full overflow-x-hidden overflow-y-auto text-center bg-[#1f1f1f]">
        {currentUser.role && (
          <Link to="/admin-dashboard?tab=profile">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
                activeTab === "profile" ? "bg-[#707070]" : ""
              }`}
            >
              <HiUser color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">Profile</span>
            </div>
          </Link>
        )}
        {!currentUser.role && (
          <Link to="/admin-dashboard?tab=member-profile">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
                activeTab === "member-profile" ? "bg-[#707070]" : ""
              }`}
            >
              <HiUser color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">Profile</span>
            </div>
          </Link>
        )}
        
        
        {isOpenReq && (
          <div
            className="text-left text-sm font-light w-4/5 mx-auto text-[#D4D4D4] p-2"
            id="submenu"
          >
            <Link to="/admin-dashboard?tab=request-shift-change">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "request-shift-change" ? "bg-[#707070]" : ""}`}
              >
                Shift
              </h1>
            </Link>

            <Link to="/admin-dashboard?tab=view-instructors-request">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "view-instructors-request" ? "bg-[#707070]" : ""}`}
              >
                Leave Requests
              </h1>
            </Link>
          </div>
        )}

       

        {currentUser.isAdmin && (
          <Link to="/admin-dashboard?tab=dashboard-comp">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
                activeTab === "dashboard-comp" ? "bg-[#707070]" : ""
              }`}
            >
              <MdDashboard color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">Dashboard</span>
            </div>
          </Link>
        )}
        

        {currentUser.isAdmin && (
          <Link to="/admin-dashboard?tab=instuctor-shift">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
                activeTab === "instuctor-shift" ? "bg-[#707070]" : ""
              }`}
            >
              <MdOutlineScheduleSend color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">
                Instructor Shifts
              </span>
            </div>
          </Link>
        )}

        

        {currentUser.isAdmin && (
          <Link to="/admin-dashboard?tab=admin-users">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
                activeTab === "admin-users" ? "bg-[#707070]" : ""
              }`}
            >
              <LuUsers color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">Users</span>
            </div>
          </Link>
        )}

        {/* Supplement Management By Manager  */}
        {currentUser.role === "Manager" && (
          <div
            className={`p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "sub" ? "bg-[#707070]" : ""
            }`}
            onClick={() => toggleDropdownSupplement()}
          >
            <MdOutlineCardMembership color="#D4D4D4" />
            <div className="flex items-center justify-between w-full">
              <span className="text-[15px] ml-4 text-[#D4D4D4]">
                Supplement
              </span>
              <span className="text-sm rotate-180" id="arrow">
                {isOpenSupplement ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          </div>
        )}

        {isOpenSupplement && (
          <div
            className="text-left text-sm font-light w-4/5 mx-auto text-[#D4D4D4] p-2"
            id="submenu"
          >
            <Link to="/admin-dashboard?tab=add-supplements">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "add-supplements" ? "bg-[#707070]" : ""}`}
              >
                Add Supplement
              </h1>
            </Link>
            <Link to="/admin-dashboard?tab=show-supplements">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "show-supplements" ? "bg-[#707070]" : ""}`}
              >
                All Supplements
              </h1>
            </Link>

            <Link to="/admin-dashboard?tab=show-Protein">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "show-Protein" ? "bg-[#707070]" : ""}`}
              >
                Protein
              </h1>
            </Link>

            <Link to="/admin-dashboard?tab=show-Mass">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "show-Mass" ? "bg-[#707070]" : ""}`}
              >
                Mass Gainers
              </h1>
            </Link>

            <Link to="/admin-dashboard?tab=show-Creatine">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "show-Creatine" ? "bg-[#707070]" : ""}`}
              >
                Creatine
              </h1>
            </Link>

            <Link to="/admin-dashboard?tab=show-Preworkout">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "show-Preworkout" ? "bg-[#707070]" : ""}`}
              >
                Pre Workout
              </h1>
            </Link>

            <Link to="/admin-dashboard?tab=show-FatBurners">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "show-FatBurners" ? "bg-[#707070]" : ""}`}
              >
                Fat Burners
              </h1>
            </Link>

            <Link to="/admin-dashboard?tab=show-Vitamins">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
                ${activeTab === "show-Vitamins" ? "bg-[#707070]" : ""}`}
              >
                Vitamins And FishOils
              </h1>
            </Link>
          </div>
        )}

        {/* Employee Management  */}
        {currentUser.isAdmin && (
          <div
            className={`p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "emp" ? "bg-[#707070]" : ""}`}
            onClick={() => toggleDropdownEmp()}
          >
            <HiOutlineUserGroup color="#D4D4D4" />
            <div className="flex items-center justify-between w-full">
              <span className="text-[15px] ml-4 text-[#D4D4D4]">Employees</span>
              <span className="text-sm rotate-180" id="arrow">
                {isOpenEmp ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          </div>
        )}

        {isOpenEmp && (
          <div
            className="text-left text-sm font-light w-4/5 mx-auto text-[#D4D4D4] p-2"
            id="submenu"
          >
            <Link to="/admin-dashboard?tab=search-employee">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md
              ${activeTab === "search-employee" ? "bg-[#707070]" : ""}`}
              >
                Search Employees
              </h1>
            </Link>
            <Link to="/admin-dashboard?tab=addemployee">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "addemployee" ? "bg-[#707070]" : ""}`}
              >
                Add Employees
              </h1>
            </Link>
            <Link to="/admin-dashboard?tab=admin-instructors">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "admin-instructors" ? "bg-[#707070]" : ""}`}
              >
                Instructors
              </h1>
            </Link>
            <Link to="/admin-dashboard?tab=admin-managers">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "admin-managers" ? "bg-[#707070]" : ""}`}
              >
                Managers
              </h1>
            </Link>
          </div>
        )}

        {/* Announcement Management  */}
        <Link to="/admin-dashboard?tab=admin-announcement">
          <div
            className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "admin-announcement" ? "bg-[#707070]" : ""
            }`}
          >
            <MdAnnouncement color="#D4D4D4" />

            <span className="text-[15px] ml-4 text-[#D4D4D4]">
              Announcements
            </span>
          </div>
        </Link>

        

       

        

        {currentUser.role === "Manager" && (
          <div
            className={`p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "sub" ? "bg-[#707070]" : ""
            }`}
            onClick={() => toggleDropdownSubscription()}
          >
            <MdOutlineCardMembership color="#D4D4D4" />
            <div className="flex items-center justify-between w-full">
              <span className="text-[15px] ml-4 text-[#D4D4D4]">
                Subscription
              </span>
              <span className="text-sm rotate-180" id="arrow">
                {isOpenSubscription ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          </div>
        )}

        {isOpenSubscription && (
          <div
            className="text-left text-sm font-light w-4/5 mx-auto text-[#D4D4D4] p-2"
            id="submenu"
          >
            <Link to="/admin-dashboard?tab=admin-subscripition-panel">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1 ${activeTab === "admin-subscripition-panel" ? "bg-[#707070]" : ""}`}
              >
                Create Subscription
              </h1>
            </Link>
            <Link to="/admin-dashboard?tab=admin-promo-subscripition-panel">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1 ${activeTab === "admin-promo-subscripition-panel" ? "bg-[#707070]" : ""}`}
              >
                Promotion Package
              </h1>
            </Link>
          </div>
        )}

        
        

        {currentUser.role === "Instructor" && (
          <>
            <Link to="/admin-dashboard?tab=viewSessions">
              <div
                className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "request" ? "bg-[#707070]" : ""}`}
              >
                <MdSchedule color="#D4D4D4" />
                <div className="flex justify-between w-full items-center">
                  <span className="text-[15px] ml-4 text-[#D4D4D4]">
                    View Appointments
                  </span>
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
