/**
 * This script updates the version number of the package.json. 
 * 
 * When adding a beta tag to a version that does not already have one, the version is
 * incremeneted by 1 and the '-beta.0' tag is added. 
 * 
 * When -beta is not included in the input and the version number already contains one,
 * the '-beta.x' is dropped and the version number is NOT incremented.
 */

const fs = require('fs');
const path = require('path');

const isBeta = process.argv.includes('--beta');
const library = process.argv.includes('--cl');

let packageJsonPath = '';
if (library) {
  packageJsonPath = path.join(__dirname, 'component-library', 'component-lib', 'package.json');
} else {
  packageJsonPath = path.join(__dirname, 'core-library', 'package.json');
}
const packageJson = require(packageJsonPath);
let version = packageJson.version;

if (isBeta) { //if --beta
  if (!version.includes('-beta.')) {
    const versionParts = version.split('.');
    versionParts[versionParts.length - 1]++;
    version = versionParts.join('.');
    version += '-beta.0';
  } else {
    const versionParts = version.split('-beta.');
    versionParts[versionParts.length - 1]++;
    version = versionParts.join('-beta.');
  }
} else { //if not --beta
  if (!version.includes('-beta.')) {
    const versionParts = version.split('.');
    versionParts[versionParts.length - 1]++;
    version = versionParts.join('.');
  } else {
    console.log(isBeta, version.includes('-beta.'));
    const versionParts = version.split('-beta.');
    version = versionParts[0];
  }
}

packageJson.version = version;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Updated package version to ${version}`);
