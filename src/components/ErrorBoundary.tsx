"use client";

import { GAME_VERSION } from "@/constants";
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => (
  <div role="alert" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
    <h1 className="text-3xl font-semibold mb-4">Something went wrong</h1>
    <p className="mb-2 text-lg">An unexpected error has occurred:</p>
    <pre className="bg-gray-200 p-4 rounded mb-4 text-sm">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Try again
    </button>
    <p className="mt-4 text-sm text-gray-500">App Version: {GAME_VERSION}</p>
  </div>
);

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
);

export { ErrorBoundary };
