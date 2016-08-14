module.exports = {
  requireEnvVar: function(varName) {
    const val = process.env[varName];
    if (!val) {
      throw new Error(`Required ENV var ${varName} is not set`);
    }
    return val;
  }
};
