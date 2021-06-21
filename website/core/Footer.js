const React = require("react");

class Footer extends React.Component {
  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>文档</h5>
            <a
              href={this.props.config.getDocUrl(
                "learn.html",
                this.props.language
              )}
            >
              学习 ES2015
            </a>
          </div>
          <div>
            <h5>社区</h5>
            <a
              href={this.props.config.getVideoUrl(
                "videos.html",
                this.props.language
              )}
            >
              视频
            </a>
            <a
              href={this.props.config.getPageUrl(
                "users.html",
                this.props.language
              )}
            >
              用户
            </a>
            <a
              href="http://stackoverflow.com/questions/tagged/babeljs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stack Overflow
            </a>
            <a href="https://babeljs.slack.com/">Slack 频道</a>
            <a
              href="https://twitter.com/babeljs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Twitter
            </a>
          </div>
          <div>
            <h5>更多</h5>
            <a href={this.props.config.baseUrl + "blog"}>博客</a>
            <a href="https://github.com/babel">GitHub 组织</a>
            <a href="https://github.com/babel/babel">GitHub 仓库</a>
            <a href="https://github.com/docschina/babeljs-cn">Website 仓库</a>
            <a href="https://old.babeljs.io">旧版网址 6.x</a>
            <a href="http://henryzoo.com/babel.github.io">旧版网址 5.x</a>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
