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
      <h3>欢迎！</h3>
      <p>
        在入门指南中可以了解有关 Babel 的更多信息，或查看有关其概念的相关讨论。
      </p>
      <p>
        我们只是一个小的
        <a href={siteConfig.getPageUrl("team.html", language)}>志愿者</a>
        团体，在业余时间维护这个项目。如果 Babel
        使您再工作中获益，那么成为贡献者可能是一种非常好的回馈方式！
      </p>
      <PromoSection>
        <Button href={siteConfig.getDocUrl("index.html", language)}>
          入门指南
        </Button>
        <Button href={siteConfig.getPageUrl("videos.html", language)}>
          会议视频
        </Button>
      </PromoSection>
    </div>
  );
};

// const WorkSponsors = () => {
//   return (
//     <div
//       className="blockElement alignCenter twoByGridBlock sponsors-work"
//       style={{ flexBasis: "40%", margin: 0 }}
//     >
//       <h2>Friends of Open Source</h2>
//       <p style={{ fontSize: 16 }}>
//         These companies are awesome and pay these engineers to work on Babel
//       </p>
//       <div className="productShowcaseSection">
//         <div className="cards">
//           {siteConfig.sponsors
//             .filter(sponsor => {
//               return sponsor.type == "work";
//             })
//             .map((sponsor, i) => {
//               return (
//                 <div className="card" key={i}>
//                   <a href={sponsor.url} target="_blank" className="card-image">
//                     <img
//                       src={sponsor.image}
//                       title={sponsor.name}
//                       alt={`Sponsored by ${sponsor.name}`}
//                     />
//                   </a>
//                   <div className="card-text">
//                     <p>{sponsor.description}</p>
//                   </div>
//                   <div className="card-text">
//                     <p>
//                       sponsoring{" "}
//                       <a href={`https://github.com/${sponsor.member}`}>
//                         @{sponsor.member}
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// };

const SponsorTier = props => {
  const tierSponsors = siteConfig.sponsors.filter(
    sponsor => sponsor.type == props.type && sponsor.tier === props.tier
  );
  return (
    <div>
      <ul className={`sponsors-tier tier-${props.tier}`}>
        {tierSponsors.map((sponsor, i) => (
          <li key={i}>
            <a href={sponsor.url} title={sponsor.name} target="_blank">
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
          <h3>Patreon Sponsors</h3>
          <SponsorTier
            type="patreon"
            title="金牌赞助（众筹）"
            tier="gold-sponsors"
          />
          <SponsorTier
            type="patreon"
            title="Silver Sponsors (Patreon)"
            tier="silver-sponsors"
          />
          <SponsorTier
            type="other"
            title="Misc Sponsors"
            tier="other-sponsors"
            button={patreonButton}
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
          <strong>Babel 7 发布!</strong> 请阅读我们的{" "}
          <a href="/blog/2018/08/27/7.0.0">公告</a> 以及{" "}
          <a href={siteConfig.getDocUrl("v7-migration", language)}>升级指南</a>
          {""}
          了解更多详情。
        </span>
      </div>
      <MiniRepl language={language} />

      <h3>Special Sponsor</h3>

      <div class="sponsors-tier" style={{ margin: "10px 0" }}>
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
