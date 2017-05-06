namespace saisei {
    class Home implements SaiseiElement {
        private $homeElem: JQuery;
        private $homeContents: JQuery;
        private $home_img: JQuery;
        private $home_dialog: JQuery;
        private $home_dialog_img: JQuery;
        private $saisei_home_img_text: JQuery;
        private $saisei_home_dl: JQuery;

        htmlStructure =
        '<button class="saisei-home-img"></button>'
        + '<div id="home-dialog">'
        + '<div class="saisei-home-dialog"><img src="images/shell-img001.jpg" alt="test" class="saisei-home-dialog-img" /></div>'
        + '</div>'
        + '<div class="saisei-home-img-text">作品タイトル</div>'
        + '<div class="saisei-home-dl-title">更新情報</div>';

        initModule = ($container: JQuery) => {
            this.$homeElem = $container.find('.saisei-main-home');
            this.$homeContents = $container.find('.saisei-main-contents');

            this.bindHoverHandle(this.$homeElem);
            this.bindClickHandle(this.$homeElem);
        }

        private bindHoverHandle = ($elem: JQuery) => {
            $elem.hover(
                () => {
                    $($elem).toggleClass('saisei-hover');
                }
            );
        }

        private bindClickHandle = ($elem: JQuery) => {
            $elem.bind("click",
                () => {
                    // ロードするデータ（写真ファイルのパス，説明，更新履歴情報）を取得
                    // タグを生成して，$homeContentsに追加する
                    // 更新履歴のテキストからは，該当するイベントのギャラリーページが生成されるようにする
                    this.reloadPage();
                    this.initImgList();
                    this.initNewsList();
                    
                }
            );
        }

        private reloadPage = (): void => {
            var homeHtml = this.htmlStructure + this.getDlTags(saisei.newsRowNumber);
            this.setJQueryAccess(this.$homeContents.empty().append(homeHtml));
        }
        
        private initImgList = () => {
            // topPagePhotoの取得，割り付け
            var photoList: string[] = saisei.model.requestImgData(saisei.topPagePhoto);
            var imgPath = saisei.prefixPath + photoList[0];
            var imgUrl = 'url("' + imgPath + '")'

            this.$home_img.css('background-image', imgUrl);
            this.$home_dialog_img.attr('src', imgPath);

            var titleText = saisei.model.requestCreatorName(photoList[0]) + " 作品";
            this.$saisei_home_img_text.text(titleText);

            this.bindDialogHandle();
        }

        // なくても良いが一応置いておく
        private getDlTags = (newsRowNumber: number): string => {
            var sdl = '<dl class="saisei-home-dl">';
            var edl = '</dl>';
            var dtdd = "";

            for (var i = 0; i < newsRowNumber; i++) {
                var dt = '<dt id = "home-dt' + i + '" class="saisei-home-dt">YYYY年MM月DD日（aa）～MM月DD日（aa）</dt>';
                var dd = '<dd id = "home-dd' + i + '" class="saisei-home-dd">eventName(location)を更新しました</dd>';
                dtdd = dtdd + dt + dd;
            }

            return (sdl + dtdd + edl);
        }

        private setJQueryAccess = ($elem: JQuery): void => {
            this.$home_img = $elem.find(".saisei-home-img");
            this.$home_dialog = $elem.find("#home-dialog");
            this.$home_dialog_img = $elem.find(".saisei-home-dialog-img");
            this.$saisei_home_img_text = $elem.find(".saisei-home-img-text");
            this.$saisei_home_dl = $elem.find(".saisei-home-dl");

        }

        private initNewsList = (): void => {
            var dt = new Date();

            var thisYear = String(dt.getFullYear());
            var newsList: SaiseiNews[] = saisei.model.requestNewsData(thisYear);

            dt.setMonth(dt.getMonth() - 12);
            var lastYear = String(dt.getFullYear());
            var lastYearList: SaiseiNews[] = saisei.model.requestNewsData(lastYear);

            for (var i = 0; i < lastYearList.length; i++) {
                newsList.push(lastYearList[i]);
            }

            this.pushNewsData(newsList);
            this.bindDlDtHandle();
        }

        private pushNewsData = (newsList: SaiseiNews[]): void => {
            var dtTag1 = '<dt class="saisei-home-dt">';
            var dtTag2 = '</dt>';
            var ddTag1a = '<dd id="';
            var ddTag1b = '" class="saisei-home-dd">';
            var ddTag2 = '</dd>';

            var newsHtml:string = "";
            for (var i = 0; i < saisei.newsRowNumber; i++) {
                //alert(newsList.length + " " + newsList[i].yyyymmdd);
                // 年月，開始日，イベント名は必須とする
                var dtStr = newsList[i].yyyyNen + newsList[i].mmddaaStart;
                var ddTag1AndStr = ddTag1a + i + "-" + newsList[i].yyyymmdd + ddTag1b + newsList[i].eventName +" "+ newsList[i].titleName;

                if (newsList[i].mmddaaEnd.length > 0) {
                    dtStr = dtStr + " ～ " + newsList[i].mmddaaEnd;
                }

                if (newsList[i].location.length > 0) {
                    if (i === 0) {
                        ddTag1AndStr = ddTag1AndStr + "(" + newsList[i].location + ") を更新しました";
                    } else {
                        ddTag1AndStr = ddTag1AndStr + "(" + newsList[i].location + ") ";
                    }

                } else {
                    ddTag1AndStr = ddTag1AndStr + " "
                }

                newsHtml = newsHtml + dtTag1 + dtStr + dtTag2 + ddTag1AndStr + ddTag2;
            }
            this.$saisei_home_dl.empty().append(newsHtml);
        }

        private bindDlDtHandle = (): void => {
            $(".saisei-home-dd").bind("click", (event: JQueryEventObject) => {

                var ddId = event.target.id;
                var ddText = $("#" + ddId).text();

                var yyyymmdd = ddId.substring(2, "i-yyyymmdd".length);
                var eventName = ddText.substring(0, ddText.indexOf("("));
                var values = yyyymmdd + "," + eventName;
                saisei.shell.requestText = values;
                //alert("dd click " + values);
                $(".saisei-main-gallery").trigger("click");
            });
        }

        private bindDialogHandle = (): void => {
            this.$home_dialog.dialog({
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
            this.$home_img.bind("click", () => {
                var title = $(".saisei-home-img-text").text();
                var tempPath = $(".saisei-home-img").css('background-image');
                var imgPath ="images/ui-bg_diagonals-small_0_aaaaaa_40x40.png"
                if (tempPath.indexOf("jpg") !== -1) {
                    var startIndex = tempPath.indexOf("images/");
                    var endIndex = tempPath.indexOf(".jpg") + 4;
                    imgPath = tempPath.substring(startIndex, endIndex);
                }
                //alert(title + " " + imgPath);
                if (imgPath.indexOf(".jpg") !== -1) {
                    $(".saisei-home-img").attr('src', imgPath);
                    $("#home-dialog").dialog("option", "title", title).dialog("open");
                    event.preventDefault();
                }                
            });
        }

    }

    export var home = new Home();
}