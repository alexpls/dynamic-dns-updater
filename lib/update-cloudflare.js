const request = require('request');

/**
 * @see https://api.cloudflare.com
 */
module.exports = function updateCloudflare(cloudflareEmail, cloudflareKey, zoneName, recordName, ipAddress, callback) {
  const cloudflareRequest = request.defaults({
    json: true,
    baseUrl: 'https://api.cloudflare.com/client/v4',
    headers: {
      'X-Auth-Email': cloudflareEmail,
      'X-Auth-Key': cloudflareKey,
      'User-Agent': `${process.env.npm_package_name} ${process.env.npm_pacakge_version}`
    }
  });

  function handleCloudflareResponse(callback) {
    return (err, res, body) => {
      if (err) {
        return callback(err);
      } else if (res.statusCode !== 200) {
        return callback(new Error('Expected status to be 200'));
      } else if (!body.success) {
        return callback(new Error('Expected success on body to be true'));
      } else if (body.results) {
        return callback(new Error('Expected presence of results on body'));
      }

      return callback(null, body);
    }
  }

  cloudflareRequest('/zones', {
    qs: { name: zoneName }
  }, handleCloudflareResponse((err, body) => {
    if (err) { return callback(err); }

    const zone = body.result[0];

    cloudflareRequest(`/zones/${zone.id}/dns_records`, {
      qs: { name: `${recordName}.${zoneName}` }
    }, handleCloudflareResponse((err, body) => {
      if (err) { return callback(err); }

      const record = body.result[0];
      const updatedRecord = Object.assign({}, record, { content: ipAddress });

      cloudflareRequest.put(`/zones/${zone.id}/dns_records/${record.id}`, {
        body: updatedRecord
      }, handleCloudflareResponse((err, body) => {
        if (err) { return callback(err); }

        if (body.result.content === ipAddress) {
          callback(null, body.result);
        } else {
          callback(new Error(`Record IP address wasn't updated. Expected ${ipAddress}, actual: ${body.content}`));
        }
      }))
    }));
  }));
}
