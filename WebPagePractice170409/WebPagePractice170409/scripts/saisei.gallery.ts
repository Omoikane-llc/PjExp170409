namespace saisei {
    class Gallery implements SaiseiElement {
        private $galleryElem: JQuery;
        private $galleryContents: JQuery;
        private $gallerySearch: JQuery;
        private $galleryEvent: JQuery;
        private $galleryCreator: JQuery;
        private $galleryLocation: JQuery;
        private $galleryButtonSet: JQuery;
        private $galleryImages: JQuery;

        private imgBlockIds: string[] = ["#galleryImgBlock01", "#galleryImgBlock02", "#galleryImgBlock03", "#galleryImgBlock04", "#galleryImgBlock05"];
        private stateMap: SaiseiGalleryState = new GalleryState();
         
        htmlStructure = 
        '<div class="saisei-gallery-search">'
        + '    <div id="accordion">'
        + '        <h3>イベント名</h3>'
        + '        <div>'
        + '            <select id="selectmenu01" class="saisei-gallery-select">'
        + '                <option>イベント名を選択</option>'
        + '            </select>'
        + '        </div>'
        + '        <h3>作者名</h3>'
        + '        <div>'
        + '            <select id="selectmenu02" class="saisei-gallery-select">'
        + '                <option>作者名を選択</option>'
        + '            </select>'
        + '        </div>'
        + '        <h3>施設・場所名</h3>'
        + '        <div>'
        + '            <select id="selectmenu03" class="saisei-gallery-select">'
        + '                <option>施設・場所名を選択</option>'
        + '            </select>'
        + '        </div>'
        + '    </div>'
        + '</div>'
        + '<!-- 横並びは前後のタグの改行を削除する 余白対策 -->'
        + '<div class="saisei-gallery-upperblock">'
        + '    <div id="galleryImgBlock01" class="saisei-gallery-block">'
        + '        <div class="saisei-gallery-upperimg-text">作品タイトル</div>'
        + '        <button class="saisei-gallery-image" style="background-image:url('+"'images/shell-img001.jpg'"+')"></button> '
        + '    </div><div id="galleryImgBlock02" class="saisei-gallery-block">'
        + '        <div class="saisei-gallery-upperimg-text">作品タイトル</div>'
        + '        <button class="saisei-gallery-image" style="background-image:url(' + "'images/shell-img001.jpg'" +')"></button> '
        + '    </div><div id="galleryImgBlock03" class="saisei-gallery-block">'
        + '        <div class="saisei-gallery-upperimg-text">作品タイトル</div>'
        + '        <button class="saisei-gallery-image" style="background-image:url(' + "'images/shell-img001.jpg'" +')"></button> '
        + '    </div>'
        + '</div>'
        + '<div class="saisei-gallery-lowerblock">'
        + '    <div id="galleryImgBlock04" class="saisei-gallery-block">'
        + '        <button class="saisei-gallery-image" style="background-image:url(' + "'images/shell-img001.jpg'" +')"></button> '
        + '        <div class="saisei-gallery-lowerimg-text">作品タイトル</div>'
        + '    </div><div id="galleryImgBlock05" class="saisei-gallery-block">'
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
        + '<div id="gallery-dialog" title="Dialog Title">'
        + '    <div class="saisei-gallery-dialog"><img src="images/shell-img001.jpg" alt="jpg photo data" class="saisei-gallery-dialog-img" /></div>'
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

                    // 初期表示
                    this.initDisplay(saisei.shell.requestText);
                }
            );
        }

        private initDisplay = (requestText:string): void => {
            var yyyymmdd: string;
            var eventName: string;

            if (requestText.length > "yyyymmdd,".length) {
                var reqVals = requestText.split(",");
                yyyymmdd = reqVals[0];
                eventName = reqVals[1];

            } else {
                var defaultVal = $("#selectmenu01 option:first").val();
                var defaultText = $("#selectmenu01 option:first").text()
                var values: string[] = saisei.utils.parseTuple(defaultVal);
                yyyymmdd = values[0];
                eventName = defaultText.substring("yyyy年 ".length);
            }
            
            var selectKey: string = saisei.utils.getKeyByEvent(yyyymmdd, eventName);
            var imgList: string[] = saisei.model.requestImgData(selectKey);

            $(".saisei-gallery-search").trigger("changeImgList", imgList.join(","));
        }

        private reloadPage = (): void => {
            this.$galleryContents.empty();
            this.setJQueryAccess(this.$galleryContents.append(this.htmlStructure));

        }

        private initElements = (): void => {

            $("#accordion").accordion();

            $("#gallery-dialog").dialog({
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
            $(".saisei-gallery-upperblock,.saisei-gallery-lowerblock")
                .bind("openDialog", (event: JQueryEventObject, data: string) => {

                    var tempText: string[] = data.split(",");
                    var title = tempText[0];
                    var imgPath = saisei.utils.getPathFromStyleUri(tempText[1]);

                    // データのある時だけdialog表示
                    if (imgPath.indexOf(".jpg") !== -1) {
                        $(".saisei-gallery-dialog-img").attr('src', imgPath);
                        $("#gallery-dialog").dialog("option", "title", title).dialog("open");
                        event.preventDefault();
                    }

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
            this.$gallerySearch = $elem.find('.saisei-gallery-search');
            this.$galleryEvent = $elem.find("#selectmenu01");
            this.$galleryCreator = $elem.find("#selectmenu02");
            this.$galleryLocation = $elem.find("#selectmenu03");
            this.$galleryImages = $elem.find(".saisei-gallery-upperblock");
            this.$galleryButtonSet = $elem.find(".saisei-gallery-buttonset");

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
            this.$galleryEvent.empty().append(eventRec);
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
            this.$galleryCreator.empty().append(creatorRec);
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
            this.$galleryLocation.empty().append(locationRec);
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

            this.initChangeImgListHandle();
            this.initChangeImgSrcHandle();
        }

        private initButton01Handle = ($elem: JQuery): void => {
            $elem.bind("click",() => {
                if (this.stateMap.isStartPage) {
                    alert("最初のページです");
                } else if (this.stateMap.hasMulchPages) {
                    this.stateMap.startIndex = 0;
                    this.swichPageState(this.stateMap.startIndex);
                    $(".saisei-gallery-image").trigger("changeImgSrc");
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private initButton02Handle = ($elem: JQuery): void => {
            $elem.bind("click", () => {
                if (this.stateMap.isStartPage) {
                    alert("最初のページです");
                } else if (this.stateMap.hasMulchPages) {
                    var nextStartIndex = Math.max(this.stateMap.startIndex - saisei.maxPhotoInPage, 0);
                    this.stateMap.startIndex = nextStartIndex;
                    this.swichPageState(this.stateMap.startIndex);
                    $(".saisei-gallery-image").trigger("changeImgSrc");
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private initButton03Handle = ($elem: JQuery): void => {
            $elem.bind("click", () => {
                if (this.stateMap.isEndPage) {
                    alert("最後のページです");
                } else if (this.stateMap.hasMulchPages) {
                    var nextStartIndex = Math.min(this.stateMap.startIndex + saisei.maxPhotoInPage, this.stateMap.imgList.length - 1);
                    this.stateMap.startIndex = nextStartIndex;
                    this.swichPageState(this.stateMap.startIndex);
                    $(".saisei-gallery-image").trigger("changeImgSrc");
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private initButton04Handle = ($elem: JQuery): void => {
            $elem.bind("click", () => {
                if (this.stateMap.isEndPage) {
                    alert("最後のページです");
                } else if (this.stateMap.hasMulchPages) {
                    this.stateMap.startIndex = this.stateMap.imgList.length - saisei.maxPhotoInPage;
                    this.swichPageState(this.stateMap.startIndex);
                    $(".saisei-gallery-image").trigger("changeImgSrc");
                } else {
                    alert("not need action"); // dummy action
                }
            });
        }

        private swichPageState = (startIndex: number): void => {

            var imgTotal = this.stateMap.imgList.length;

            if (imgTotal === 0 || imgTotal === saisei.maxPhotoInPage) {
                this.stateMap.isStartPage = true;
                this.stateMap.isEndPage = true;
            } else if (startIndex === 0) {
                this.stateMap.isStartPage = true;
                this.stateMap.isEndPage = false;
            } else if ((imgTotal - startIndex - 1) < saisei.maxPhotoInPage) {
                this.stateMap.isStartPage = false;
                this.stateMap.isEndPage = true;
            } else {
                this.stateMap.isStartPage = false;
                this.stateMap.isEndPage = false;
            }

            this.swichContinueGuideText(this.stateMap.hasMulchPages);
        }

        private initChange01Handle = ($elem: JQuery): void => {
            $elem.selectmenu({
                change: function (event, ui) {
                    var values: string[] = saisei.utils.parseTuple(ui.item.value);
                    var eventName = ui.item.label.substring("yyyy年 ".length);
                    var selectKey: string = saisei.utils.getKeyByEvent(values[0], eventName);
                    var imgList: string[] = saisei.model.requestImgData(selectKey);
                    $(".saisei-gallery-search").trigger("changeImgList", imgList.join(","));
                }
            });

        }

        private initChange02Handle = ($elem: JQuery): void => {
            $elem.selectmenu({
                change: function (event, ui) {
                    var imgList: string[] = saisei.model.requestImgData(ui.item.value);
                    $(".saisei-gallery-search").trigger("changeImgList", imgList.join(","));
                }
            });
        }        

        private initChange03Handle = ($elem: JQuery): void => {
            $elem.selectmenu({
                change: function (event, ui) {
                    var imgList: string[] = new Array<string>();
                    var values: string[] = saisei.utils.parseTuple(ui.item.value);
                    for (var i = 0; (2 * i) < values.length; i++) {
                        var selectKey: string = saisei.utils.getKeyByEvent(values[2 * i], values[2 * i + 1]);
                        var tempList: string[] = saisei.model.requestImgData(selectKey);
                        for (var j = 0; j < tempList.length; j++) {
                            imgList.push(tempList[j]);
                        }                                               
                    }
                    $(".saisei-gallery-search").trigger("changeImgList", imgList.join(","));
                }
            });
        }

        private getImgListFromEvent = (yyyymmdd: string, eventName: string) => {
            var selectKey: string = saisei.utils.getKeyByEvent(yyyymmdd, eventName);
            var imgList: string[] = saisei.model.requestImgData(selectKey);
            return imgList;
        }

        private initChangeImgListHandle = (): void => {
            this.$gallerySearch.bind("changeImgList", (event: JQueryEventObject, imgList: string) => {

                this.initStateMap(imgList);
                $(".saisei-gallery-image").trigger("changeImgSrc");

            });
        }

        private initChangeImgSrcHandle = (): void => {
            for (var i = 0; i < this.imgBlockIds.length; i++) {
                this.changeImgSrcImp(i); // ここに直接Impの中身を書くとiがクロージャから外れてしまう
            }
        }

        private changeImgSrcImp = (index: number) => {
            $(this.imgBlockIds[index]).bind("changeImgSrc", () => {
                var divTag1a = '<div class="saisei-gallery-upperimg-text">';
                var divTag1aa = '<div class="saisei-gallery-lowerimg-text">';
                var divTag1b = '</div>';
                var btnTag1a = '<button class="saisei-gallery-image" style="background-image:url(';
                var btnTag1b = ')"></button>';
                var imgIndex = this.stateMap.startIndex + index;
                var imgPath = (saisei.prefixPath + this.stateMap.imgList[imgIndex]).trim; // IEでファイル名末尾"(%22)でGETが投げられる場合がある

                var titleText = "";
                if (this.stateMap.imgList.length > imgIndex && this.stateMap.imgList[imgIndex].length > 0) {
                    titleText = saisei.model.requestCreatorName(this.stateMap.imgList[imgIndex]) + " 作品";
                }

                var blockHtml = "";
                if (index < 3) {
                    blockHtml = divTag1a + titleText + divTag1b + btnTag1a + imgPath + btnTag1b;
                } else {
                    blockHtml = btnTag1a + imgPath + btnTag1b + divTag1aa + titleText + divTag1b;
                }

                $(this.imgBlockIds[index]).empty().append(blockHtml);
            }).bind("click", () => {
                var title = $(this.imgBlockIds[index]).text();
                var srcStr = $(this.imgBlockIds[index]).find('button').attr('style');
                $(this.imgBlockIds[index]).trigger('openDialog', title + "," + srcStr);
            });
        }

        private initStateMap = (imgList: string): void => {
            var list: string[] = imgList.split(",");
            this.stateMap.imgList = saisei.utils.validateImgList(list);

            this.stateMap.startIndex = 0;   
                     
            if (list.length > saisei.maxPhotoInPage) {
                this.stateMap.hasMulchPages = true;
            } else {
                this.stateMap.hasMulchPages = false;
            }

            this.swichPageState(this.stateMap.startIndex);
            this.swichContinueGuideText(this.stateMap.hasMulchPages);
        }

        private swichContinueGuideText = (hasMulchPages: boolean): void => {
            var disText = "";
            if (hasMulchPages && !this.stateMap.isEndPage) {
                disText = "続きがあります";
            } else if (!hasMulchPages || this.stateMap.isEndPage) {
                disText = "続きはありません";
            }
            $(".saisei-gallery-blockdummy").text(disText);
        }
    }

    class GalleryState implements SaiseiGalleryState {
        isStartPage: boolean;
        hasMulchPages: boolean;
        isEndPage: boolean;
        imgList: string[];
        startIndex: number;

        constructor() {
            this.isStartPage = true;
            this.hasMulchPages = false;
            this.isEndPage = true;
            this.imgList = new Array<string>();
            this.startIndex = 0;
        }
    }

    export var gallery = new Gallery();
}