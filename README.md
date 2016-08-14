# dynamic-dns-updater

A node package providing dynamic DNS updates on Cloudflare hosted domains.

Documentation is a work in progress.

## Usage

<!-- #### Docker (recommended) -->

#### Node (via the CLI)

```bash
ZONE_NAME="example.org" \
RECORD_NAME="my-dynamic-address" \
CLOUDFLARE_EMAIL="myemail@example.og" \
CLOUDFLARE_KEY="e1cbc278a4c78f25afe51a168715ae0de3361" \
node main.js
```
