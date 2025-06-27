import React from "react";


const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[#232323] border-solid"></div>
    </div>
  );
};

export default Loading;
