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
        <a href={siteConfig.getDocUrl("index.html", language)}>入门指南</a>{" "}
        或者翻阅{" "}
        <a href={siteConfig.getPageUrl("videos.html", language)}>视频</a>{" "}
        了解更多关于 Babel 的故事
      </p>
    </div>
  );
};

const SponsorTier = props => {
  let { min, max } = props;
  const tierSponsors = siteConfig.sponsors.filter(sponsor => {
    let value = Math.max(sponsor.monthly, (sponsor.yearly || 0) / 12);
    return +value >= min && (!max || (max && +value < max));
  });
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        are currently pledging or have donated an average of{" "}
        {max ? `$${min}-$${max}` : `>$${min}`}
        /month in the last year{" "}
      </div>
      <br />
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

const ocButton = {
  title: "Become a sponsor",
  link: "https://opencollective.com/babel",
};

const OpenCollectiveSponsors = ({ language }) => {
  return (
    <div className="container paddingBottom">
      <div className="wrapper productShowcaseSection">
        <h3>Current Sponsors</h3>
        <p>
          We&apos;re a small group of{" "}
          <a href={siteConfig.getPageUrl("team.html", language)}>volunteers</a>{" "}
          that spend their free time maintaining this project, funded by the
          community. If Babel has benefited you in your work, becoming a{" "}
          <a href="https://github.com/babel/babel/blob/main/CONTRIBUTING.md">
            contributor
          </a>{" "}
          or <a href="https://opencollective.com/babel">sponsoring</a> might
          just be a great way to give back!
        </p>
        <div className="sponsor-tiers" id="sponsors">
          <SponsorTier
            type="opencollective"
            title="Base Support"
            tier="base-support-sponsors"
            min={2000}
          />
          <SponsorTier
            type="opencollective"
            title="Gold"
            tier="gold-sponsors"
            min={1000}
            max={2000}
          />
          <SponsorTier
            type="opencollective"
            title="Silver"
            tier="silver-sponsors"
            min={500}
            max={1000}
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
      <div className="homepage-banner">获取 Babel 的假日服饰 👕</div>
    </a>
    <div className="hero__container">
      <h1>
        <translate>Babel 是一个 JavaScript 编译器。</translate>
      </h1>
      <p>
        <translate>现在就开始使用下一代 JavaScript 语法吧。</translate>
      </p>

      <div className="hero__announcement">
        <span>
<<<<<<< HEAD
          <strong>Babel 7.15 已发布！</strong> 请阅读我们的{" "}
          <a href="blog/2021/07/26/7.15.0">博客公告</a> 了解亮点以及{" "}
          <a href="https://github.com/babel/babel/releases/tag/v7.15.0">
            更新日志
=======
          <strong>Babel 7.16 is released!</strong> Please read our{" "}
          <a href="blog/2021/10/29/7.16.0">blog post</a> for highlights and{" "}
          <a href="https://github.com/babel/babel/releases/tag/v7.16.0">
            changelog
>>>>>>> d8b296e04760a272dd59fc5fb1418587f429fba3
          </a>{" "}
          了解更多详情！
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
