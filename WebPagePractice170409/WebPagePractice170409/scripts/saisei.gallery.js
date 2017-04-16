var saisei;
(function (saisei) {
    var Gallery = (function () {
        function Gallery() {
            var _this = this;
            this.htmlStructure = '';
            this.initModule = function ($container) {
                //alert("start initgallery");
                _this.$galleryElem = $container.find('.saisei-main-gallery');
                _this.$galleryContents = $container.find('.saisei-main-contents');
                _this.bindHoverHandle(_this.$galleryElem);
                _this.bindClickHandle(_this.$galleryElem);
            };
            this.bindHoverHandle = function ($elem) {
                $elem.hover(function () {
                    $($elem).toggleClass('saisei-hover');
                });
            };
            this.bindClickHandle = function ($elem) {
                $elem.bind("click", function () {
                    alert("click");
                    // ロードするデータ（写真ファイルのパス，説明）を取得
                    // 検索用タグを生成して，$galleryContentsに追加する
                    // 検索結果に応じて新しいページ内コンテンツを生成する
                });
            };
        }
        return Gallery;
    }());
    saisei.gallery = new Gallery();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.gallery.js.map