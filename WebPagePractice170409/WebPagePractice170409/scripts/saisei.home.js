var saisei;
(function (saisei) {
    var Home = (function () {
        function Home() {
            var _this = this;
            this.htmlStructure = '';
            this.initModule = function ($container) {
                //alert("start initHome");
                _this.$homeElem = $container.find('.saisei-main-home');
                _this.$homeContents = $container.find('.saisei-main-contents');
                _this.bindHoverHandle(_this.$homeElem);
                _this.bindClickHandle(_this.$homeElem);
            };
            this.bindHoverHandle = function ($elem) {
                $elem.hover(function () {
                    $($elem).toggleClass('saisei-hover');
                });
            };
            this.bindClickHandle = function ($elem) {
                $elem.bind("click", function () {
                    var list = saisei.model.requestImgData("201011sogetsuten_hagiya");
                    alert(list[0]);
                    // ロードするデータ（写真ファイルのパス，説明，更新履歴情報）を取得
                    // タグを生成して，$homeContentsに追加する
                    // 更新履歴のテキストからは，該当するイベントのギャラリーページが生成されるようにする
                });
            };
        }
        return Home;
    }());
    saisei.home = new Home();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.home.js.map