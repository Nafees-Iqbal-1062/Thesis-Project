import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Dropdown, DropdownDivider } from "flowbite-react";
import logo from "../assets/Logo-White.png";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const [announcementData, setAnnouncementData] = useState([]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignInPage = location.pathname === "/sign-in";
  const isSignUpPage = location.pathname === "/sign-up";
  const dispatch = useDispatch();

  console.log(setAnnouncementData);

  const handleSignoutEmp = async () => {
    try {
      const res = await fetch("/api/employee/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (currentUser) {
      fetchUpdatedAnnouncementData();
    }
  }, [currentUser]);

  const fetchUpdatedAnnouncementData = async () => {
    try {
      const res = await fetch(`/api/announcement/getAnnouncement?limit=4`);
      const data = await res.json();
      if (res.ok) {
        // setAnnouncementData(data.announcements);
        setAnnouncementData(data.announcements);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const markAsSeen = async (announcementId) => {
    try {
      const res = await fetch("/api/announcement/markAnnouncementAsSeen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          announcementId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnnouncementData((prevData) => {
          return prevData.map((announcement) => {
            if (announcement._id === announcementId) {
              return {
                ...announcement,
                seenBy: [...announcement.seenBy, currentUser._id],
              };
            }
            return announcement;
          });
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(announcementData);

  return (
    <header
  className={`bg-transparent border-none  shadow-none relative `}
>
  <div className="flex items-center justify-between p-6 mx-auto max-w-7xl">
    <Link to="/">
      <img src={logo} alt="logo" className="w-40" />
    </Link>

    <ul className="flex gap-10">
      <Link to="/">
        <li className="hidden sm:inline text-gray-300 hover:underline hover:underline-offset-4 hover:text-white">
          Home
        </li>
      </Link>
      <Link to="/about">
        <li className="hidden sm:inline text-gray-300 hover:underline hover:underline-offset-4 hover:text-white">
          About
        </li>
      </Link>
      <Link to="/SubscriptionPackages">
        <li className="hidden sm:inline text-gray-300 hover:underline hover:underline-offset-4 hover:text-white">
          Memberships
        </li>
      </Link>
      {(!currentUser || (!currentUser.role && !currentUser.isAdmin)) && (
        <Link to="/shop">
          <li className="hidden sm:inline text-gray-300 hover:underline hover:underline-offset-4 hover:text-white">
            Shop
          </li>
        </Link>
      )}
     
      
      <Link to="/coaching">
        <li className="hidden sm:inline text-gray-300 hover:underline hover:underline-offset-4 hover:text-white">
          Coaching
        </li>
      </Link>
    </ul>

    {currentUser ? (
      <div className="flex gap-4">
        {announcementData.length > 0 && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div>
                {announcementData[0].seenBy.length === 0 ||
                !announcementData[0].seenBy.includes(currentUser._id) ? (
                  <MdNotificationsActive
                    color="#E49B0F"
                    size={36}
                    status="online"
                    statusPosition="top-right"
                  />
                ) : (
                  <IoIosNotifications color="white" size={36} />
                )}
              </div>
            }
            style={{ zIndex: 9 }}
          >
            <DropdownDivider />
            {announcementData.map((announcement) => (
              <>
                <Dropdown.Item
                  stopPropagation
                  key={announcement._id}
                  onClick={(e) => {
                    markAsSeen(announcement._id);
                    e.stopPropagation();
                  }}
                  className={`${
                    announcement.seenBy.includes(currentUser._id)
                      ? "font-thin text-gray-500"
                      : "font-bold text-black bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`block text-base text-left underline underline-offset-2 ${
                        announcement.seenBy.includes(currentUser._id)
                          ? "font-thin text-gray-500"
                          : "font-bold text-black"
                      }`}
                    >
                      {announcement.title}
                    </span>
                    <span className="block text-sm text-left">
                      {announcement.message}
                    </span>
                  </div>
                </Dropdown.Item>
                <DropdownDivider />
              </>
            ))}
            <Link
              to="/admin-dashboard?tab=admin-announcement"
              className="flex gap-4"
            >
              <div className="flex flex-col mx-auto justify-center">
                <button className="mx-4 text-xs text-center">
                  See more
                </button>
              </div>
            </Link>
          </Dropdown>
        )}

        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="user"
              img={currentUser.profilePicture}
              rounded
              status="online"
              statusPosition="top-right"
            />
          }
          style={{ zIndex: 9, marginRight: "1rem" }}
        >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">
              {currentUser.email}
            </span>
          </Dropdown.Header>
          <Link
            to={
              currentUser.role
                ? "/admin-dashboard?tab=profile"
                : "/admin-dashboard?tab=member-profile"
            }
          >
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          <DropdownDivider />
          <Dropdown.Item onClick={handleSignoutEmp}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    ) : (
      <ul>
        <Link to="/sign-in" className="flex gap-4">
          <li className="text-gray-300 font-extrabold text-xl rounded-lg hover:text-white">
            Sign in
          </li>
        </Link>
      </ul>
    )}
  </div>
</header>

  );
}
