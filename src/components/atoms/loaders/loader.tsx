import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="loader-container">
      <Spin size="large" />
      <style jsx>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default Loader;
