namespace saisei {
    class Home implements SaiseiElement {
        private $homeElem: JQuery;
        private $homeContents: JQuery;
        private $home_img;
        private $home_dialog;
        private $home_dialog_img;
        private $saisei_home_img_text;
        private $home_dt0;
        private $home_dd0;
        private $home_dt1;
        private $home_dd1;
        private $home_dt2;
        private $home_dd2;

        //htmlStructure = '<button class="saisei-home-img"></button>';
        htmlStructure =
        '<button class="saisei-home-img"></button>'
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

        initModule = ($container: JQuery) => {
            //alert("start initHome");
            this.$homeElem = $container.find('.saisei-main-home');
            this.$homeContents = $container.find('.saisei-main-contents');

            this.setJQueryAccess(this.$homeContents.append(this.htmlStructure));

            this.bindHoverHandle(this.$homeElem);
            this.bindClickHandle(this.$homeElem);
            this.bindDialogHandle();
        }

        private setJQueryAccess = ($elem: JQuery): void => {
            this.$home_img = $elem.find(".saisei-home-img");
            this.$home_dialog = $elem.find("#dialog");
            this.$home_dialog_img = $elem.find(".saisei-home-dialog-img");
            this.$saisei_home_img_text = $elem.find(".saisei-home-img-text");;
            this.$home_dt0 = $elem.find("#home-dt0");;
            this.$home_dd0 = $elem.find("#home-dd0");;
            this.$home_dt1 = $elem.find("#home-dt1");;
            this.$home_dd1 = $elem.find("#home-dd1");;
            this.$home_dt2 = $elem.find("#home-dt2");;
            this.$home_dd2 = $elem.find("#home-dd2");;
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
                    var photoList: string[] = saisei.model.requestImgData("201011sogetsuten_hagiya");
                    var newsList: SaiseiNews[] = saisei.model.requestNewsData("2017");
                    //alert(newsList[0].yyyyNen + " " + newsList[0].eventName);
                    this.pushImgData(photoList);
                    this.pushNewsData(newsList);
                }
            );
        }

        private pushImgData(photoList: string[]): void {
            // buttonとdialogに同じソースを割りつける
            var imgPath = saisei.prefixPath + photoList[0];
            var imgUrl = 'url("' + imgPath + '")'

            this.$home_img.css('background-image', imgUrl);
            this.$home_dialog_img.attr('src', imgPath);

        }

        private pushNewsData(newsList: SaiseiNews[]): void {

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
                $("#dialog").dialog("open");
                event.preventDefault();
            });
        }

    }

    export var home = new Home();
}