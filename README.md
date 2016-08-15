# dynamic-dns-updater

A node package providing dynamic DNS updates on Cloudflare hosted domains.

Documentation is a work in progress.

## Usage

#### Docker (recommended)

This will start a detached Docker container which will update your external IP address every 10 minutes. To customize this time you can set the environment variable `UPDATE_FREQUENCY_SECONDS`.

```bash
$ docker pull alexpls/dynamic-dns-updater
$ docker run \
  -e ZONE_NAME="example.org" \
  -e RECORD_NAME="my-dynamic-address" \
  -e CLOUDFLARE_EMAIL="myemail@example.org" \
  -e CLOUDFLARE_KEY="e1cbc278a4c78f25afe51a168715ae0de3361" \
  -d alexpls/dynamic-dns-updater
```

#### Node (via the CLI)

```bash
$ ZONE_NAME="example.org" \
  RECORD_NAME="my-dynamic-address" \
  CLOUDFLARE_EMAIL="myemail@example.org" \
  CLOUDFLARE_KEY="e1cbc278a4c78f25afe51a168715ae0de3361" \
  node main.js
```
