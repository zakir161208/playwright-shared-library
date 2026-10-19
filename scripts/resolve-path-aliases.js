const { readdirSync, readFileSync, writeFileSync } = require('node:fs');
const { extname, join, relative, resolve } = require('node:path');

const distDirectory = resolve(__dirname, '..', 'dist');
const sourceExtensions = new Set(['.js', '.d.ts']);
const componentAlias = /(['"])@components\/([^'\"]+)\1/g;

function getFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = join(directory, entry.name);
    return entry.isDirectory() ? getFiles(filePath) : [filePath];
  });
}

function resolveAlias(filePath, componentPath) {
  const extension = extname(filePath) === '.js' ? '.js' : '.d.ts';
  const targetPath = join(distDirectory, 'components', `${componentPath}${extension}`);
  const importPath = relative(resolve(filePath, '..'), targetPath).replaceAll('\\', '/');
  return importPath.startsWith('.') ? importPath : `./${importPath}`;
}

for (const filePath of getFiles(distDirectory)) {
  if (!sourceExtensions.has(extname(filePath)) && !filePath.endsWith('.d.ts')) {
    continue;
  }

  const contents = readFileSync(filePath, 'utf8');
  const resolvedContents = contents.replace(componentAlias, (match, quote, componentPath) => (
    `${quote}${resolveAlias(filePath, componentPath)}${quote}`
  ));

  if (resolvedContents !== contents) {
    writeFileSync(filePath, resolvedContents);
  }
}
