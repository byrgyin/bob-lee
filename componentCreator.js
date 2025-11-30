#!/usr/bin/env node
import path from "node:path";
import fs from "fs";
import chalk from "chalk";

const args = process.argv;

if (args.length === 2) {
  console.error(chalk.red("Arguments should be"));
  process.exit(0);
}

const __dirname = path.resolve();
const componentArg = args[2];
const componentName = args[3];

if (componentArg !== "components" && componentArg !== "page") {
  console.error(chalk.red(`Unknown Command ${componentArg}`));
  process.exit(0);
}

const pagePath = path.resolve(
  __dirname,
  "src",
  "pages",);

const componentFolder = path.resolve(
  __dirname,
  "src",
  "components",
  componentName
);

const autoAddComponent = path.resolve(
  __dirname,
  "src",
  "components.js"
);

const createComponent = () => {
  try {
    fs.accessSync(componentFolder, fs.constants.F_OK);
    console.error(chalk.red(`Component ${componentName} already exist`));
    process.exit(0);
  } catch {
    fs.mkdirSync(componentFolder);
  }

  const imageFolder = path.resolve(componentFolder, "images");
  fs.mkdirSync(imageFolder);

  const files = [
    {
      name: 'js',
      content: `import './${componentName}.scss';`
    },
    {
      name: 'scss',
      content: `.${componentName}{}`,
    },
    {
      name: 'pug',
      content: `mixin ${componentName}(data)\n  section.${componentName}`
    },
  ]

  for (const file of files) {
    fs.writeFileSync(
      path.resolve(componentFolder, `${componentName}.${file.name}`),
      file.content
    );
  }
  fs.writeFileSync(autoAddComponent, `\nimport './components/${componentName}/${componentName}.js';`, {flag: 'a'});
}
const createPage = () => {
  const pageFilePath = path.resolve(pagePath, `${componentName}.pug`);
  try {
    fs.accessSync(pageFilePath, fs.constants.F_OK);
    console.error(chalk.red(`Page ${componentName}.pug already exists`));
    process.exit(0);
  } catch {
    const page = {
      name: 'pug',
      content: `extends ../pug/layout.pug\n\nblock title \n  title ${componentName}\nblock content\n  h1 ${componentName}`,
    }
    fs.writeFileSync(
      path.resolve(pagePath, `${componentName}.${page.name}`),
      page.content
    );
  }
}

switch (componentArg) {
  case "page":
    createPage();
    break;
  case "components":
    createComponent();
    break;
  default:
    console.error(chalk.red(`Unknown Command ${componentArg}`));
    process.exit(0);
}