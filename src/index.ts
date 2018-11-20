// const path = require('path');
const fetch = require('node-fetch');
import { w } from '@idn/util-promisify';

export async function loadPackage(path, version = 'latest') {
  let [err, modelPkg] = await w(fetch(path));
  if (err) {
    throw err;
  }
  modelPkg = await modelPkg.json();
  let pkg;
  if (version === 'latest') {
    let latest = modelPkg['dist-tags'].latest;
    pkg = modelPkg['versions'][latest];
  } else {
    pkg = modelPkg['versions'][version];
  }
  if (pkg) {
    return pkg;
    // if (pkg['model']) {
    //   return pkg['model'];
    // } else if (pkg['service']) {
    //   return pkg['service'];
    // } else {
    //   throw 'NOT AN IDN PACKAGE';
    // }
  } else {
    throw 'NOT FOUND';
  }
}

class Loader {
  registry;
  constructor(registry = 'https://registry.chainintel.com/') {
    this.registry = registry;
  }
  async load(pkg, version = 'latest') {
    return loadPackage(this.registry + pkg, version);
  }
}

export { Loader };
