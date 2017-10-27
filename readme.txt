【NLCWebToolについて】

・Watson-API-Explorerでできることをローカルで実行できます。
・MinervaePoCKETにおいて、お客様がcurlを使わずにNLCの操作を行えることを目的としています。
・IBM環境、SB環境両対応可能。(Watson-API-ExplorerがSB環境に非対応)
・本当はExcelマクロで済ませたかったのですが、分類器の作成がどうしても出来ず断念…

※※※注意※※※
　ローカルファイルからHTTPリクエストを行うため、ブラウザや動作環境に制限があります。
　動作を確認したブラウザは下記となります。

　【動作可】
　　■Google Chrome
　　　→　ブラウザを一度完全に閉じてから、下記オプションを付与して起動。
　　　　「chrome.exe --disable-web-security --user-data-dir」
　　　　　(参考：https://qiita.com/growsic/items/a919a7e2a665557d9cf4)
　　　　　Chromeのショートカットを作成し、プロパティの「リンク先」の末尾にオプションを付与すると起動が容易。
　　　　　「"リンク先~\chrome.exe" --disable-web-security --user-data-dir」

　　■Internet Explorer(IE11)　※容易のため推奨
　　　→　ツールを開いた際に画面下部に表示される
　　　　　「このWebページはスクリプトやActiveXコントロールを実行しないように制限されています。」
　　　　　の「ブロックされているコンテンツを許可」をクリックし、許可する必要あり。

　　■Safari
　　　→　メニューの「開発」→「ローカルファイルの制限を無効にする」にチェックを入れる。

　【動作不可】
　　・Edge
　　・Firefox


PS.クラウドのWebサイトに配置し、お客様にURLを展開する形にしてもいいのでは(コストはかかりますが…)