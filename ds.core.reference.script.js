/**
* This script updates the path to the DS-Core in the package.json.
*/

const DS_CORE_DESTINATION_PROJECT = "file:../../core-library";
const DS_CORE_DESTINATION_LAB6 = "file:../../ircc-ds-core-library";//This is WRONG

const fs = require('fs');
const path = require('path');

const dsPath = path.join(__dirname, 'core-library', 'package.json');
const DS_CORE_DESTINATION_PUBLISH = dsPath.version;


const library = process.argv.includes('--cl');
const lab6 = process.argv.includes('--lab6');

let packageJsonPath = '';


if (library) {
    packageJsonPath = path.join(__dirname, 'component-library', 'component-lib', 'package.json');
} else {
    packageJsonPath = dsPath;
}
const packageJson = require(packageJsonPath);

//NOTE: This defaults the destination to the DS-CORE to the Lab 6 version if the 
//lab6 flag is passed in and something has gone wrong, the project version if not.
if (library) {
    let dsDependancyPath = packageJson.peerDependencies['@ircc-ca/ds-sdc-core'];
    console.log(dsDependancyPath);
    if (lab6) {
        switch (dsDependancyPath) {
            case DS_CORE_DESTINATION_PROJECT:
                dsDependancyPath = DS_CORE_DESTINATION_LAB6;
                break;

            case DS_CORE_DESTINATION_LAB6:
                dsDependancyPath = DS_CORE_DESTINATION_PROJECT;
                break;

            default:
                dsDependancyPath = DS_CORE_DESTINATION_LAB6;
        }
    } else {
        switch (dsDependancyPath) {
            case DS_CORE_DESTINATION_PROJECT:
                dsDependancyPath = DS_CORE_DESTINATION_PUBLISH;
                break;

            case DS_CORE_DESTINATION_PUBLISH:
                dsDependancyPath = DS_CORE_DESTINATION_PROJECT;
                break;

            default:
                dsDependancyPath = DS_CORE_DESTINATION_PROJECT;
        }
    }
    packageJson.peerDependencies['@ircc-ca/ds-sdc-core'] = dsDependancyPath;
}


fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Path to DS-Core changed to ', packageJson.peerDependencies['@ircc-ca/ds-sdc-core']);