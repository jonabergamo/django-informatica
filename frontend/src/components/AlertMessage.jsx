import React from "react";

export default function AlertMessage({ children }) {
  return (
    <div class="fixed top-3 left-1/2 transform -translate-x-1/2">
      <div class="bg-blue-500/50 py-2 px-3 rounded shadow-lg border-gray-400 border">
        <p class="text-sm">{children}</p>
      </div>
    </div>
  );
}
