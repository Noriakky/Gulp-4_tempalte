# gulp-4
gulp-4の構築テスト
## 開発環境
### OS
Mac

### Node
バージョン 8.0.0

### npm
バージョン 5.0.0

### npx
バージョン 10.2.0

### Gulp
CLI version: 2.2.0
Local version: 4.0.2

## 環境開発時の注意
ただGulpをインストールすると
Error: ENOENT: no such file or directory, scandir '/Users/〇〇〇〇/（プロジェクト名）/node_modules/node-sass/vendor'
とエラーが出てくる。

下記コマンドで解決しました。  
$npm update  
$npm install  
$node node_modules/node-sass/scripts/install.js  
$npm rebuild node-sass
 
3行目が必要のようです。
