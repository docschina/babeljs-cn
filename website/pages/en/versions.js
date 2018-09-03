const React = require("react");

const CompLibrary = require("../../core/CompLibrary");
const Container = CompLibrary.Container;

const CWD = process.cwd();

const siteConfig = require(CWD + "/siteConfig.js");
const versions = require(CWD + "/versions.json");

class Versions extends React.Component {
  render() {
    const language = this.props.language || "en";
    const latestVersion = versions[0];
    const repoUrl = `https://github.com/${siteConfig.organizationName}/${
      siteConfig.projectName
    }`;
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer versionsContainer">
          <div className="post">
            <header className="postHeader">
              <h2>{siteConfig.title + " 版本"}</h2>
            </header>
            <p>该项目的新版本将定期发布。</p>
            <a name="latest" />
            <h3>当前版本（稳定版）</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>{latestVersion}</th>
                  <td>
                    <a
                      href={
                        siteConfig.baseUrl + "docs/" + language + "/index.html"
                      }
                    >
                      文档
                    </a>
                  </td>
                  <td>
                    <a href={`${repoUrl}/releases/tag/v${latestVersion}`}>
                      Release Notes
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>这是该项目当前的稳定版本。</p>
            <a name="rc" />
            <h3>预发布版本</h3>
            <p>这是尚未发布的最新变更版本。</p>
            <table className="versions">
              <tbody>
                <tr>
                  <th>master</th>
                  <td>
                    <a
                      href={
                        siteConfig.baseUrl +
                        "docs/" +
                        language +
                        "/next" +
                        "/index.html"
                      }
                    >
                      文档
                    </a>
                  </td>
                  <td>
                    <a href={repoUrl}>Source Code</a>
                  </td>
                </tr>
              </tbody>
            </table>
            {versions &&
              versions.length > 1 && (
                <div>
                  <a name="archive" />
                  <h3>Past Versions</h3>
                  <table className="versions">
                    <tbody>
                      {versions.map(
                        version =>
                          version !== latestVersion && (
                            <tr>
                              <th>{version}</th>
                              <td>
                                <a
                                  href={
                                    siteConfig.baseUrl +
                                    "docs/" +
                                    language +
                                    "/" +
                                    version +
                                    "/index.html"
                                  }
                                >
                                  Documentation
                                </a>
                              </td>
                              <td>
                                <a href={`${repoUrl}/releases/tag/v${version}`}>
                                  Release Notes
                                </a>
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Versions;
