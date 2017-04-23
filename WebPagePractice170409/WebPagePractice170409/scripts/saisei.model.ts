namespace saisei {
    class Model {
        // ModelはDataへのfacadeとする
        // 機能モジュールからのリクエストに対して必要な型のレスポンスを返す．
        requestImgData = (key: string) => {
            var list: string[] = saisei.imgData.select(key);
            //var showStr: string = "";
            //for (var i = 0; i < list.length; i++) {
            //    showStr = showStr + list[i] + "\r\n";
            //}
            //alert(showStr);
            return list;
        }

        requestNewsData = (key: string) => {
            var resultList: SaiseiNews[] = saisei.newsData.select(key);
            return resultList;
        }
    }

    export var model = new Model();
}