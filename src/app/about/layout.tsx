import DynamicBackground from "@/components/backgrounds/DynamicBackground";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black">
      <DynamicBackground name="about" />
      {children}
    </div>
  );
};

export default AboutLayout;
