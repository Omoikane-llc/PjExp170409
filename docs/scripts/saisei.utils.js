var saisei;
(function (saisei) {
    var Utils = (function () {
        function Utils() {
            // {xxx,yyy} => [xxx,yyy]
            this.parseTuple = function (record) {
                var temp = record.trim().split("{").join("").split("}").join(","); // replaceは先頭要素にのみ作用
                var result = temp.split(",");
                return result;
            };
            // EventNameからimgファイル検索のためのキーを取得
            this.getKeyByEvent = function (yyyymmdd, eventName) {
                if (eventName === void 0) { eventName = ""; }
                var yyyymm = yyyymmdd.substring(0, 6);
                // eventHintになければ，locationHintに関連付ける
                var hint;
                if (eventName.length !== 0) {
                    hint = saisei.model.requestEventHints(eventName);
                }
                else {
                    hint = "";
                }
                if (hint.length === 0) {
                    hint = saisei.model.requestLocationHints(eventName);
                }
                var result = yyyymm + hint;
                return result;
            };
            // style="background-image:url('images/shell-img001.jpg')" => "images/shell-img001.jpg"
            this.getPathFromStyleUri = function (styleText) {
                var result = "";
                var startIndex = styleText.indexOf("url(") + "url(".length;
                var endIndex = styleText.indexOf(")");
                result = styleText.substring(startIndex, endIndex);
                return result;
            };
            // 雑な実装だが，[0]に"undefined"と入っているものを振るい落とす
            this.validateImgList = function (list) {
                var result = false;
                if (list.length > 1) {
                    result = true;
                }
                else {
                    var head = list[0];
                    if (head.indexOf("jpg") !== -1) {
                        result = true;
                    }
                }
                return result;
            };
        }
        return Utils;
    }());
    saisei.utils = new Utils();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.utils.js.map