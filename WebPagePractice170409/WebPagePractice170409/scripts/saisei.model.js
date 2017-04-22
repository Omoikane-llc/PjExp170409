var saisei;
(function (saisei) {
    var Model = (function () {
        function Model() {
            // ModelはDataへのfacadeとする
            // 機能モジュールからのリクエストに対して必要な型のレスポンスを返す．
            this.requestImgData = function (key) {
                var list = saisei.imgData.select(key);
                alert(list[0]);
            };
        }
        return Model;
    }());
    saisei.model = new Model();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.model.js.map