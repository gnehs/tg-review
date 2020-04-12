# tg-review
[Docker](https://hub.docker.com/repository/docker/gnehs/tg-review/)

> Telegram 蒐集君的審核系統
## Config file
你需要設定檔 `config.json` 並置放於程式根目錄下
```json
{
  "wordpress": {
    "endpoint": "https://example.com/wp-json",
    "username": "example",
    "password": "example_Pa$$w0rd"
  },
  "auth": {
    "username": "HTTP_BASIC_AUTH_USERNAME",
    "password": "HTTP_BASIC_AUTH_PASSWORD"
  }
}
```
## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
