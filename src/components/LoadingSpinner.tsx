"use client";

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center h-full space-y-2">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50" />
    <p className="text-base text-gray-700">Loading...</p>
  </div>
);

export { LoadingSpinner };
