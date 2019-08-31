## アプリケーション概要
レストランや旅館などを想定した店舗の予約管理アプリケーション



## 環境構築

- ローカル環境
```bash
# ビルド
$ docker-compose build

# バックグラウンドでコンテナを起動
$ docker-compose up -d

# app(フロントエンド)のコンテナに入る
$ docker-compose exec app /bin/ash
```

- appコンテナ内
```bash
$ ls
Dockerfile

$ vue create app
$ cd app

# vuetifyを追加
$ vue add vuetify

# package.jsonに記載されているライブラリーをインストール
$ npm install

# 起動
$ npm run serve
```

### バックエンド

```
$ cd backend

$ python --version
Python 3.6.3

$ python -m venv env

$ . env/bin/activate

$ (env) pip install -r ./api/requirements.txt
```
