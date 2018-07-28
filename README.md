# [babel/website](https://babeljs.io)

[![CircleCI](https://img.shields.io/circleci/token/5917ed1a8019c7e3987cfc2d2c181688ccfca5b2/project/github/QC-L/babeljs.cn/cn-v7.svg?style=flat-square)](https://circleci.com/gh/QC-L/babeljs.cn/tree/cn-v7)

This is the source for the [babeljs.io](https://babeljs.io) website; feel free to suggest changes to our docs!

> We're just switched over to a new site using https://docusaurus.io so there might be a few issues to fix

- Current site: `master` branch is deployed to https://babeljs.io
- Old site: `old-site` branch is deployed to https://old.babeljs.io

### Setup

```bash
$ git clone git@github.com:babel/website.git
$ yarn && yarn start
```

* Just run `npm start` next time (check the Makefile and the package.json).

### Contributing to the website

To keep documentation in sync across all of Babel's packages, the docs are now directly located in this repository. The READMEs in [`babel/babel`](https://github.com/babel/babel) are [auto generated](https://github.com/babel/babel/blob/master/scripts/generators/readmes.js) and point to this documentation.

#### Looking for support?

For questions and support on contributing please join our [Slack community](https://slack.babeljs.io/), channel `#website` or directly [here](https://babeljs.slack.com/messages/website/).
