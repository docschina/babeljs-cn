const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

const VideosItem = props => {
  return (
    <div className="babel-videos">
      <div className="babel-video-play">
        <iframe src={props.video.link} allowFullScreen />
      </div>
      <div className="babel-video-block">
        <h4 id="babel-video-title">{props.video.title}</h4>
        <CategoryInfo video={props.video} />
      </div>
    </div>
  );
};

const CategoryInfo = props => {
  return (
    <p className="text-muted">
      {" by "}
      <CategoryLink
        author_link={props.video.author_link}
        author={props.video.author}
      />
      {" at "}
      <CategoryLink
        event_link={props.video.event_link}
        event={props.video.event}
      />
      <time dateTime={props.video.year}>{` (${props.video.year})`}</time>
    </p>
  );
};

const CategoryLink = props => {
  const link = props.author_link || props.event_link;
  const content = props.author || props.event;
  return (
    <a href={link} target="_blank" rel="noreferrer noopener">
      {content}
    </a>
  );
};

class Videos extends React.Component {
  render() {
    const showcase = siteConfig.videos.map((category, i) => {
      function compare(property) {
        return function(a, b) {
          const value1 = a[property];
          const value2 = b[property];
          return value2 - value1;
        };
      }
      const videos = category.items.sort(compare("year")).map((video, j) => {
        return <VideosItem key={j} video={video} />;
      });
      return (
        <div className="videos-container" key={i}>
          <h2>{category.category}</h2>
          {videos}
        </div>
      );
    });

    return (
      <div className="mainContainer">
        <div className="page-header text-center">
          <h1>视频</h1>
          <p className="lead">关于 Babel 及其基本概念的视频和播客。</p>
        </div>
        <Container className="video-wrapper" padding={["bottom"]}>{showcase}</Container>
      </div>
    );
  }
}

module.exports = Videos;
