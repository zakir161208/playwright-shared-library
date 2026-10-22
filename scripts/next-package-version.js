const stableVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function nextPackageVersion(current, published) {
  if (!stableVersion.test(current)) {
    throw new Error(`Automatic publishing requires a stable package version: ${current}`);
  }
  const versions = Array.isArray(published) ? published : [published];
  const compare = (left, right) => {
    const a = left.split('.').map(Number);
    const b = right.split('.').map(Number);
    return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  };
  const latest = versions.filter(version => stableVersion.test(version))
    .sort(compare).pop();
  if (!latest || compare(current, latest) > 0) return current;
  const [major, minor, patch] = latest.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

module.exports = { nextPackageVersion };

if (require.main === module) {
  const current = require('../package.json').version;
  console.log(nextPackageVersion(current, JSON.parse(process.argv[2])));
}
