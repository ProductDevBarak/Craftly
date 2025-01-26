import React from "react";
import "./home.css";

export default function Template({ title, svg }) {
  return (
    <div className="template-card">
      <div className="template-icon">{svg}</div>
      <div className="template-title">{title}</div>
    </div>
  );
}
