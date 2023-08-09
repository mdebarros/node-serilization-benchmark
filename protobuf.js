const protobuf = require('protobufjs');


const init = async (file, type) => {

  const root = await protobuf.load(file);

  const message = root.lookupType(type);

  return message;
}

module.exports = {
  init
}
