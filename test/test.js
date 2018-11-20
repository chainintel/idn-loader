var expect = require('chai').expect;
const { Loader } = require('../dist/index.js');

describe('loader', () => {
  it('should load', async () => {
    let loader = new Loader();
    loader
      .load('@idn/model-resnet18')
      .then((model) => {
        console.log(model);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
