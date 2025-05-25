import DynamicBackground from "@/components/backgrounds/DynamicBackground";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DynamicBackground name="about" />
      {children}
    </>
  );
};

export default AboutLayout;
