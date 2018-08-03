const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

class Users extends React.Component {
  render() {
    const showcase = siteConfig.users.map((user, i) => {
      return (
        <div className="babel-user" key={i}>
          <a className="babel-user-link" href={user.infoLink}>
            <img
              className="babel-user-logo"
              src={user.image}
              title={user.caption}
            />
          </a>
        </div>
      );
    });

    return (
      <div className="mainContainer">
        <Container padding={["bottom"]}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>谁在使用 Babel ?</h1>
              <p>
                项目的 Logo 由公司和项目代表提交。
                这些公司可能会或可能不会在其主要网站上使用 Babel，但他们肯定会在其组织的某个地方使用它。 🙂
              </p>
            </div>
            <hr />
            <div className="logos">{showcase}</div>
            <hr />
            <div className="prose">
              <p>
                你在使用该项目么? 请提交 500x200（2.5x1）的 Logo 一枚。{" "}
                <a href="https://jakearchibald.github.io/svgomg/">SVGO</a>
              </p>
              <p>并向我们表达出你对 Babel 的喜爱！</p>
              <br />
              <a
                href="https://github.com/babel/website/edit/master/website/data/users.yml"
                className="button"
              >
                提交 Pull Request！
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;
