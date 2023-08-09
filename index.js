const { performance } = require("perf_hooks")
const proto = require('./protobuf.js')

const run = async () => {
  const apT0 = performance.now()
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
        const message = TestMessage.create(payload); // or use .fromObject if conversion is necessary
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
        // console.log(object)
        return object
      },
    }

    const jsonUtil = {
      encode: (object) => {
        const jsonstring = JSON.stringify(object);
        // console.log(jsonstring)
        const buffer = Buffer.from(jsonstring, 'utf8');
        // console.log(buffer)
        return buffer
      },
      decode: (buffer) => {
        const decodedString = buffer.toString('utf8');
        const object = JSON.parse(decodedString);
        // console.log(object)
        return object
      },
    }

    // // Exemplary payload
    // const payload = {
    //   num: 1,
    //   str: "test string"
    // };

    const payload = require('./example-audit-start-prepare.json')

    const itterations = parseInt(process.env.ITTERATIONS) || 100;
    // const itterations = 1000000;
    // const itterations = 100000;
    // const itterations = 10000;
    // const itterations = 1000;
    // const itterations = 10;

    console.log(`Running itterations=${itterations}`)
    console.log('-----------------------------------')

    // const message = TestMessage.fromObject(payload);
    const peT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const buffer = protoUtil.encode(payload); // this includes the message create
      // const buffer = protoUtil.encode(message); // this does not include the message create, but take note that you will need to comment out the create in the encode function, and uncomment it above.
    }
    const peT1 = performance.now()
    const peDiff = (peT1 - peT0)
    console.log("Protobuf-encode = " + peDiff + " milliseconds.")
    // console.log(buffer);

    const buffer = protoUtil.encode(payload);

    const pdT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const object = protoUtil.decode(buffer);
    }
    const pdT1 = performance.now()
    const pdDiff = (pdT1 - pdT0)
    console.log("Protobuf-decode = " + pdDiff + " milliseconds.")
    // console.log(object);

    const jeT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const buffer2 = jsonUtil.encode(payload);
    }
    const jeT1 = performance.now()
    const jeDiff = (jeT1 - jeT0)
    console.log("Json-encode = " + jeDiff + " milliseconds.")
    // console.log(buffer2);
    
    const buffer2 = jsonUtil.encode(payload);

    const jdT0 = performance.now()
    for(var i = 0; i < itterations; i++) {
      const object2 = jsonUtil.decode(buffer2);
    }
    const jdT1 = performance.now()
    const jdDiff = (jdT1 - jdT0)
    console.log("Json-decode = " + jdDiff + " milliseconds.")
    // console.log(object2);


    const sizeDiff = 1 - buffer2.length / buffer.length;
    const encDiff = 1 - jeDiff / peDiff;
    const decDiff = 1 - jdDiff / pdDiff;
    console.log('-----------------------------------')
    console.log(`itterations=${itterations}`)
    console.log(`encDiff=${(encDiff*100).toFixed(2)}%`)
    console.log(`denDiff=${(decDiff*100).toFixed(2)}%`)
    console.log(`Protobuf-encode-buffer=${buffer.length/1000}kb`)
    console.log(`Json-encode-buffer2=${buffer2.length/1000}kb`)
    console.log(`sizeDiff=${(sizeDiff*100).toFixed(2)}%`)

  } catch (err) {
    console.error(err)
  }
  const apT1 = performance.now()
  console.log("Total-time = " + (apT1 - apT0) + " milliseconds.")
}

run();
