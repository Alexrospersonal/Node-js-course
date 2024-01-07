// цей файл потрібно буде дописати...

// не звертайте увагу на цю функцію 
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) {
    let [head, body] = string.split('\n\n');
    let [url, ...headContet] = head.split('\n');
    let [method, uri] = url.split(' ');

    let responseHeaders = headContet.reduce((accum, val) => {
        let [k, v] = val.split(':');
        k = k
            .split('-')
            .map(val => {
                return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
            }).join('-');
        accum[k] = v.trim();
        return accum;
    }, {});

    return {
        method: method,
        uri: uri,
        headers: responseHeaders,
        body: body.trim()
    };
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));