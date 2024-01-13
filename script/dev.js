const { spawn } = require('child_process');

// execute next dev
const nextDev = spawn('next', ['dev'], { stdio: 'inherit' });

// execute tsc --watch
const tscWatch = spawn('tsc', ['--watch'], { stdio: 'inherit' });

nextDev.on('close', (code) => {
    console.log(`next dev process exited with code ${code}`);
});

tscWatch.on('close', (code) => {
    console.log(`tsc --watch process exited with code ${code}`);
});
