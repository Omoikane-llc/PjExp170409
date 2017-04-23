var saisei;
(function (saisei) {
    // Dataは各オブジェクトの性質に応じてCRUDを実装する
    // Dataに直接アクセスするのはModelのみ
    var ImgData = (function () {
        function ImgData() {
            var _this = this;
            this.prefixPath = saisei.prefixPath;
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
            var _this = this;
            this.newsList = saisei.newsList;
            this.select = function (key, prop) {
                if (prop === void 0) { prop = "property"; }
                var result = new Array();
                //var propList: string[] = Object.getOwnPropertyNames(this.newsList[0]);
                //console.log("propList[0] " + propList[0]);
                // keyが年月，イベント名，開催場所のいずれかにヒットすれば返却する実装
                for (var i = 0; i < _this.newsList.length; i++) {
                    var record = _this.newsList[i];
                    var conVal = _this.concatValues(record);
                    if (conVal.length > 0 && conVal.indexOf(key) !== -1) {
                        result.push(record);
                    }
                }
                return result;
            };
            this.push = function (record) {
                _this.newsList.push(record);
            };
            this.delete = function () { }; // たぶん不要
            this.length = function () {
                return _this.newsList.length;
            };
            // 型情報を保持したままプロパティリストを得る良い方法がなかった
            this.concatValues = function (record) {
                var result = "";
                if (record.yyyymmdd != null) {
                    result = result + record.yyyymmdd + " ";
                }
                if (record.eventName != null) {
                    result = result + record.eventName + " ";
                }
                if (record.location != null) {
                    result = result + record.location + " ";
                }
                return result;
            };
        }
        return NewsData;
    }());
    saisei.imgData = new ImgData();
    saisei.newsData = new NewsData();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.data.js.map