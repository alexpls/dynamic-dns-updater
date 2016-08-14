const request = require('request');
const publicIp = require('public-ip');

const requireEnvVar = require('./lib/utils').requireEnvVar;
const updateCloudflare = require('./lib/update-cloudflare');

const ZONE_NAME = requireEnvVar('ZONE_NAME');
const RECORD_NAME = requireEnvVar('RECORD_NAME');
const CLOUDFLARE_EMAIL = requireEnvVar('CLOUDFLARE_EMAIL');
const CLOUDFLARE_KEY = requireEnvVar('CLOUDFLARE_KEY');

publicIp.v4().then((publicIp) => {
  console.log(`Updating ${ZONE_NAME}.${RECORD_NAME} IP to ${publicIp}...`);

  updateCloudflare(CLOUDFLARE_EMAIL, CLOUDFLARE_KEY, ZONE_NAME, RECORD_NAME, publicIp, (err) => {
    if (err) { throw err; }
    console.log('done!');
    process.exit(0);
  });
});
