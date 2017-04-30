namespace saisei {
    class About {
        private $aboutElem: JQuery;
        private $aboutContents: JQuery;

        htmlStructure = '';

        initModule = ($container: JQuery) => {
            //alert("start initabout");
            this.$aboutElem = $container.find('.saisei-main-about');
            this.$aboutContents = $container.find('.saisei-main-contents');

            this.bindHoverHandle(this.$aboutElem);
            this.bindClickHandle(this.$aboutElem);

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
                    // 草月のリンクページを表示する
                    // リンク切れ対策も検討する
                    window.open("http://www.sogetsu.or.jp/study/class/areaB/8/0038738001.html");
                }
            );
        }
    }

    export var about = new About();
}