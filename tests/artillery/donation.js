const {testdonation} = require ('../commands/donation');

async function artilleryScript(page)
{
    await testdonation(page);
}

module.exports={
    artilleryScript
}; 