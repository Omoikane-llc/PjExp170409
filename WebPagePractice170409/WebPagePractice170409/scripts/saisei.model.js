var saisei;
(function (saisei) {
    var Model = (function () {
        function Model() {
            // ModelはDataへのfacadeとする
            // 機能モジュールからのリクエストに対して必要な型のレスポンスを返す．
            this.requestImgData = function (key) {
                var list = saisei.imgData.select(key);
                //var showStr: string = "";
                //for (var i = 0; i < list.length; i++) {
                //    showStr = showStr + list[i] + "\r\n";
                //}
                //alert(showStr);
                return list;
            };
        }
        return Model;
    }());
    saisei.model = new Model();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.model.js.map