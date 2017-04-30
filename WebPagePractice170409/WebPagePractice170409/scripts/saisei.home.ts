namespace saisei {
    class Home implements SaiseiElement {
        private $homeElem: JQuery;
        private $homeContents: JQuery;
        private $home_img: JQuery;
        private $home_dialog: JQuery;
        private $home_dialog_img: JQuery;
        private $saisei_home_img_text: JQuery;
        private $saisei_home_dl: JQuery;
        private $home_dt: JQuery[] = new Array<JQuery>();
        private $home_dd: JQuery[] = new Array<JQuery>();

        htmlStructure =
        '<button class="saisei-home-img"></button>'
        + '<div id="dialog">'
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
                    var photoList: string[] = saisei.model.requestImgData(saisei.topPagePhoto);
                    //alert(newsList[0].yyyyNen + " " + newsList[0].eventName);
                    this.pushImgData(photoList);
                    this.pushNewsData(this.getNewsList());
                }
            );
        }

        private reloadPage = (): void => {
            this.$homeContents.empty();

            var homeHtml = this.htmlStructure + this.getDlTags(saisei.newsRowNumber);
            this.setJQueryAccess(this.$homeContents.append(homeHtml));
            this.bindDialogHandle();
        }

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
            this.$home_dialog = $elem.find("#dialog");
            this.$home_dialog_img = $elem.find(".saisei-home-dialog-img");
            this.$saisei_home_img_text = $elem.find(".saisei-home-img-text");
            this.$saisei_home_dl = $elem.find(".saisei-home-dl");

            for (var i = 0; i < saisei.newsRowNumber; i++) {
                this.$home_dt.push($elem.find("#home-dt" + i));
                this.$home_dd.push($elem.find("#home-dd" + i));
            }
        }

        private getNewsList = (): SaiseiNews[] => {
            var dt = new Date();

            var thisYear = String(dt.getFullYear());
            var thisYearList: SaiseiNews[] = saisei.model.requestNewsData(thisYear);

            dt.setMonth(dt.getMonth() - 12);
            var lastYear = String(dt.getFullYear());
            var lastYearList: SaiseiNews[] = saisei.model.requestNewsData(lastYear);

            return thisYearList.concat(lastYearList);
        }

        private pushImgData(photoList: string[]): void {
            // buttonとdialogに同じソースを割りつける
            var imgPath = saisei.prefixPath + photoList[0];
            var imgUrl = 'url("' + imgPath + '")'

            this.$home_img.css('background-image', imgUrl);
            this.$home_dialog_img.attr('src', imgPath);

            // title
            var titleText = saisei.model.requestCreatorName(photoList[0]) + " 作品";
            this.$saisei_home_img_text.text(titleText);
        }

        private pushNewsData(newsList: SaiseiNews[]): void {
            for (var i = 0; i < newsList.length; i++) {
                //alert(newsList.length + " " + newsList[i].yyyymmdd);
                // 年月，開始日，イベント名は必須とする
                var dtStr = newsList[i].yyyyNen + newsList[i].mmddaaStart;
                var ddStr = newsList[i].eventName;

                if (newsList[i].mmddaaEnd.length > 0) {
                    dtStr = dtStr + " ～ " + newsList[i].mmddaaEnd;
                }

                if (newsList[i].location.length > 0) {
                    if (i === 0) {
                        ddStr = ddStr + "(" + newsList[i].location + ") を更新しました";
                    } else {
                        ddStr = ddStr + "(" + newsList[i].location + ") ";
                    }
                    
                } else {
                    ddStr = ddStr + " "
                }
                this.$home_dt[i].text(dtStr);
                this.$home_dd[i].text(ddStr);
            }
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
            this.$home_img.click(function (event) {
                var title = $(".saisei-home-img-text").text();
                //alert(event.target.className);
                $("#dialog").dialog("option", "title", title).dialog("open");
                event.preventDefault();
            });
        }

    }

    export var home = new Home();
}