"use client";

import React from "react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service

    console.error(error);
  }, [error]);

  return (
    <div className="w-[80%] mx-auto mt-[5%] flex items-center justify-between flex-col">
      <h2 className="text-2xl text-center">Something went wrong!</h2>
      <button
        className="bg-green-300 px-2 py-1 mt-2 rounded text-xl"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
