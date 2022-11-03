# FujiwaraKen / Wallet API

Wallet System 用 API サンプル

ウォレット秘密鍵の取り扱いについては、PJ 毎に変わるので、秘密鍵については このリポジトリでは 取り扱わない

DB のユーザー名やパスワードなどは各自環境変数に切り分けること。

## 開発環境

- Docker Compose
  - Node.js 16.18.0
  - MySQL 8.0.26
  - typeorm 0.3.9 (<https://github.com/typeorm/typeorm/releases>)

### 起動

```sh
# バックグラウンドで起動
docker compose up -d

# ログ表示
docker compose logs
```

### 終了

```sh
docker compose stop
```

### 出力しながら起動したいとき

```sh
docker compose up
```

### yarn

docker-compose exec walletapi-api-server-1 sh
yarn install \*\*\*

### MySQL にログイン

```sh
docker exec -it wallet-db mysql -u root -p password
```

### MySQL Dump

```sh
docker exec wallet-db mysqldump -u root -ppass example > dump.sql
```

### マイグレーションの作成

```sh
# ホストから実行する場合
docker exec -it walletapi-api-server-1 yarn create:migration user-table
# コンテナの中で実行する場合
$(npm bin)/ts-node -r tsconfig-paths/register $(npm bin)/typeorm migration:create -n user-table
```

### マイグレーションの実行

```sh
docker exec -it walletapi-api-server-1 yarn migrate
# The following command revert migration
# docker exec -it typeorm-example-api yarn migrate:revert
# Inside Container
yarn migrate
```

### ヘルスチェック

localhost:3000/healthcheck

{response: "OK"}
