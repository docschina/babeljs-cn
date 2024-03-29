const parseYaml = require("js-yaml").safeLoad;
const path = require("path");
const fs = require("fs");
const url = require("url");

function findMarkDownSync(startPath) {
  const result = [];
  const files = fs.readdirSync(path.join(__dirname, startPath));
  files.forEach(val => {
    const fPath = path.join(startPath, val);
    const stats = fs.statSync(fPath);
    if (stats.isDirectory()) {
      result.push({
        title: val,
        path: fPath,
      });
    }
  });
  return result;
}
const toolsMD = findMarkDownSync("./data/tools/");

function loadMD(fsPath) {
  return fs.readFileSync(path.join(__dirname, fsPath), "utf8");
}

function loadYaml(fsPath) {
  return parseYaml(fs.readFileSync(path.join(__dirname, fsPath), "utf8"));
}
// move to website/data later
const users = loadYaml("./data/users.yml").map(user => ({
  pinned: user.pinned,
  caption: user.name,
  infoLink: user.url,
  image: `/img/users/${user.logo}`,
}));

const sponsorsManual = (loadYaml("./data/sponsors.yml") || []).map(sponsor => ({
  ...sponsor,
  image: sponsor.image || path.join("/img/sponsors/", sponsor.logo),
}));
const sponsorsDownloaded = require(path.join(__dirname, "/data/sponsors.json"));

const sponsors = [
  ...sponsorsDownloaded
    .filter(sponsor => sponsor.slug !== "github-sponsors")
    .map(sponsor => {
      let website = sponsor.website;
      if (typeof website == "string") {
        website = url.parse(website).protocol ? website : `http://${website}`;
      } else if (typeof sponsor.twitterHandle == "string") {
        website = `https://twitter.com/@${sponsor.twitterHandle}`;
      } else {
        website = `https://opencollective.com/${sponsor.slug}`;
      }

      return {
        type: "opencollective",
        tier: sponsor.tier,
        name: sponsor.name,
        url: website,
        image: sponsor.avatar || "/img/user.svg",
        description: sponsor.description,
        monthly: sponsor.monthlyDonations,
        yearly: sponsor.yearlyDonations,
        total: sponsor.totalDonations,
      };
    }),
  ...sponsorsManual,
];

// move to website/data later
const videos = require(path.join(__dirname, "/data/videos.js"));
const team = loadYaml("./data/team.yml");
const tools = loadYaml("./data/tools.yml");
const setupBabelrc = loadMD("./data/tools/setup.md");

toolsMD.forEach(tool => {
  tool.install = loadMD(`${tool.path}/install.md`);
  tool.usage = loadMD(`${tool.path}/usage.md`);
});

const DEFAULT_LANGUAGE = "en";

const GITHUB_URL = "https://github.com/babel/website";

const siteConfig = {
  useEnglishUrl: true,
  editUrl: `${GITHUB_URL}/blob/main/docs/`,
  title: "Babel 中文文档",
  tagline: "下一代 JavaScript 编译器",
  url: "https://babel.docschina.org",
  v6Url: "https://v6.babeljs.io/docs/setup/",
  baseUrl: "/",
  getDocUrl: (doc, language) =>
    `${siteConfig.baseUrl}docs/${language || DEFAULT_LANGUAGE}/${doc}`,
  getPageUrl: (page, language) =>
    `${siteConfig.baseUrl}${language || DEFAULT_LANGUAGE}/${page}`,
  getVideoUrl: (videos, language) =>
    `${siteConfig.baseUrl}${language || DEFAULT_LANGUAGE}/${videos}`,
  organizationName: "babel",
  projectName: "babel",
  repoUrl: "https://github.com/babel/babel",
  headerLinks: [
    { href: "https://docschina.org/", label: "印记中文" },
    { doc: "index", label: "文档" },
    { page: "setup", label: "配置" },
    { page: "repl", label: "试用" },
    { page: "videos", label: "视频" },
    { blog: true, label: "博客" },
    { search: true, label: "搜索" },
    { href: "https://opencollective.com/babel", label: "赞助" },
    { page: "team", label: "团队" },
    { href: "https://github.com/babel/babel", label: "GitHub" },
    // { languages: true }
  ],
  users,
  sponsors,
  videos,
  team,
  tools,
  toolsMD,
  setupBabelrc,
  headerIcon: "img/babel.svg",
  footerIcon: "img/babel.svg",
  favicon: "img/favicon.png",
  ogImage: "img/ogImage.png",
  colors: {
    primaryColor: "#323330",
    secondaryColor: "#323330",
  },
  blogSidebarCount: "ALL",
  highlight: {
    theme: "tomorrow",
    hljs: hljs => {
      hljs.registerLanguage("json5", hljs => hljs.getLanguage("javascript"));
    },
  },
  scripts: [
    {
      src: "/scripts/hmt.js",
      defer: true,
    },
    {
      src: "https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js",
      defer: true,
    },
    {
      src: "/js/code-blocks-buttons.js",
      defer: true,
    },
    {
      src: "/scripts/repl-page-hacks.js",
      defer: true,
    },
  ],
  // stylesheets: [ "" ],
  // translationRecruitingLink: "https://crowdin.com/project/",
  algolia: {
    apiKey: "c774535d6e962c2bca4c05c5068f39f4",
    indexName: "babeljs_cn",
  },
  disableHeaderTitle: true,
  onPageNav: "separate",
  gaTrackingId: "UA-114990275-1",
  cleanUrl: true,
  // These two options make the build insanely slow
  enableUpdateBy: false,
  enableUpdateTime: false,
  // ----
  scrollToTop: true,
  // markdownPlugins: [],
  // cname,
  // docsSideNavCollapsible: true,
};

module.exports = siteConfig;
