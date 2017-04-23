var saisei;
(function (saisei) {
    // Dataは各オブジェクトの性質に応じてCRUDを実装する
    // Dataに直接アクセスするのはModelのみ
    var ImgData = (function () {
        function ImgData() {
            var _this = this;
            // 暫定版 最終的にリストは外部ファイル化
            this.prefixPath = "../images/";
            this.imgPathList = saisei.imgPathList;
            this.select = function (key) {
                var result = new Array();
                for (var i = 0; i < _this.imgPathList.length; i++) {
                    var fileName = _this.imgPathList[i];
                    if (fileName.length > 0 && fileName.indexOf(key) !== -1) {
                        result.push(fileName);
                    }
                }
                return result;
            };
            this.push = function (fileName) {
                _this.imgPathList.push(fileName);
            };
            this.delete = function () { }; // たぶん不要
            this.length = function () {
                return _this.imgPathList.length;
            };
        }
        return ImgData;
    }());
    var NewsData = (function () {
        function NewsData() {
            this.select = function () { };
            this.push = function () { };
            this.delete = function () { }; // たぶん不要
            this.length = function () { };
        }
        return NewsData;
    }());
    saisei.imgData = new ImgData();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.data.js.map