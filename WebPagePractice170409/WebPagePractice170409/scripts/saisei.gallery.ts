namespace saisei {
    class Gallery implements SaiseiElement {
        private $galleryElem: JQuery;
        private $galleryContents: JQuery;

        htmlStructure = '';

        initModule = ($container: JQuery) => {
            //alert("start initgallery");
            this.$galleryElem = $container.find('.saisei-main-gallery');
            this.$galleryContents = $container.find('.saisei-main-contents');

            this.bindHoverHandle(this.$galleryElem);
            this.bindClickHandle(this.$galleryElem);

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
                    var dt = new Date();
                    var thisYear = dt.getFullYear();
                    dt.setMonth(dt.getMonth() - 12);
                    var lastYear = dt.getFullYear();
                    alert("year " + thisYear + " " + lastYear);
                    // ロードするデータ（写真ファイルのパス，説明）を取得
                    // 検索用タグを生成して，$galleryContentsに追加する
                    // 検索結果に応じて新しいページ内コンテンツを生成する
                    // 検索条件は，年月，イベント名，作者の組合せ
                }
            );
        }
    }

    export var gallery = new Gallery();
}