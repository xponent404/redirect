# Redirect Service with Link Preview Cloaking

Generates encoded redirect links. Bots see a different preview URL. Humans get redirected to the real destination.

## Local Setup

```bash
npm install
```

## Generate Encoded Token

```bash
node encode.js -r <real_destination_url> -p <preview_url_for_bots>
```

Example:
```bash
node encode.js -r https://your-actual-offer.com -p https://some-innocent-site.com
```

Output:
```
/go/eJwNyEEK...
```

## Usage

```
https://your-render-app.onrender.com/go/<token>?ref=tracking_id
```

The `?ref=` parameter is optional and logged for tracking.

## Deploy to Render

1. Push this repo to GitHub
2. On Render: New Web Service → Connect repo
3. Settings:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variable: `REDIRECT_MAP` = `{}`
5. Deploy

## How It Works

- Token encodes the real URL and preview URL using zlib + base64url
- When bots (WhatsApp, Telegram, Twitter, etc.) request the link, they get redirected to the preview URL
- Real users get redirected to the actual destination
- `?ref=` parameter is logged for click tracking
