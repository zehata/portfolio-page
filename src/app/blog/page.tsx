import Papers from "@/components/blog/Papers";

export const BlogDefaultPage = () => {
  return (
    <div className="absolute left-[100vw] lg:relative lg:left-0 flex-shrink-0 w-full h-full pl-10 lg:w-2/3 blogid">
      <div className="absolute w-full h-full left-10 lg:top-[100vh] paper">
        <Papers />
      </div>
      <div className="absolute w-full h-full left-0 lg:top-[120%] blog-content"></div>
    </div>
  );
};

export default BlogDefaultPage;
