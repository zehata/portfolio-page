import React from "react";

export const BlogLayout = () => {
  return (
    <>
      <div className="fixed top-[calc(50vh-15rem)] right-[calc(max(60vw/3,960vh/27)-min(30vw,12rem))] w-[min(60vw,24rem)] h-[30rem] contact">
        <div className="absolute w-full h-[min(75%,25rem)] ">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-80"></div>
          <div className="absolute top-0 left-0 w-full h-full border-white border-4 opacity-100 test-mask z-1"></div>
          <div className="relative w-full h-full z-1 p-4">
            {`Mobile`}
          </div>
        </div>
      </div>
      <div className="absolute top-[calc(50vh+7.5rem+max(0.5625vw,1vh))] right-[calc(max(60vw/3,960vh/27)-2px)] w-1 h-[calc(50vh-7.5rem-max(6.1875vw,11vh))] bg-white opacity-75 contact-indicator"/>
    </>
  );
};

export default BlogLayout;
