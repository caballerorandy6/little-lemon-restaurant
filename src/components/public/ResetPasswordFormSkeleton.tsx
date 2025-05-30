"use client";

export default function ResetPasswordFormSkeleton() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 animate-pulse">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto h-40 w-40 rounded-full bg-gray-300" />
        <div className="mt-10 h-6 w-3/4 mx-auto bg-gray-300 rounded" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6 w-full">
        {/* New Password */}
        <div className="space-y-2">
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-md" />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-md" />
        </div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-400 rounded-md" />
      </div>
    </div>
  );
}
