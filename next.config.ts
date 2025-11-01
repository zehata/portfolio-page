import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["slonik", "p-limit", "yocto-queue"]
};

export default nextConfig;
