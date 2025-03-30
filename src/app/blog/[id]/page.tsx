import Papers from '@/components/blog/papers';
import { Link } from 'next-view-transitions'

export const BlogPage = () => {
  return <div className="absolute lg:relative left-0 flex-shrink-0 w-full h-full pl-10 lg:w-2/3 blogid">
    <div className="absolute w-full h-full left-10 top-0 paper">
      <Papers active={true}/>
    </div>
    <div className="relative m-10 blog-content">
      <Link href="/">Test</Link>
    </div>
  </div>;
};

export default BlogPage;
