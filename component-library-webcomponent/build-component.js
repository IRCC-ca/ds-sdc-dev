const fs = require("fs-extra");
const concat = require("concat");

build = async () => {
  var dir = "./dist";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const files = [
    "./dist/component-library-webcomponent/runtime.js",
    "./dist/component-library-webcomponent/polyfills.js",
    "./dist/component-library-webcomponent/polyfills.js",
    "./dist/component-library-webcomponent/main.js",
  ];

  await fs.ensureDir("./dist/components");
  await concat(files, "./dist/components/ircc-cl-lib.js");
};
build();
