namespace saisei {
    class Model {
        // ModelはDataへのfacadeとする
        // 機能モジュールからのリクエストに対して必要な型のレスポンスを返す．
        requestImgData = (key: string) => {
            var list: string[] = saisei.imgData.select(key);
            return list;
        }

        requestCreatorName = (imgName: string) => {
            var result: string = "";

            var tempName = imgName.substr(imgName.indexOf("_"));
            //alert(tempName);
            var nameList: string[] = saisei.imgRuleData.select(tempName);

            // todo extract longest match item
            result = nameList[0];

            return result;
        }

        requestNewsData = (key: string) => {
            var resultList: SaiseiNews[] = saisei.newsData.select(key);
            return resultList;
        }
    }

    export var model = new Model();
}