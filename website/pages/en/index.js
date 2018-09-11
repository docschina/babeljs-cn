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

const MiniRepl = ({ language }) => {
  return (
    <div className="hero-repl" hidden={true}>
      <div className="hero-repl__editor">
        <div className="hero-repl__pane hero-repl__pane--left">
          <h3>
            输入下一代 JavaScript 代码
          </h3>
          <div id="hero-repl-in" className="hero-repl__code" />
        </div>
        <div className="hero-repl__pane hero-repl__pane--right">
          <h3>
          获取浏览器兼容的 JavaScript 代码
          </h3>
          <div id="hero-repl-out" className="hero-repl__code" />
          <div className="hero-repl__error" />
        </div>
      </div>
      <div className="hero-repl__footer">
        <a href={siteConfig.getPageUrl("repl.html", language)}>
          查看我们的 REPL 以更多地体验 Babel ！
        </a>
      </div>

      <script
        src="https://unpkg.com/babel-standalone@6/babel.min.js"
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

// const SpecialSponsors = () => {
//   return (
//     <div className="productShowcaseSection sponsors-special">
//       <p>Special Sponsors</p>
//       <div className="sponsors-special-logos">
//         {siteConfig.sponsors
//           .filter(sponsor => sponsor.type == "special")
//           .map((sponsor, i) => {
//             return (
//               <a href={sponsor.url} target="_blank" key={i}>
//                 <img src={sponsor.image} title={sponsor.name} />
//               </a>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

const GetStarted = ({ language }) => {
  return (
    <div
      className="blockElement twoByGridBlock get-started"
      style={{ flexBasis: "60%", margin: 0 }}
    >
      <h2>欢迎！</h2>

      <p>
        我们只是一个小的<a href={siteConfig.getPageUrl("team.html", language)}>志愿者</a>团体，在业余时间维护这个项目。如果 Babel 使您再工作中获益，那么成为贡献者可能是一种非常好的回馈方式。
      </p>
      <p>
      通过阅读入门指南或观看有关其内部概念的会议视频，了解有关Babel的更多信息。
      </p>
      <PromoSection>
        <Button href={siteConfig.getDocUrl("index.html", language)}>入门指南</Button>
        <Button href={siteConfig.getPageUrl("videos.html", language)}>会议视频</Button>
      </PromoSection>
    </div>
  );
};

const WorkSponsors = () => {
  return (
    <div
      className="blockElement alignCenter twoByGridBlock sponsors-work"
      style={{ flexBasis: "40%", margin: 0 }}
    >
      <h2>开源伙伴</h2>
      <p style={{ fontSize: 16 }}>
        这些公司非常棒，并派出这些工程师在支持 Babel 的工作
      </p>
      <div className="productShowcaseSection">
        <div className="cards">
          {siteConfig.sponsors
            .filter(sponsor => {
              return sponsor.type == "work";
            })
            .map((sponsor, i) => {
              return (
                <div className="card" key={i}>
                  <a href={sponsor.url} target="_blank" className="card-image">
                    <img
                      src={sponsor.image}
                      title={sponsor.name}
                      alt={`Sponsored by ${sponsor.name}`}
                    />
                  </a>
                  <div className="card-text">
                    <p>
                      {sponsor.description}
                    </p>
                  </div>
                  <div className="card-text">
                    <p>
                      发起者{" "}
                      <a href={`https://github.com/${sponsor.member}`}>
                        @{sponsor.member}
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const SponsorTier = props => {
  const tierSponsors = siteConfig.sponsors.filter(
    sponsor => sponsor.type == props.type && sponsor.tier === props.tier
  );
  return (
    <div>
      <h3>{props.title}</h3>
      <ul className={`sponsors-tier tier-${props.tier}`}>
        {tierSponsors.map((sponsor, i) => (
          <li key={i}>
            <a href={sponsor.url} title={sponsor.name}>
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

const OpenCollectiveSponsors = ({ language }) => {
  const ocButton = {
      title: "成为赞助商",
      link: "https://opencollective.com/babel",
    },
    patreonButton = {
      title: "参与众筹",
      link: "https://www.patreon.com/bePatron?u=905738",
    };

  return (
    <div className="container paddingTop paddingBottom">
      <div className="wrapper productShowcaseSection">
        <div className="support-the-team">
          <h2>支持我们团队</h2>
          <p>
            Babel 正在帮助 JavaScript 语言本身塑造其未来版本，被用于 Facebook，Google，Netflix等<a href={siteConfig.getPageUrl("users.html", language)}>数百家公司的产品当中</a>。你的赞助将支付给 TC39（制订 JavaScript 规范的委员会）用于组织会议等费用，并会直接支持核心开发团队人员继续努力改进 Babel 。
          </p>
          <PromoSection>
            <Button href="https://opencollective.com/babel" target="_blank">
              成为赞助商
            </Button>
          </PromoSection>
        </div>
        <div className="sponsor-tiers" id="sponsors">
          <SponsorTier
            type="opencollective"
            title="金牌赞助（Open Collective）"
            tier="gold-sponsors"
            button={ocButton}
          />
          <SponsorTier
            type="patreon"
            title="金牌赞助（众筹）"
            tier="gold-sponsors"
            button={patreonButton}
          />
          <SponsorTier
            type="opencollective"
            title="银牌赞助（Open Collective）"
            tier="silver-sponsors"
            button={ocButton}
          />
          <SponsorTier
            type="patreon"
            title="Silver Sponsors (Patreon)"
            tier="silver-sponsors"
            button={patreonButton}
          />
          <SponsorTier
            type="other"
            title="Misc Sponsors"
            tier="other-sponsors"
          />
        </div>
      </div>
    </div>
  );
};

const HomeContainer = props => (
  <div
    className="container paddingTop paddingBottom"
    style={{ backgroundColor: "#f6f6f6" }}
  >
    <div className="wrapper">
      <div className="gridBlock">{props.children}</div>
    </div>
  </div>
);

const Hero = ({ language }) => (
  <div className="hero">
    <a href="https://tidelift.com/subscription/npm/babel">
      <div className="tidelift-banner">获取更加专业的 Babel</div>
    </a>
    <div className="hero__container">
      <h1>Babel 是 JavaScript 编译器。</h1>
      <p>今天就开始使用下一代 JavaScript 语法吧！</p>
      <div className="hero__announcement">
        <span>
          <strong>Babel 7 发布!</strong> 请阅读我们的{" "}
          <a href="/blog/2018/08/27/7.0.0">公告</a> 以及{" "}
          <a href={siteConfig.getDocUrl("v7-migration", language)}>
            升级指南
          </a>{""}
          了解更多详情。
        </span>
      </div>
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
          <WorkSponsors language={language} />
        </HomeContainer>
        <OpenCollectiveSponsors />
      </div>
    </div>
  );
};

module.exports = Index;
