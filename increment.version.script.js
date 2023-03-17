const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'component-library', 'component-lib', 'package.json');
const packageJson = require(packageJsonPath);

let version = packageJson.version;
const isBeta = process.argv.includes('--beta');

if (isBeta && !version.includes('-beta')) {
  version += '-beta.0';
} else if (isBeta && version.includes('-beta.')) {
  const versionParts = version.split('.');
  versionParts[versionParts.length - 1]++;
  // const betaIndex = versionParts.findIndex(part => part.includes('-beta'));
  // const betaParts = versionParts[betaIndex].split('-');
  // const decimalPlaces = betaParts[1].substring(1).length;
  // const increment = 1 / Math.pow(10, decimalPlaces);
  // const newVersion = (parseFloat(betaParts[1]) + increment).toFixed(decimalPlaces);
  // versionParts[betaIndex] = `beta.${newVersion}`;
  version = versionParts.join('.');
} else if (!isBeta && version.includes('-beta')) {
  const versionParts = version.split('-');
  version = versionParts[0];
} else {
  const versionParts = version.split('.');
  versionParts[versionParts.length - 1]++;
  version = versionParts.join('.');
}

packageJson.version = version;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Updated package version to ${version}`);
