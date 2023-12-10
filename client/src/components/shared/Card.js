import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Card = (props) => {
  const { title, path, authority, type, description } = props;
  const location = useLocation();

  const isCurrentPage = location.pathname === path;

  return (
    <>
      {Object.keys(props).length && (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
            {title}
          </h3>

          <p className="mb-3 font-normal text-gray-700">{description}</p>

          {type && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-lg font-bold tracking-tight text-gray-900">Route Type:</span>
              <span className="inline-block bg-blue-100 rounded-full px-3 text-sm font-semibold text-blue-600">
                {type}
              </span>
            </div>
          )}

          {authority?.length > 0 && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-lg font-bold tracking-tight text-gray-900">Authority:</span>

              <div className="flex items-center gap-1">
                {authority.map((permission) => (
                  <span className="inline-block bg-green-100 rounded-full px-3 text-sm font-semibold text-green-600">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          )}

          {path && (
            <>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-lg font-bold tracking-tight text-gray-900">Path:</span>
                <span className="inline-block bg-purple-100 rounded-full px-3 text-sm font-semibold text-purple-600">
                  {path}
                </span>
              </div>
              {!isCurrentPage ? (
                <div className="flex items-center justify-center">
                  <Link
                    to={path}
                    className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    Go To Page
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <button disabled className="cursor-not-allowed inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg">
                    Here Page
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Card;
