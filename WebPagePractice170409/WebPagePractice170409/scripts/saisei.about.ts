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
                    alert("click");
                    this.$aboutContents.empty();
                    // 草月のリンクページを表示する
                    // リンク切れ対策も検討する
                }
            );
        }
    }

    export var about = new About();
}