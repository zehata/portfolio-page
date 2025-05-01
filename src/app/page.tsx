"use client";

export default function Page() {
  return (
    <>
      <div className="absolute w-full lg:w-2/3 h-[calc(100vh-7.5rem)] left-[100vw] lg:left-1/3 top-30 lg:top-[120vh] paper"></div>
      <div className="absolute w-full lg:w-2/3 h-[calc(100vh-7.5rem)] left-[100vw] lg:left-1/3 top-30 lg:top-[120vh] article-content"></div>
      {/* <div className="absolute flex justify-center items-center text-white gap-2 bottom-0 right-0 p-4">
        {`Made with`}
        <img className="w-8 h-8" src="/react.svg"/>
        {`+`}
        <img className="w-8 h-8" src="/next.svg"/>
      </div> */}
    </>
  );
}
