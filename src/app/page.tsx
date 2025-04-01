"use client";

export default function Page() {
  return (
    <>
      <div className="absolute -left-[34vw] top-30 w-1/3 h-[calc(100vh-7.5rem)] sidebar"></div>
      <div
        className="absolute w-[30vw] h-[30vw] left-[125vw] top-[calc(50vh-15vw)] bg-white backdrop-blur-3xl contact"
        style={{
          transform: `matrix3d(0.707,0,0.707,-${0.0002},0,1,0,0,-0.707,0,0.707,0,0,0,0,1)`,
        }}
      ></div>
      <div className="absolute w-full lg:w-2/3 h-[calc(100vh-7.5rem)] left-[100vw] lg:left-1/3 top-30 lg:top-[120vh] paper"></div>
      <div className="absolute w-full lg:w-2/3 h-[calc(100vh-7.5rem)] left-[100vw] lg:left-1/3 top-30 lg:top-[120vh] blog-content"></div>
    </>
  );
}
