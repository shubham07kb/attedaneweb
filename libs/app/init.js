const root=require('./root');
const setup = require('./setup');
module.exports={
    root:root.apphandle,
    setup: setup.init,
    cron: setup.cron
};
