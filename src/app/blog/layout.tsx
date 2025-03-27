"use client";

export const BlogLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="absolute top-30 bg-white w-full h-full z-1">
    <div className="w-full h-full flex flex-row">
      <div className="w-full h-full bg-red-500"></div>
      {children}
    </div>
  </div>;
};

export default BlogLayout;
