"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <span className="text-8xl">📡</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900">You&apos;re offline</h1>
        <p className="mb-8 text-lg text-gray-600">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry, some features
          may still be available from cache.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
