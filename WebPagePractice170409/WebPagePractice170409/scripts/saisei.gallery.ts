namespace saisei {
    class Gallery implements SaiseiElement {
        private $galleryElem: JQuery;
        private $galleryContents: JQuery;

        htmlStructure = 
        '<div class="saisei-gallery-search">'
        + '    <div id="accordion">'
        + '        <h3>イベント名</h3>'
        + '        <div>'
        + '            <select id="selectmenu" class="saisei-gallery-select">'
        + '                <option>Slower</option>'
        + '                <option>Slow</option>'
        + '                <option>Medium</option>'
        + '                <option>Fast</option>'
        + '                <option>Faster</option>'
        + '            </select>'
        + '        </div>'
        + '        <h3>作者名</h3>'
        + '        <div>'
        + '            <select id="selectmenu" class="saisei-gallery-select">'
        + '                <option>Slower</option>'
        + '                <option>Slow</option>'
        + '                <option>Medium</option>'
        + '                <option>Fast</option>'
        + '                <option>Faster</option>'
        + '            </select>'
        + '        </div>'
        + '        <h3>施設・場所名</h3>'
        + '        <div>'
        + '            <select id="selectmenu" class="saisei-gallery-select">'
        + '                <option>Slower</option>'
        + '                <option>Slow</option>'
        + '                <option>Medium</option>'
        + '                <option>Fast</option>'
        + '                <option>Faster</option>'
        + '            </select>'
        + '        </div>'
        + '    </div>'
        + '</div>'
        + '<!-- 横並びは前後のタグの改行を削除する 余白対策 -->'
        + '<div class="saisei-gallery-upperblock">'
        + '    <div class="saisei-gallery-block">'
        + '        <div class="saisei-gallery-upperimg-text">作品タイトル</div>'
        + '        <button class="saisei-gallery-image" style="background-image:url('+"'images/shell-img001.jpg'"+')"></button> '
        + '    </div><div class="saisei-gallery-block">'
        + '        <div class="saisei-gallery-upperimg-text">作品タイトル</div>'
        + '        <button class="saisei-gallery-image" style="background-image:url(' + "'images/shell-img001.jpg'" +')"></button> '
        + '    </div><div class="saisei-gallery-block">'
        + '        <div class="saisei-gallery-upperimg-text">作品タイトル</div>'
        + '        <button class="saisei-gallery-image" style="background-image:url(' + "'images/shell-img001.jpg'" +')"></button> '
        + '    </div>'
        + '</div>'
        + '<div class="saisei-gallery-lowerblock">'
        + '    <div class="saisei-gallery-block">'
        + '        <button class="saisei-gallery-image" style="background-image:url(' + "'images/shell-img001.jpg'" +')"></button> '
        + '        <div class="saisei-gallery-lowerimg-text">作品タイトル</div>'
        + '    </div><div class="saisei-gallery-block">'
        + '        <button class="saisei-gallery-image" style="background-image:url(' + "'images/shell-img001.jpg'" +')"></button> '
        + '        <div class="saisei-gallery-lowerimg-text">作品タイトル</div>'
        + '    </div><div class="saisei-gallery-block">'
        + '        <div class="saisei-gallery-buttonset">'
        + '            <div class="saisei-gallery-buttondummy"></div>'
        + '            <button id="button-icon01">最初のページ</button>'
        + '            <button id="button-icon02">前のページ</button>'
        + '            <button id="button-icon03">次のページ</button>'
        + '            <button id="button-icon04">最後のページ</button>'
        + '        </div>'
        + '        <div class="saisei-gallery-blockdummy">続きがあります</div>'
        + '    </div>'
        + '<!-- ui-dialog -->'
        + '<div id="dialog" title="Dialog Title">'
        + '    <div class="saisei-gallery-dialog"><img src="images/shell-img001.jpg" alt="test" class="saisei-gallery-dialog-img" /></div>'
        + '</div>'
        + '</div>'

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
                    var width1 = this.$galleryContents.width();
                    var contentsLength1 = $('.saisei-main-contents').length;
                    var contentsLength2 = this.$galleryContents.length;
                    //alert("contentsLength  " + contentsLength1 + " " + contentsLength2);


                    // ロードするデータ（写真ファイルのパス，説明）を取得
                    // 検索用タグを生成して，$galleryContentsに追加する
                    // 検索結果に応じて新しいページ内コンテンツを生成する
                    // 検索条件は，年月，イベント名，作者の組合せ
                    this.reloadPage();
                }
            );
        }

        private reloadPage = (): void => {
            this.$galleryContents.empty();
            this.$galleryContents.append(this.htmlStructure);

        }
    }

    export var gallery = new Gallery();
}