import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatarOpen, setSidebarOpen } from 'store/base/commonSlice';
import useAuth from 'utils/hooks/useAuth';
import Swal from 'sweetalert2';

const Header = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.base.common.sidebarOpen);
  const avatarOpen = useSelector((state) => state.base.common.avatarOpen);
  const userInfo = useSelector((state) => state.auth.user);
  const { signOut } = useAuth();
  const handleAvatarOpen = () => {
    dispatch(setAvatarOpen(!avatarOpen));
  };
  const handleSidebarOpen = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  const closeAvatar = () => {
    if (avatarOpen) {
      dispatch(setAvatarOpen(false));
    }
  };
  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };

  return (
    <div className="flex items-center justify-between py-4 px-4 fixed w-full z-[9999] top-0 start-0 border-b border-gray-200  bg-gray-50">
      <button
        className="inline-flex items-center p-2  text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={() => handleSidebarOpen()}>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <OutsideClickHandler onOutsideClick={() => closeAvatar()}>
        <div className="relative">
          <div className="flex items-center gap-3">
            <button
              className="bg-purple-300 w-[35px] h-[35px] rounded-full flex-shrink-0"
              onClick={() => handleAvatarOpen()}>
              <span className="font-semibold">{userInfo?.name ?? 'M'}</span>
            </button>
          </div>

          {/* Dropdown menu */}
          {avatarOpen && (
            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 min-w-max">
              <div className="px-4 py-3 text-sm text-gray-900 flex flex-col">
                <div>{userInfo?.name ?? ''}</div>
                <div className="flex-1">{userInfo?.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 " aria-labelledby="avatarButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <span
                  onClick={handleSignOut}
                  className="cursor-pointer block px-4 py-2 hover:bg-gray-100">
                  Sign Out
                </span>
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Header;
