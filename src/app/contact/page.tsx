export const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className="absolute w-[30vw] h-[30vw] left-[70vw] top-[calc(50vh-15vw)] bg-white contact"
        style={{
          transform: `matrix3d(1,0,1,-${0.0},0,1,0,0,-1,0,1,0,0,0,0,1)`,
        }}
      >
        Contact info
      </div>
    </>
  );
};

export default BlogLayout;
