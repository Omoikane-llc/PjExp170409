var saisei;
(function (saisei) {
    // Dataは各オブジェクトの性質に応じてCRUDを実装する
    // Dataに直接アクセスするのはModelのみ
    var ImgData = (function () {
        function ImgData() {
            var _this = this;
            // 暫定版 最終的にリストは外部ファイル化
            this.prefixPath = "../images/";
            this.imgPathList = [
                "201011sogetsuten_takamaru.jpg",
                "201011sogetsuten_hagiya.jpg",
                "201011sogetsuten_kouji.jpg",
                "201011sogetsuten_omori.jpg",
                "201411hitachi_hagiya.jpg",
                "201411hitachi_namekawa.jpg",
                "201411hitachi_omori.jpg",
                "201411hitachi_kikuchi.jpg",
                "201411hitachi_suzuki.jpg",
                "201411kenten_gassaku.jpg",
                "201411kenten_gassaku.jpg",
                "201411kenten_gassaku.jpg",
                "201411sogetsuten_hagiya.jpg",
                "201411sogetsuten_hagiya.jpg",
                "201411sogetsuten_omori.jpg",
                "201411sogetsuten_omori.jpg"
            ];
            this.select = function (key) {
                var result = new Array();
                for (var i = 0; i < _this.imgPathList.length; i++) {
                    var fileName = _this.imgPathList[i];
                    if (fileName.match(key)) {
                        result.push(fileName);
                    }
                }
                return result;
            };
            this.push = function () { };
            this.delete = function () { };
            this.length = function () { };
        }
        return ImgData;
    }());
    saisei.imgData = new ImgData();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.data.js.map