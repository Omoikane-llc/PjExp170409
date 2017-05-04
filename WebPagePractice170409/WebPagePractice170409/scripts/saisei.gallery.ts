namespace saisei {
    class Gallery implements SaiseiElement {
        private $galleryElem: JQuery;
        private $galleryContents: JQuery;
        private $galleryEvent: JQuery;
        private $galleryCreator: JQuery;
        private $galleryLocation: JQuery;
        private $galleryButtonSet: JQuery;
        private stateMap: SaiseiGalleryState = new GalleryState();

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
                    this.initHandle();
                }
            );
        }

        private reloadPage = (): void => {
            this.$galleryContents.empty();
            this.setJQueryAccess(this.$galleryContents.append(this.htmlStructure));

        }

        private initElements = (): void => {

            $("#accordion").accordion();
            //$(".saisei-gallery-select").selectmenu();
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
            this.$galleryButtonSet = $elem.find("saisei-gallery-buttonset");
        }

        private initMenu = (): void => {
            // selectMenu
            this.initEventVal();
            this.initCreatorVal();
            this.initLocationVal();
        }

        private initEventVal = (): void => {
            var eventList: SaiseiNews[] = saisei.model.requestAllEvents();
            var menuEvent: string = "";
            var opTag1 = '<option>';
            var opTag1a = '<option value=';
            var opTag1b = '>';
            var opTag2 = '</option>';

            // イベント名にはyyyymmddとlocationを割り振っておく
            var eventRec: string = "";
            for (var i = 0; i < eventList.length; i++) {
                // yyyymmdd,eventName,locationは必須なので存在チェックは省略
                var eventVal = "{" + eventList[i].yyyymmdd + "," + eventList[i].location + "}";
                var disEventText = eventList[i].yyyyNen + " " + eventList[i].eventName + " " + eventList[i].titleName;
                eventRec = eventRec + opTag1a + eventVal + opTag1b + disEventText + opTag2;
            }
            this.$galleryEvent.empty();
            this.$galleryEvent.append(eventRec);
        }

        private initCreatorVal = (): void => {
            var creatorList: SaiseiPhotoName[] = saisei.model.requestAllCreators();
            var menuCreator: string = "";
            var opTag1 = '<option>';
            var opTag1a = '<option value=';
            var opTag1b = '>';
            var opTag2 = '</option>';

            // 作者名にはshortNameを割り振っておく
            var creatorRec: string = "";
            for (var i = 0; i < creatorList.length; i++) {
                creatorRec = creatorRec + opTag1a + creatorList[i].shortName + opTag1b + creatorList[i].creatorHint + opTag2;
            }
            this.$galleryCreator.empty();
            this.$galleryCreator.append(creatorRec);
        }

        private initLocationVal = (): void => {
            var locationList: SaiseiLocation[] = saisei.model.requestAllLocations();
            var menuLocation: string = "";
            var opTag1 = '<option>';
            var opTag1a = '<option value=';
            var opTag1b = '>';
            var opTag2 = '</option>';

            // eventAllとlocationAllは別のリクエストにして，modelに隠ぺいする．データ構造依存は切り離す
            var locationRec: string = "";
            for (var i = 0; i < locationList.length; i++) {
                var locVal = "";
                for (var j = 0; j < locationList[i].eventList.length; j++) {
                    locVal = locVal + "{" + locationList[i].eventList[j].yyyymmdd + "," + locationList[i].eventList[j].eventName + "}";
                }
                locationRec = locationRec + opTag1a + locVal + opTag1b + locationList[i].location + opTag2;
            }
            this.$galleryLocation.empty();
            this.$galleryLocation.append(locationRec);
        }

        private initHandle = (): void => {
            //alert("initHandle");
            this.initButton01Handle($("#button-icon01"));
            this.initButton02Handle($("#button-icon02"));
            this.initButton03Handle($("#button-icon03"));
            this.initButton04Handle($("#button-icon04"));

            this.initChange01Handle(this.$galleryEvent);
            this.initChange02Handle(this.$galleryCreator);
            this.initChange03Handle(this.$galleryLocation);
        }

        private initButton01Handle = ($elem: JQuery): void => {
            $elem.bind("click",() => {
                if (this.stateMap.isStartPage) {
                    alert("not need action");
                } else if (this.stateMap.hasMulchPages) {
                    alert("go to start page");
                    this.stateMap.isStartPage = true;
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private initButton02Handle = ($elem: JQuery): void => {
            $elem.bind("click", () => {
                if (this.stateMap.isStartPage) {
                    alert("not need action");
                } else if (this.stateMap.hasMulchPages) {
                    alert("go back previous page");
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private initButton03Handle = ($elem: JQuery): void => {
            $elem.bind("click", () => {
                if (this.stateMap.isEndPage) {
                    alert("not need action");
                } else if (this.stateMap.hasMulchPages) {
                    alert("go to next page");
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private initButton04Handle = ($elem: JQuery): void => {
            $elem.bind("click", () => {
                if (this.stateMap.isEndPage) {
                    alert("not need action");
                } else if (this.stateMap.hasMulchPages) {
                    alert("go to end page");
                    this.stateMap.isEndPage = true;
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private initChange01Handle = ($elem: JQuery): void => {
            $elem.selectmenu({
                change: function (event, ui) {
                    //alert("change");
                    alert("label " + ui.item.label + " value " + ui.item.value);
                }
            });
        }

        private initChange02Handle = ($elem: JQuery): void => {
            $elem.selectmenu({
                change: function (event, ui) {
                    //alert("change");
                    alert("label " + ui.item.label + " value " + ui.item.value);
                }
            });
        }        

        private initChange03Handle = ($elem: JQuery): void => {
            $elem.selectmenu({
                change: function (event, ui) {
                    //alert("change");
                    alert("label " + ui.item.label + " value " + ui.item.value);
                }
            });
        }
    }

    class GalleryState implements SaiseiGalleryState {
        isStartPage: boolean;
        hasMulchPages: boolean;
        isEndPage: boolean;

        constructor() {
            this.isStartPage = true;
            this.hasMulchPages = false;
            this.isEndPage = true;
        }
    }

    export var gallery = new Gallery();
}