const zlib = require('zlib');

function createToken(url, previewUrl) {
  const payload = { url, previewUrl };
  const compressed = zlib.deflateSync(JSON.stringify(payload));
  return compressed.toString('base64url');
}

const args = process.argv.slice(2);
let redirectUrl = '';
let previewUrl = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-r' && args[i + 1]) {
    redirectUrl = args[i + 1];
    i++;
  } else if (args[i] === '-p' && args[i + 1]) {
    previewUrl = args[i + 1];
    i++;
  }
}

if (!redirectUrl || !previewUrl) {
  console.error('Usage: node encode.js -r <redirect_url> -p <preview_url>');
  //node encode.js -r https://redirect.com -p https://preview.net
  process.exit(1);
}

const token = createToken(redirectUrl, previewUrl);
console.log(`/go/${token}`);
