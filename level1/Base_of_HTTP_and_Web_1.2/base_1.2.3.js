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

function processHttpRequest(method, uri, headers, body) {
    let statusCode;
    let statusMessage;
    let responseHeaders = {
        "Server": "Apache/2.2.14 (Win32)",
        "Connection": "Closed",
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": null,
    };

    let responseBody;

    if (method !== "GET") {
        statusCode = 400;
        statusMessage = "Bad Request";
    }
    else {
        if (!uri.includes("/sum")) {
            statusCode = 404;
            statusMessage = "Not Found";
        }
        else if (!uri.includes("?nums=")) {
            statusCode = 400;
            statusMessage = "Bad Request";
        } else {
            statusCode = 200;
            statusMessage = "OK";
            let nums = uri.split('=')[1].split(',');
            responseBody = String(nums.reduce((accum, val) => +accum + +val, 0));
            responseHeaders["Content-Length"] = responseBody.length;
        }
    }
    outputHttpResponse(statusCode, statusMessage, responseHeaders, responseBody);
}

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    let response = `HTTP/1.1 ${statusCode} ${statusMessage}\n`;
    for (let [key, val] of Object.entries(headers)) {
        response += `${key}: ${val}\n`;
    }
    response += `\n${body}`

    console.log(response);
}

http = parseTcpStringAsHttpRequest(contents);

// console.log(JSON.stringify(http, undefined, 2));
processHttpRequest(http.method, http.uri, http.headers, http.body);