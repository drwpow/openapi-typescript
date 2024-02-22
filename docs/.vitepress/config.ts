import { defineConfig } from "vitepress";

const HOSTNAME = "https://openapi-ts.pages.dev";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OpenAPI TypeScript",
  description: "Consume OpenAPI 3.0 & 3.1 schemas in TypeScript",
  cleanUrls: true,
  srcExclude: ["**/*/CONTRIBUTRING.md", "**/*/README.md"],
  ignoreDeadLinks: [/CODE_OF_CONDUCT/],
  head: [
    ["link", { rel: "shortcut icon", href: "/favicon.svg", type: "image/svg" }],
  ],
  sitemap: {
    hostname: HOSTNAME,
  },
  /** @see https://vitepress.dev/reference/default-theme-config */
  themeConfig: {
    siteTitle: false,
    logo: "/assets/openapi-ts.svg",
    nav: [
      {
        text: "Version",
        items: [
          { text: "7.x", link: "/introduction" },
          { text: "6.x", link: "/6.x/introduction" },
        ],
      },
      {
        text: "🌐 Language",
        items: [
          { text: "🇬🇧 English", link: "/introduction" },
          { text: "🇨🇳 简体中文", link: "/zh/introduction" },
        ],
      },
    ],
    sidebar: {
      // 6.x docs
      "/6.x/": [
        {
          text: "openapi-typescript (6.x)",
          items: [
            { text: "Introduction", link: "/6.x/introduction" },
            { text: "CLI", link: "/6.x/cli" },
            { text: "Node.js API", link: "/6.x/node" },
            { text: "Advanced", link: "/6.x/advanced" },
            { text: "About", link: "/6.x/about" },
          ],
        },
        {
          text: "openapi-fetch",
          items: [
            { text: "Getting Started", link: "/openapi-fetch/" },
            {
              text: "Middleware & Auth",
              link: "/openapi-fetch/middleware-auth",
            },
            { text: "Testing", link: "/openapi-fetch/testing" },
            { text: "Examples", link: "/openapi-fetch/examples" },
            { text: "API", link: "/openapi-fetch/api" },
            { text: "About", link: "/openapi-fetch/about" },
          ],
        },
      ],
      // 🌐
      "/zh/": [
        {
          text: "openapi-typescript",
          items: [
            { text: "Introduction", link: "/zh/introduction" },
            { text: "CLI", link: "/zh/cli" },
            { text: "Node.js API", link: "/zh/node" },
            { text: "Examples", link: "/zh/examples" },
            { text: "Advanced", link: "/zh/advanced" },
            { text: "About", link: "/zh/about" },
          ],
        },
        {
          text: "openapi-fetch",
          items: [
            { text: "Getting Started", link: "/zh/openapi-fetch/" },
            {
              text: "Middleware & Auth",
              link: "/zh/openapi-fetch/middleware-auth",
            },
            { text: "Testing", link: "/zh/openapi-fetch/testing" },
            { text: "Examples", link: "/zh/openapi-fetch/examples" },
            { text: "API", link: "/zh/openapi-fetch/api" },
            { text: "About", link: "/zh/openapi-fetch/about" },
          ],
        },
      ],
      // default (7.x) docs
      "/": [
        {
          text: "openapi-typescript (7.x)",
          items: [
            { text: "Introduction", link: "/introduction" },
            { text: "CLI", link: "/cli" },
            { text: "Node.js API", link: "/node" },
            { text: "Examples", link: "/examples" },
            { text: "Migrating from 6.x", link: "/migration-guide" },
            { text: "Advanced", link: "/advanced" },
            { text: "About", link: "/about" },
          ],
        },
        {
          text: "openapi-fetch",
          items: [
            { text: "Getting Started", link: "/openapi-fetch/" },
            {
              text: "Middleware & Auth",
              link: "/openapi-fetch/middleware-auth",
            },
            { text: "Testing", link: "/openapi-fetch/testing" },
            { text: "Examples", link: "/openapi-fetch/examples" },
            { text: "API", link: "/openapi-fetch/api" },
            { text: "About", link: "/openapi-fetch/about" },
          ],
        },
      ],
    },
    search: {
      provider: "algolia",
      options: {
        appId: "NA92XVKBVS",
        apiKey: "4f3ce9ca7edc3b83c209e6656ab29eb8",
        indexName: "openapi-ts",
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/drwpow/openapi-typescript" },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/drwpow/openapi-typescript/blob/main/packages/openapi-typescript/LICENSE">MIT License</a>.',
    },
  },
});
