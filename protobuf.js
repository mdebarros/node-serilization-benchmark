const protobuf = require('protobufjs');


const init = async (file) => {

  const root = await protobuf.load(file);

  return root;
}

module.exports = {
  init
}
