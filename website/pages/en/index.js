const React = require("react");
// const translate = require("../../server/translate.js").translate;
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

const MiniRepl = () => {
  return (
    <div className="hero-repl" hidden={true}>
      <div className="hero-repl__editor">
        <div className="hero-repl__pane hero-repl__pane--left">
          <h3>输入下一代 JavaScript 代码</h3>
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
        了解更多关于 Babel 的信息{" "}
        <a href={siteConfig.getDocUrl("index.html", language)}>
          入门指南
        </a>{" "}
        或者翻阅{" "}
        <a href={siteConfig.getPageUrl("videos.html", language)}>视频</a>
        了解更多关于 Babel 的故事
      </p>
      <p>
        我们只是一个小的
        <a href={siteConfig.getPageUrl("team.html", language)}>志愿者</a>{" "}
        在社区的赞助下，业余时间维护这个项目。
        如果 Babel 在你工作中使你受益颇丰，可以成为
        <a href="https://github.com/babel/babel/blob/master/CONTRIBUTING.md">
          贡献者
        </a>{" "}
        或者也可以<a href="https://opencollective.com/babel">赞助</a>我们！
      </p>
    </div>
  );
};

const SponsorTier = props => {
  const tierSponsors = siteConfig.sponsors.filter(
    sponsor => sponsor.type == props.type && sponsor.tier === props.tier
  );
  return (
    <div>
      <ul className={`sponsors-tier tier-${props.tier}`}>
        {tierSponsors.map((sponsor, i) => (
          <li key={i}>
            <a
              href={sponsor.url}
              title={sponsor.name}
              target="_blank"
              rel="noopener sponsored"
            >
              <img src={sponsor.image} alt={`Sponsored by ${sponsor.name}`} />
            </a>
          </li>
        ))}
      </ul>
      {props.button ? (
        <PromoSection>
          <Button href={props.button.link} target="_blank">
            {props.button.title}
          </Button>
        </PromoSection>
      ) : null}
    </div>
  );
};

const OpenCollectiveSponsors = () => {
  const ocButton = {
      title: "成为赞助商",
      link: "https://opencollective.com/babel",
    },
    patreonButton = {
      title: "成为赞助人",
      link: "https://www.patreon.com/join/henryzhu",
    };

  return (
    <div className="container paddingBottom">
      <div className="wrapper productShowcaseSection">
        <div className="sponsor-tiers" id="sponsors">
          <h3>Open Collective Sponsors</h3>
          <SponsorTier
            type="opencollective"
            title="Base Support Sponsors"
            tier="base-support-sponsor"
          />
          <SponsorTier
            type="opencollective"
            title="金牌赞助（Open Collective）"
            tier="gold-sponsors"
          />
          <SponsorTier
            type="opencollective"
            title="Silver Sponsors (Open Collective)"
            tier="silver-sponsors"
            button={ocButton}
          />
        </div>
      </div>
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
      <h1>Babel 是 JavaScript 编译器。</h1>
      <p>今天就开始使用下一代 JavaScript 语法吧！</p>
      <div className="hero__announcement">
        <span>
          <strong>Babel 7.12 发布！</strong> 请阅读我们的{" "}
          <a href="blog/2020/10/15/7.12.0">博客公告</a> 以及{" "}
          <a href="https://github.com/babel/babel/releases/tag/v7.12.0">changelog</a> 了解更多详情！
        </span>
      </div>
      <MiniRepl language={language} />

      <h3>Special Sponsor</h3>

      <div className="sponsors-tier" style={{ margin: "10px 0" }}>
        <a href="https://www.handshake.org" title="Handshake" target="_blank">
          <img
            src="https://handshake.org/images/landing/logo-light.svg"
            alt="Sponsored by Handshake"
            style={{ width: 180 }}
          />
          <div style={{ color: "#b7b8b7" }}>
            Decentralized certificate authority and naming
          </div>
        </a>
      </div>
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
          {
            // <WorkSponsors language={language} />
          }
        </HomeContainer>
        <OpenCollectiveSponsors />
      </div>
    </div>
  );
};

module.exports = Index;
