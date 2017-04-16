﻿namespace saisei {
    class Home implements SaiseiElement {
        private $homeElem: JQuery;
        private $homeContents: JQuery;

        htmlStructure = '';

        initModule = ($container: JQuery) => {
            //alert("start initHome");
            this.$homeElem = $container.find('.saisei-main-home');
            this.$homeContents = $container.find('.saisei-main-contents');

            this.bindHoverHandle(this.$homeElem);
            this.bindClickHandle(this.$homeElem);
            
        }

        bindHoverHandle = ($elem: JQuery) => {
            $elem.hover(
                () => {
                    $($elem).toggleClass('saisei-hover');
                }
            );
        }

        bindClickHandle = ($elem: JQuery) => {
            $elem.bind("click",
                () => {
                    alert("click");
                    // ロードするデータ（写真ファイルのパス，説明，更新履歴情報）を取得
                    // タグを生成して，$homeContentsに追加する
                }
            );
        }

    }

    export var home = new Home();
}