import React from 'react';
import { useSelector } from 'react-redux';
import navigationConfig from 'configs/navigation.config';
import { Link } from 'react-router-dom';
import { AuthorityCheck } from 'components/shared';
import navigationIcon from 'configs/icon.config';
const Sidebar = (props) => {
  const { children } = props;

  const sidebarOpen = useSelector((state) => state.base.common.sidebarOpen);
  const userAuthority = useSelector((state) => state.auth.authority.roles);
  return (
    <div className="absolute top-[75px] right-0 w-full overflow-y-auto max-h-[calc(100vh_-_100px)] min-h-[calc(100vh_-_100px)] h-full ">
      {sidebarOpen && (
        <aside
          className={`fixed top-[74px] left-0 z-40 w-64 h-screen translate-x-0 transition-all duration-500`}>
          <div className="h-full px-3 py-4 bg-gray-50 ">
            <ul className="space-y-2 font-medium">
              {navigationConfig.map((nav) => (
                <AuthorityCheck
                  authority={nav.authority}
                  userAuthority={userAuthority}
                  key={nav.key}>
                  <li>
                    <Link
                      to={nav.path}
                      className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                      <span className="text-2xl">{navigationIcon[nav.icon]}</span>

                      <span className="ms-3">{nav.title}</span>
                    </Link>
                  </li>
                </AuthorityCheck>
              ))}
            </ul>
            {/* <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 ">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100   group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 17 20">
                    <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                  </svg>
                  <span className="ms-3">Upgrade to Pro</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100   group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20">
                    <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                  </svg>
                  <span className="ms-3">Documentation</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100   group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18">
                    <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
                    <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z" />
                  </svg>
                  <span className="ms-3">Components</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100   group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 21 21">
                    <path d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z" />
                  </svg>
                  <span className="ms-3">Help</span>
                </a>
              </li>
            </ul> */}
          </div>
        </aside>
      )}

      <div className={`${sidebarOpen ? 'sm:ml-64' : ''}`}>
        <div className="p-4 border-2 min-h-[calc(100vh_-80px)] h-full border-gray-200 border-dashed rounded-lg z-10 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
