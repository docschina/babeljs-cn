const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const translate = require("../../server/translate.js").translate;
const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;
const siteConfig = require(process.cwd() + "/siteConfig.js");
const setupBabelrc = siteConfig.setupBabelrc;
const toolsMD = siteConfig.toolsMD;

const SetupHeader = () => {
  return (
    <div className="page-header text-center">
      <h1>
        使用 Babel
      </h1>
      <p>
        教你如何在使用 Babel 时选择工具
      </p>
    </div>
  );
};

const SetupSelectButton = props => {
  const showTools = Object.keys(props.types.items).map((tool, j) => {
    return (
      <a
        key={j}
        data-title={tool}
        href="#installation"
        className="tools-button"
      >
        {props.types.items[tool]}
      </a>
    );
  });
  return (
    <div className="tools-group">
      <h5>{props.types.name}</h5>
      {showTools}
    </div>
  );
};

const SetupOptions = () => {
  const tools = siteConfig.tools;
  const showCase = tools.map((types, i) => {
    return <SetupSelectButton key={i} types={types} />;
  });
  return (
    <div className="step-setup">
      <h2>
        <span className="step-no">1</span>
        选择你的工具 (尝试 CLI)
      </h2>
      {showCase}
    </div>
  );
};

const StepInstallAndUsage = props => {
  const markdownsElement = toolsMD.map((tool, index) => (
    <div className="items" data-title={tool.title} key={index}>
      <MarkdownBlock key={index}>{tool[props.name]}</MarkdownBlock>
    </div>
  ));
  const installation = (
    <translate desc="setup page - step 2">Installation</translate>
  );
  const usage = <translate desc="setup page - step 3">Usage</translate>;
  return (
    <div className="step-hidden step-setup">
      <h2 id={props.name === "install" ? "installation" : ""}>
        <span className="step-no">{props.number}</span>
        {props.name === "install" ? "安装" : "用法"}
      </h2>
      {markdownsElement}
    </div>
  );
};

const StepFour = () => {
  return (
    <div className="step-hidden step-setup">
      <h2>
        <span className="step-no">4</span>
        {"创建"}
        <code>.babelrc</code>
        {" 配置文件"}
      </h2>
      <MarkdownBlock>{setupBabelrc}</MarkdownBlock>
    </div>
  );
};

const SetupContent = () => {
  return (
    <Container padding={["bottom"]}>
      <div className="step">
        <SetupOptions />
        <StepInstallAndUsage name="install" number="2" />
        <StepInstallAndUsage name="usage" number="3" />
        <StepFour />
      </div>
    </Container>
  );
};

class Setup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const time = new Date().getTime();
    return (
      <div className="mainContainer">
        <SetupHeader />
        <SetupContent />
        <script src={`${siteConfig.baseUrl}scripts/tools.js?t=${time}`} />
      </div>
    );
  }
}

module.exports = Setup;
