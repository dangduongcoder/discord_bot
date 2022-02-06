//file update này được xin từ kb2abot
//src: https://github.com/kb2ateam/kb2abot/blob/c8a115c8f2d65fadf3bdb3667b9bd2570ba8cd5d/scripts/update.js

const fs = require('fs')
const path = require('path')
const git = require('simple-git')()
const decache = require('decache')
const { execShellCommand } = require('./tools.js')
;(async () => {
    const initResult = await git.init()
    console.log('Initing git remote . . .')
    if (!initResult.existing) {
        await git.addRemote('origin', 'https://github.com/Citnut/demoProject')
    }
    const { dependencies } = require('../package.json')
    console.log('Fetching data . . .')
    await git.fetch('origin', 'main') // git fetch origin main
    await git.reset(['origin/main', '--hard']) // git reset originmain --hard
    decache(path.join(__dirname, '../package.json'))
    const newPackage = require('../package.json')
    for (const key in dependencies) {
        if (!newPackage.dependencies[key]) {
            newPackage.dependencies[key] = dependencies[key]
        }
    }
    fs.writeFileSync(
        path.join(__dirname, '../package.json'),
        JSON.stringify(newPackage, null, '\t')
    )
    console.log('Updating new dependencies . . .')
    await execShellCommand('npm install')
})()