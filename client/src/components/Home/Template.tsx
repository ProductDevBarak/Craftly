import React from "react";

export default function Template({ title, svg }) {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg hover:border-blue-400 hover:shadow-lg transition-all">
      <div className="mb-2">{svg}</div>
      <div className="capitalize font-medium">{title}</div>
    </div>
  );
}
