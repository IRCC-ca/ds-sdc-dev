const { exec } = require('child_process');
const args = process.argv.slice(2)[0];
// Set the directory path
// const directoryPath = './ds-sdc-dev';
const MAIN_INSTALL = "npm run install:component-library";
const CL_INSTALL = "npm run install:component-lib";
const CORE_INSTALL = "npm run install:component-core";
console.log("Note, please ensure you have deleted all node_module folders before continuing! \nStarting tests...\n");

const mainOrder = [MAIN_INSTALL, CL_INSTALL];
const altOrder = [CL_INSTALL, MAIN_INSTALL];
var order = [];

const storedTimes = [];
switch (args) {
    case 'mainOrder':
        order = mainOrder;
        break;

    case 'altOrder':
        order = altOrder;
        break;

    default:
        console.log('Invalid Arguments, aborting...');
        process.exit();
}

main();

function main() {
    executeTestsSequentially(0);
}

function executeTestsSequentially(caseNumber) {
    if (caseNumber < order.length) {
        mainScript(order[caseNumber], caseNumber, () => {
            executeTestsSequentially(caseNumber + 1);
        });
    } else {
        printTotals();
    }
}

function mainScript(commands, caseNumber, callback) {
    console.log('Command run was ', commands);
    const startTime = Date.now(); // Start the timer

    exec(`${commands}`, (error, stdout, stderr) => {
        const endTime = Date.now(); // End the timer
        const elapsedTime = getTotalTime(startTime, endTime);

        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stdout) {
            console.log(`stdout: ${stdout}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        
        storedTimes[caseNumber] = elapsedTime;
        console.log(`Complete. Timer for ${commands} was: ${elapsedTime}`);
        callback(); // Proceed to next command
    });
}

function getTotalTime(start, end) {
    let milliseconds = end - start;
    let totalSeconds = milliseconds / 1000;
    let seconds = Math.floor(totalSeconds % 60);
    let millisecondsRemaining = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 1000);
    let minutes = Math.floor(totalSeconds / 60);

    seconds = seconds.toString().padStart(2, '0');
    millisecondsRemaining = millisecondsRemaining.toString().padStart(3, '0');

    return `${minutes}:${seconds}.${millisecondsRemaining}`;
}

function printTotals() {
    let i = 0;
    console.log('Times: \n');
    order.forEach(caseName => {
        console.log(caseName, ': ', storedTimes[i], '\n');
        i++;
    });
}
