import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import versions from "../../past-versions.json";

const Versions = () => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  const latestVersion = versions[0];
  const { repoUrl } = customFields;
  return (
    <Layout>
      <div className="docMainWrapper wrapper">
        <div className="mainContainer versionsContainer">
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
<<<<<<< HEAD:website/pages/en/versions.js
                    <a
                      href={
                        siteConfig.baseUrl + "docs/" + language + "/index.html"
                      }
                    >
                      文档
=======
                    <a href={siteConfig.baseUrl + "docs/" + "index.html"}>
                      Documentation
>>>>>>> 6f3a798ef90ebbb277153463a27655f15199c0f1:website/src/pages/versions.js
                    </a>
                  </td>
                  <td>
                    <a href={`${repoUrl}/releases/tag/v${latestVersion}`}>
                      Release Notes
                    </a>
                  </td>
                  <td>
                    <a href={`${siteConfig.baseUrl}${latestVersion}`}>
                      Blog Post
                    </a>
                  </td>
<<<<<<< HEAD:website/pages/en/versions.js
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
                  <th>main</th>
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
=======
>>>>>>> 6f3a798ef90ebbb277153463a27655f15199c0f1:website/src/pages/versions.js
                  <td>
                    <a href={repoUrl}>Source Code</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>This is the current stable version of the project.</p>
            {versions && versions.length > 1 && (
              <div>
                <a name="archive" />
                <h3>Past Versions</h3>
                <table className="versions">
                  <tbody>
                    {versions.map(
                      version =>
                        version !== latestVersion && (
                          <tr key={version}>
                            <th>{version}</th>
                            <td>
                              <a href={`${repoUrl}/releases/tag/v${version}`}>
                                Release Notes
                              </a>
                            </td>
                            <td>
                              <a href={`${siteConfig.baseUrl}${version}`}>
                                Blog Post
                              </a>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
                <table className="versions">
                  <tbody>
                    <tr>
                      <th>6.26.3</th>
                      <td>
                        <a href={customFields.v6Url}>Documentation</a>
                      </td>
                      <td>
                        <a href={`${repoUrl}/releases/tag/v6.26.3`}>
                          Release Notes
                        </a>
                      </td>
                      <td>
                        <a href={`${siteConfig.baseUrl}6.23.0`}>Blog Post</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Versions;
