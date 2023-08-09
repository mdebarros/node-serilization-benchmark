const { performance } = require("perf_hooks")
const proto = require('./protobuf.js')
const auditPrepareMessage = require('./example-audit-start-prepare.json')

const run = async () => {

  try {
    // const root = await proto.init(process.cwd() + '/message.proto');
    // const TestMessage = root.lookupType("test.Message");

    const root = await proto.init(process.cwd() + '/audit-start-prepare.proto');
    const TestMessage = root.lookupType("audit.Prepare");

    const protoUtil = {
      encode: (object) => {
        // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
        // const errMsg = TestMessage.verify(payload);

        // ... do something with buffer
        // if (errMsg) console.error(errMsg);

        // Create a new message
        // const message = TestMessage.create(payload); // or use .fromObject if conversion is necessary
        // const message = TestMessage.fromObject(payload);
        // console.log(message);

        // // Encode a message to an Uint8Array (browser) or Buffer (node)
        const buffer = TestMessage.encode(message).finish();
        // console.log(buffer);
        return buffer;
    
      },
      decode: (buffer) => {
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        const message = TestMessage.decode(buffer);
        // Maybe convert the message back to a plain object
        const object = TestMessage.toObject(message, {
          longs: String,
          enums: String,
          bytes: String,
          // see ConversionOptions
        });
        return object
      },
    }

    const jsonUtil = {
      encode: (object) => {
        const jsonstring = JSON.stringify(object);
        return jsonstring
      },
      decode: (buffer) => {
        const object = JSON.parse(buffer);
        return object
      },
    }

    // // Exemplary payload
    // const payload = {
    //   num: 1,
    //   str: "test string"
    // };
    const payload = auditPrepareMessage;

    const itterations = 100000;

    const message = TestMessage.fromObject(payload);
    const peT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const buffer = protoUtil.encode(message);
    }
    const peT1 = performance.now()
    console.log("Protobuf-encode = " + (peT1 - peT0) + " milliseconds.")
    // console.log(buffer);

    const buffer = protoUtil.encode(payload);
    const pdT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const object = protoUtil.decode(buffer);
    }
    const pdT1 = performance.now()
    console.log("Protobuf-decode = " + (pdT1 - pdT0) + " milliseconds.")
    // console.log(object);

    const jeT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const buffer2 = jsonUtil.encode(payload);
    }
    const jeT1 = performance.now()
    console.log("Json-encode = " + (jeT1 - jeT0) + " milliseconds.")
    // console.log(buffer2);
    
    const buffer2 = jsonUtil.encode(payload);
    const jdT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const object2 = jsonUtil.decode(buffer2);
    }
    const jdT1 = performance.now()
    console.log("Json-decode = " + (jdT1 - jdT0) + " milliseconds.")
    // console.log(object2);

  } catch (err) {
    console.error(err)
  }
}

run();
