namespace saisei {
    class Gallery implements SaiseiElement {
        private $galleryElem: JQuery;
        private $galleryContents: JQuery;
        private $galleryEvent: JQuery;
        private $galleryCreator: JQuery;
        private $galleryLocation: JQuery;

        htmlStructure = 
        '<div class="saisei-gallery-search">'
        + '    <div id="accordion">'
        + '        <h3>イベント名</h3>'
        + '        <div>'
        + '            <select id="selectmenu01" class="saisei-gallery-select">'
        + '                <option>イベント名を選択</option>'
        + '                <option>Slow</option>'
        + '                <option>Medium</option>'
        + '                <option>Fast</option>'
        + '                <option>Faster</option>'
        + '            </select>'
        + '        </div>'
        + '        <h3>作者名</h3>'
        + '        <div>'
        + '            <select id="selectmenu02" class="saisei-gallery-select">'
        + '                <option>作者名を選択</option>'
        + '                <option>Slow</option>'
        + '                <option>Medium</option>'
        + '                <option>Fast</option>'
        + '                <option>Faster</option>'
        + '            </select>'
        + '        </div>'
        + '        <h3>施設・場所名</h3>'
        + '        <div>'
        + '            <select id="selectmenu03" class="saisei-gallery-select">'
        + '                <option>施設・場所名を選択</option>'
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
                    // ロードするデータ（写真ファイルのパス，説明）を取得
                    // 検索用タグを生成して，$galleryContentsに追加する
                    // 検索結果に応じて新しいページ内コンテンツを生成する
                    // 検索条件は，年月，イベント名，作者の組合せ
                    this.reloadPage();
                    this.initElements();
                    this.initMenu();

                }
            );
        }

        private reloadPage = (): void => {
            this.$galleryContents.empty();
            this.setJQueryAccess(this.$galleryContents.append(this.htmlStructure));

        }

        private initElements = (): void => {
            $("#accordion").accordion();
            //$("#selectmenu").selectmenu();
            $(".saisei-gallery-select").selectmenu();
            $("#dialog").dialog({
                autoOpen: false,
                width: 500,
                buttons: [
                    {
                        text: "Close",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
            // Link to open the dialog 
            $(".saisei-gallery-image").click(function (event) {
                $("#dialog").dialog("open");
                event.preventDefault();
            });

            $("#button-icon01").button({
                icon: "ui-icon ui-icon-seek-first",
                showLabel: false
            });
            $("#button-icon02").button({
                icon: "ui-icon ui-icon-circle-triangle-w",
                showLabel: false
            });
            $("#button-icon03").button({
                icon: "ui-icon ui-icon-circle-triangle-e",
                showLabel: false
            });
            $("#button-icon04").button({
                icon: "ui-icon ui-icon-seek-end",
                showLabel: false
            });
        }

        private setJQueryAccess = ($elem: JQuery): void => {
            this.$galleryEvent = $elem.find("#selectmenu01");
            this.$galleryCreator = $elem.find("#selectmenu02");
            this.$galleryLocation = $elem.find("#selectmenu03");

        }

        private initMenu = (): void => {
            // selectMenu
            var eventList: SaiseiNews[] = saisei.model.requestAllEvents();
            var creatorList: SaiseiPhotoName[] = saisei.model.requestAllCreators();
            var menuEvent: string = "";
            var menuCreator: string = "";
            var menuLocation: string = "";
            var opTag1 = '<option>';
            var opTag1a = '<option value=';
            var opTag1b = '>';
            var opTag2 = '</option>';

            var eventRec: string = "";
            // イベントリストの先頭は2099年のダミーレコード
            for (var i = 1; i < eventList.length; i++) {
                // yyyymmdd,eventNameは必須なので存在チェックは省略
                var disEventText = eventList[i].yyyyNen + " " + eventList[i].eventName + " " + eventList[i].titleName;
                eventRec = eventRec + opTag1a + eventList[i].yyyymmdd + opTag1b + disEventText + opTag2;
            }
            this.$galleryEvent.empty();
            this.$galleryEvent.append(eventRec);

            // 作者名にはshortNameを割り振っておく
            var creatorRec: string = "";
            for (var i = 0; i < creatorList.length; i++) {
                creatorRec = creatorRec + opTag1a + creatorList[i].shortName + opTag1b + creatorList[i].creatorHint + opTag2;
            }
            this.$galleryCreator.empty();
            this.$galleryCreator.append(creatorRec);

            // todo 施設名称を選択したときに，valの複数のイベントを処理する．リスト再分類のUtilが必要
            var locationRec: string = "<option>イベントリストと施設名称別に再分類する</option>";

            this.$galleryLocation.empty();
            this.$galleryLocation.append(locationRec);
        }
    }

    export var gallery = new Gallery();
}