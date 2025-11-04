import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: [
    // slonik and its dependencies for test suite to run
    "slonik",
    "p-limit",
    "yocto-queue",

    // next-view-transitions for test suite to run
    "next-view-transitions",

    // react-markdown and its dependencies for test suite to run
    "react-markdown",
    "bail",
    "character-entities",
    "comma-separated-tokens",
    "decode-named-character-reference",
    "devlop",
    "estree-util-is-identifier-name",
    "html-url-attributes",
    "is-plain-obj",
    "property-information",
    "space-separated-tokens",
    "trim-lines",
    "trough",
    "unified",

    "hast-util-to-jsx-runtime",
    "hast-util-whitespace",

    "mdast-util-from-markdown",
    "mdast-util-mdx-expression",
    "mdast-util-mdx-jsx",
    "mdast-util-mdxjs-esm",
    "mdast-util-phrasing",
    "mdast-util-to-hast",
    "mdast-util-to-markdown",
    "mdast-util-to-string",

    "micromark",
    "micromark-core-commonmark",
    "micromark-factory-destination",
    "micromark-factory-label",
    "micromark-factory-space",
    "micromark-factory-title",
    "micromark-factory-whitespace",
    "micromark-util-character",
    "micromark-util-chunked",
    "micromark-util-classify-character",
    "micromark-util-combine-extensions",
    "micromark-util-decode-numeric-character-reference",
    "micromark-util-decode-string",
    "micromark-util-encode",
    "micromark-util-html-tag-name",
    "micromark-util-normalize-identifier",
    "micromark-util-resolve-all",
    "micromark-util-sanitize-uri",
    "micromark-util-subtokenize",
    "micromark-util-symbol",
    "micromark-util-types",

    "remark-parse",
    "remark-rehype",

    "unist-util-is",
    "unist-util-position",
    "unist-util-stringify-position",
    "unist-util-visit",
    "unist-util-visit-parents",

    "vfile",
    "vfile-message",
  ],
};

export default nextConfig;
