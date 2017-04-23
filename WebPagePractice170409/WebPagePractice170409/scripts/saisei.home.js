var saisei;
(function (saisei) {
    var Home = (function () {
        function Home() {
            var _this = this;
            //htmlStructure = '<button class="saisei-home-img"></button>';
            this.htmlStructure = '<button class="saisei-home-img"></button>'
                + '<div id="dialog" title="Dialog Title">'
                + '<div class="saisei-home-dialog"><img src="images/shell-img001.jpg" alt="test" class="saisei-home-dialog-img" /></div>'
                + '</div>'
                + '<div class="saisei-home-img-text">作品タイトル</div>'
                + '<div class="saisei-home-dl-title">更新情報</div>'
                + '<dl class="saisei-home-dl">'
                + '<dt id = "home-dt0" class="saisei-home-dt">20XX/00/00</dt>'
                + '<dd id = "home-dd0" class="saisei-home-dd">更新情報説明001</dd>'
                + '<dt id = "home-dt1" class="saisei-home-dt">20XX/00/01</dt>'
                + '<dd id = "home-dd1" class="saisei-home-dd">更新情報説明002 説明文 説明文 説明文 説明文 説明文 説明文 説明文</dd>'
                + '<dt id = "home-dt2" class="saisei-home-dt">20XX/00/02</dt>'
                + '<dd id = "home-dd2" class="saisei-home-dd">更新情報説明003 説明文 説明文 説明文 説明文 説明文 説明文 説明文</dd>'
                + '</dl>';
            this.initModule = function ($container) {
                //alert("start initHome");
                _this.$homeElem = $container.find('.saisei-main-home');
                _this.$homeContents = $container.find('.saisei-main-contents');
                _this.setJQueryAccess(_this.$homeContents.append(_this.htmlStructure));
                _this.bindHoverHandle(_this.$homeElem);
                _this.bindClickHandle(_this.$homeElem);
                _this.bindDialogHandle();
            };
            this.setJQueryAccess = function ($elem) {
                _this.$home_img = $elem.find(".saisei-home-img");
                _this.$home_dialog = $elem.find("#dialog");
                _this.$home_dialog_img = $elem.find(".saisei-home-dialog-img");
                _this.$saisei_home_img_text = $elem.find(".saisei-home-img-text");
                ;
                _this.$home_dt0 = $elem.find("#home-dt0");
                ;
                _this.$home_dd0 = $elem.find("#home-dd0");
                ;
                _this.$home_dt1 = $elem.find("#home-dt1");
                ;
                _this.$home_dd1 = $elem.find("#home-dd1");
                ;
                _this.$home_dt2 = $elem.find("#home-dt2");
                ;
                _this.$home_dd2 = $elem.find("#home-dd2");
                ;
            };
            this.bindHoverHandle = function ($elem) {
                $elem.hover(function () {
                    $($elem).toggleClass('saisei-hover');
                });
            };
            this.bindClickHandle = function ($elem) {
                $elem.bind("click", function () {
                    // ロードするデータ（写真ファイルのパス，説明，更新履歴情報）を取得
                    // タグを生成して，$homeContentsに追加する
                    // 更新履歴のテキストからは，該当するイベントのギャラリーページが生成されるようにする
                    var photoList = saisei.model.requestImgData("201011sogetsuten_hagiya");
                    var newsList = saisei.model.requestNewsData("2017");
                    //alert(newsList[0].yyyyNen + " " + newsList[0].eventName);
                    _this.pushImgData(photoList);
                    _this.pushNewsData(newsList);
                });
            };
            this.bindDialogHandle = function () {
                _this.$home_dialog.dialog({
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
                _this.$home_img.click(function (event) {
                    $("#dialog").dialog("open");
                    event.preventDefault();
                });
            };
        }
        Home.prototype.pushImgData = function (photoList) {
            // buttonとdialogに同じソースを割りつける
            var imgPath = saisei.prefixPath + photoList[0];
            var imgUrl = 'url("' + imgPath + '")';
            this.$home_img.css('background-image', imgUrl);
            this.$home_dialog_img.attr('src', imgPath);
        };
        Home.prototype.pushNewsData = function (newsList) {
        };
        return Home;
    }());
    saisei.home = new Home();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.home.js.map