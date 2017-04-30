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

        requestAllEvents = () => {
            return saisei.newsData.selectAll();
        }

        requestAllCreators = () => {
            var resultList: SaiseiPhotoName[] = new Array<SaiseiPhotoName>();

            var tempList: SaiseiPhotoName[] = saisei.imgRuleData.selectAll();
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i].creatorHint.length > 0) {
                    resultList.push(tempList[i]);
                }
            }

            return resultList;
        }
    }

    export var model = new Model();
}