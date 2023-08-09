# Performance Serialization Benchmarks

## Notes

- Changed HTTP headers with hyphens `-` to underscores `_` for simplicity due to a lack of support Protobuf v3. This can be resolved by adding annotation mappings.

## Example Output

I am seeing the following results on a 2019 Macbook Pro 16:

```bash
❯ ITTERATIONS=1000000 node ./index.js
Running itterations=1000000
-----------------------------------
Protobuf-encode = 9751.510140895844 milliseconds.
Protobuf-decode = 5090.833631038666 milliseconds.
Json-encode = 20592.195904016495 milliseconds.
Json-decode = 8910.44420003891 milliseconds.
-----------------------------------
itterations=1000000
encDiff=-111.17%
denDiff=-75.03%
Protobuf-encode-buffer=3.768kb
Json-encode-buffer2=4.508kb
sizeDiff=-19.64%
Total-time = 44359.96089601517 milliseconds.
```

```bash
❯ ITTERATIONS=100000 node ./index.js
Running itterations=100000
-----------------------------------
Protobuf-encode = 1022.8386480808258 milliseconds.
Protobuf-decode = 550.4355981349945 milliseconds.
Json-encode = 2164.3819189071655 milliseconds.
Json-decode = 882.5917220115662 milliseconds.
-----------------------------------
itterations=100000
encDiff=-111.61%
denDiff=-60.34%
Protobuf-encode-buffer=3.768kb
Json-encode-buffer2=4.508kb
sizeDiff=-19.64%
Total-time = 4634.848813056946 milliseconds.
```

```bash
❯ ITTERATIONS=10000 node ./index.js
Running itterations=10000
-----------------------------------
Protobuf-encode = 137.06979703903198 milliseconds.
Protobuf-decode = 86.69117212295532 milliseconds.
Json-encode = 230.8092589378357 milliseconds.
Json-decode = 98.26925897598267 milliseconds.
-----------------------------------
itterations=10000
encDiff=-68.39%
denDiff=-13.36%
Protobuf-encode-buffer=3.768kb
Json-encode-buffer2=4.508kb
sizeDiff=-19.64%
Total-time = 569.2047171592712 milliseconds.
```

```bash
❯ ITTERATIONS=1000 node ./index.js
Running itterations=1000
-----------------------------------
Protobuf-encode = 37.75919985771179 milliseconds.
Protobuf-decode = 21.549705028533936 milliseconds.
Json-encode = 24.471976041793823 milliseconds.
Json-decode = 10.822224140167236 milliseconds.
-----------------------------------
itterations=1000
encDiff=35.19%
denDiff=49.78%
Protobuf-encode-buffer=3.768kb
Json-encode-buffer2=4.508kb
sizeDiff=-19.64%
Total-time = 110.91943097114563 milliseconds.
```

```bash
❯ ITTERATIONS=100 node ./index.js
Running itterations=100
-----------------------------------
Protobuf-encode = 17.270103931427002 milliseconds.
Protobuf-decode = 5.7260401248931885 milliseconds.
Json-encode = 3.2095999717712402 milliseconds.
Json-decode = 1.2172050476074219 milliseconds.
-----------------------------------
itterations=100
encDiff=81.42%
denDiff=78.74%
Protobuf-encode-buffer=3.768kb
Json-encode-buffer2=4.508kb
sizeDiff=-19.64%
Total-time = 43.774194955825806 milliseconds.
```

```bash
❯ ITTERATIONS=10 node ./index.js
Running itterations=10
-----------------------------------
Protobuf-encode = 13.27158498764038 milliseconds.
Protobuf-decode = 2.459712028503418 milliseconds.
Json-encode = 0.449678897857666 milliseconds.
Json-decode = 0.22478389739990234 milliseconds.
-----------------------------------
itterations=10
encDiff=96.61%
denDiff=90.86%
Protobuf-encode-buffer=3.768kb
Json-encode-buffer2=4.508kb
sizeDiff=-19.64%
Total-time = 35.222442865371704 milliseconds.
```
