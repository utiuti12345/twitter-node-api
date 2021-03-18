const encoding = require('encoding-japanese');
const iconv = require('iconv-lite');

export default function encode(word:string):string {
    const decoded = encoding.urlDecode(word);
    const buffer = Buffer.from(decoded);
    const encoded = encoding.convert(buffer, {
        to: 'UNICODE',
        from: 'SJIS',
        type: 'string'
    });

    var buf    = new Buffer(word, 'binary');
    var retStr = iconv.decode(buf, "Shift_JIS");

    return encoded;
}
