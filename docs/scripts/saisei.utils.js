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
            // 雑な実装だが，"undefined"と入っているものを振るい落とす
            this.validateImgList = function (list) {
                var result = new Array();
                for (var i = 0; i < list.length; i++) {
                    if (list[i].indexOf("jpg") !== -1) {
                        result.push(list[i]);
                    }
                }
                return result;
            };
            // imgSrcと対になるimgInfoを抽出する
            this.getImgInfoFromImgSrc = function (imgSrc, stateMap) {
                var srcList = stateMap.imgList;
                var infoList = stateMap.imgInfoList;
                for (var i = 0; i < srcList.length; i++) {
                    //console.log(imgSrc.indexOf(srcList[i]) + " srcList[i] " + srcList[i] + " infoList[i] " + infoList[i]);
                    if (imgSrc.indexOf(srcList[i]) > 0) {
                        return infoList[i];
                    }
                }
                return "no imgInfo";
            };
        }
        return Utils;
    }());
    saisei.utils = new Utils();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.utils.js.map