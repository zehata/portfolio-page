"use client";
import classNames from 'classnames';
import React from 'react';

export const BlogLayout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {

  return (
    <>
      <div className="absolute top-30 w-full h-[calc(100vh-7.5rem)] z-1 flex flex-row">
        {sidebar}
        {children}
      </div>
    </>
  );
};

export default BlogLayout;
