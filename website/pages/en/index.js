const React = require("react");
const translate = require("../../server/translate.js").translate;
const siteConfig = require(process.cwd() + "/siteConfig.js");

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self",
};

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const DummyMiniRepl = () => {
  return <div className="dummy-hero-repl" />;
};
const MiniRepl = () => {
  return (
    <div className="hero-repl" hidden={true}>
      <div className="hero-repl__editor">
        <div className="hero-repl__pane hero-repl__pane--left">
          <h3>请输入下一代 JavaScript 代码</h3>
          <div id="hero-repl-in" className="hero-repl__code" />
        </div>
        <div className="hero-repl__pane hero-repl__pane--right">
          <h3>获取浏览器兼容的 JavaScript 代码</h3>
          <div id="hero-repl-out" className="hero-repl__code" />
          <div className="hero-repl__error" />
        </div>
      </div>

      <script
        src="https://unpkg.com/@babel/standalone@^7.0.0/babel.min.js"
        defer={true}
      />
      <script
        src="https://unpkg.com/ace-builds@1.3.3/src-min-noconflict/ace.js"
        defer={true}
      />
      <script src={`${siteConfig.baseUrl}js/build/minirepl.js`} defer={true} />
    </div>
  );
};

const GetStarted = ({ language }) => {
  return (
    <div
      className="blockElement"
      style={{
        fontSize: "18px",
        maxWidth: "800px",
        padding: "45px 0 7px",
        margin: "0 auto",
      }}
    >
      <p>
        想了解更多关于 Babel 的信息，请阅读{" "}
        <a href={siteConfig.getDocUrl("index.html", language)}>
          入门指南
        </a>{" "}
        或者翻阅{" "}
        <a href={siteConfig.getPageUrl("videos.html", language)}>视频</a>{" "}
        了解更多关于 Babel 的故事
      </p>
    </div>
  );
};

const HomeContainer = props => (
  <div
    className="container"
    style={{ backgroundColor: "#f6f6f6", paddingBottom: 20 }}
  >
    <div className="wrapper">
      <div className="gridBlock">{props.children}</div>
    </div>
  </div>
);

const Hero = ({ language }) => (
  <div className="hero">
    <a href="https://teespring.com/babel-christmas?pr=FLAVORTOWN">
      <div className="homepage-banner">获取 Babel 的假日服饰👕</div>
    </a>
    <div className="hero__container">
      <h1>
        <translate>Babel 是一个 JavaScript compiler。</translate>
      </h1>
      <p>
        <translate>现在就开始使用下一代 JavaScript 语法吧。</translate>
      </p>

      <div className="hero__announcement">
        <span>
          <strong>Babel 7.13 发布！</strong> 请阅读我们的{" "}
          <a href="blog/2021/02/22/7.13.0">博客公告</a> 以及{" "}
          <a href="https://github.com/babel/babel/releases/tag/v7.13.0">changelog</a> 了解更多详情！
      </span>
      </div>

      <DummyMiniRepl />
      <MiniRepl language={language} />
    </div>
  </div>
);

const Index = ({ language }) => {
  return (
    <div>
      <Hero language={language} />

      <div className="mainContainer" style={{ padding: 0 }}>
        <HomeContainer>
          <GetStarted language={language} />
        </HomeContainer>
      </div>
    </div>
  );
};

module.exports = Index;
