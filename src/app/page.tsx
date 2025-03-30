'use client'

export default function Page() {
  return (
    <>
      <div className="absolute -left-[34vw] top-30 w-1/3 h-[calc(100vh-7.5rem)] sidebar"></div>
      <div className="absolute w-[20rem] h-[20rem] left-[calc(50vw-10rem)] top-[calc(50vh-10rem)] bg-red-500 contact"></div>
      <div className="absolute w-full lg:w-2/3 h-[calc(100vh-7.5rem)] left-[100vw] lg:left-1/3 top-30 lg:top-[120vh] paper"></div>
      <div className="absolute w-full lg:w-2/3 h-[calc(100vh-7.5rem)] left-[100vw] lg:left-1/3 top-30 lg:top-[120vh] blog-content"></div>
    </>
  )
}
