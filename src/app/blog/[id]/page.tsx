import Papers from "@/components/blog/Papers";
import getBlog from "@/lib/getBlog";
import Markdown from "react-markdown";

export const BlogPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>
}) => {
  const blog = await getBlog((await params).id)

  return (
    <div className="absolute lg:relative -left-10 lg:-left-5 flex-shrink-0 w-full h-full pl-10 lg:w-2/3 blogid">
      <div className="absolute w-full h-full left-10 top-0 paper">
        <Papers />
      </div>
      <div className="relative m-10 blog-content">
        <Markdown>
          {blog.blogContent}
        </Markdown>
      </div>
    </div>
  );
};

export default BlogPage;
