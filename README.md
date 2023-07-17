![image](https://github.com/Ramen-Noodle/Wolfpack-Mirai-2023/assets/66392457/6245fc50-6d68-4bbe-a924-ef2755dde43c)

# Wolfpack Mirai 2023
A music visualizer created by a humble group of college students in recognition of Hatsune Miku Magical Mirai 2023.

[日本語はこちら](#wolfpack-mirai-2023---jp)
<hr/>

**Developers:** Abel Lu, Christopher Lee, Luke Sbityakov  
**Artist:** Anjolie Baccay

### Note
This application is optimized for landscape display on tablets and personal computers. The app *will work* on phones and smaller devices, but you may encounter some issues related to small screen size and native hardware.

## Table of Contents
- [Features](#features)
- [User Guide](#user-guide)
- [Build and Deploy](#build-and-deploy)
- [Letter to Judging Committee](#letter-to-judging-committee)

## Features
- **Song Compatibility**
  - Compatible with all six songs presented to competitors.
- **Music Visualization**
  - Glowing animations that match the intensity of the songs, including six glowing bars representing the six songs featured.
- **Custom Artwork**
  - Features a custom digital drawing of Hatsune Miku in this year's outfit, as well as custom assets used to create an elaborate backdrop
- **User Freedom**
  - Users are given options to customize the experience to make it their own. This includes enabling/disabling certain animations and changing the scene colors.
- **Miku on Top of the World**
  - As reference to her song: *World is Mine*, Miku is depicted on top of a skyscraper, broadcasting her voice into the night sky.
 
## User Guide
- **How to access**
  - **Personal Computers**
    - Click here: https://azn-abel.github.io/mikus-neon-world
  - **Tablet and Phone Users**
    - Click here: https://azn-abel.github.io/mikus-neon-world
    - **Optional:** Add the Application to Home Screen
      - Safari (iOS): Tap the share icon, then tap "Add to Home Screen"
      - Chrome (Android): Tap the three dots (settings menu), then tap "Add to Home Screen"
- **How to use**
  - Click the Play button to start listening!
  - Volume and visual-related settings can be found by clicking the gear icon
  - To switch songs, click the music notes icon

## Build and Deploy
- **Testing Locally**
  - Clone the repository
  - Open the terminal and run `npm install` to install dependencies needed for testing
  - Run `npm run dev` to start a local server. Note: `npm run build` will not work. The src folder is meant to be deployed directly.
  - Press `Ctrl + c` in the terminal session to stop the server.
- **Building and Serving Locally**
  - You can use server extensions to serve the application on a local HTTP server.
    - VSCode: Live Server
      - Download "Live Server" extension
      - Right-click on `index.html` and select "Open with Live Server"
    - WebStorm: Built-In Preview
      - Right-click on the `index.html` file
      - Hover over "Open In"
      - Hover over "Browser", and select your desired browser
- **Deployment**
  - The app is currently deployed at https://azn-abel.github.io/mikus-neon-world from the `deploy` branch
  - The `deploy` branch is ready to be deployed on HTTP servers

## Letter to Judging Committee

Hello Judging Committee,

We are college computer science students in America with keen interests in
Japanese culture and media. Earlier this summer, we learned about the Magical
Mirai Programming Competition from Hatsune Miku's English Facebook page. We 
entered because we saw it as an opportunity not only to learn about web
development, but also to express our appreciation for Japanese culture and
Hatsune Miku.

Thank you for the time and efforts you all have dedicated to this competition. We
look forward to hearing the results!

All the best,  
Wolfpack Mirai 2023

<hr/>  

# Wolfpack Mirai 2023 - JP
ただの大学生が初音ミクの「マジカルミライ２０２３」のために作った音楽ビジュアライザです

**デベロッパー：** Abel Lu, Christopher Lee, Luke Sbityakov  
**イラストレーター:** Anjolie Baccay

### 注意
このアプリは横向きのパソコンやタブレットで利用されるつもりでオプトマイズしました。スマホでも使えるんですが、画面のサイズに関する問題が出る可能性があります。

## 目次
- [機能](#機能)
- [ユーザーガイド](#ユーザーガイド)
- [ビルドとデプロイ](#ビルドとデプロイ)
- [審査員への言葉](#審査員への言葉)

## 機能
- **曲の選択肢**
  - このコンテストの６曲を全部使える
- **音楽の見える化**
  - ６曲を表す音楽の強度に合わせて明かる6本のビートバー
- **カスタムイラスト**
  - 今年の衣装を着てる初音ミクのイラストとカスタムアセットで作った美しい背景
- **自由に使える**
  - ユーザーは自由に使えるためのオプションが付いてる。例えばアニメーションをエネーブルやディセーブルしたり、シーンの色を変えたりすることはできる
- **初音ミクは世界で一番！**
  - *「ワールドイズマイン」*っていう曲の歌詞みたいにミクがスカイスクレーパーの屋根の上で夜空に声を響かす

## ユーザーガイド
- **アクセスする方法**
  - **パソコン**
    - こちら: https://azn-abel.github.io/mikus-neon-world
  - **タブレットとスマホ**
    - こちら: https://azn-abel.github.io/mikus-neon-world
    - **オプショナル:** アプリをホーム画面に追加
      - Safari (iOS): シェアアイコンを押して「ホーム画面に追加」を選択する
      - Chrome (Android): 3点のアイコン（設定メニュー）を押して「ホーム画面に追加」を選択する
- **使い方**
  - プレイボタンをクリックして音楽を開始する！
  - ギアアイコンをクリックして音量とビジュアルに関する設定を変える
  - ノートアイコンをクリックして曲の変化できる

## ビルドとデプロイ
- **ローカルテスト**
  - レポジトリをクローンする
  - ターミナルを開いて`npm install`実行してテストに必要な依存性をインストールする
  - `npm run dev`を実行してローカルサーバーを起動する。注意：`npm run build`では起動しない。srcフォルダが直接デプロイするべきです。
  - ターミナルで`Ctrl + c`押してサーバーを切る
- **ローカルでビルドとサーブ**
  - サーバー拡張部分でローカルのHTTPサーバーでアプリをサーブできる
    - VSCode: Live Server
      - 「Live Server」っていう拡張部分をダウンロードする
      - `index.html`を右クリックして"Open with Live Server"を選択する
    - WebStorm: 作り付けプレビュー
      - `index.html`を右クリックする
      - 「このアプリケーションで開く」にマウスを合わせる
      - 「ブラウザー」にマウスを合わせてブラウザーを選択する
- **デプロイ**
  - 現在このアプリはhttps://azn-abel.github.io/mikus-neon-world の`deploy`ブランチでデプロイされている
  - その`deploy`ブランチはHTTPサーバーにデプロイすることができる

## 審査員への言葉

審査員の皆様、

僕たちは日本の文化やメディアに興味あるアメリカ人の大学生です。数月前、初音ミクの英語フェースブックで「マジカルミライ２０２３プログラミング・コンテスト」を知りました。このコンテストはWEBプログラミングの勉強になるだけではなく、日本文化、そして初音ミクへの鑑賞を表示する機会だと思って参加しました。

このコンテストのための時間と努力ありがとうございます。結果が出る時をお楽しみにしています！

Wolfpack Mirai 2023のみんなより

