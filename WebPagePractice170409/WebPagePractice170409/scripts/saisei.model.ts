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
            var resultList: SaiseiNews[];
            var tempNews: SaiseiNews[] = saisei.newsData.selectAll();
            resultList = tempNews.slice(1, tempNews.length);
            return resultList;
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

        requestAllLocations = () => {
            var resultList: SaiseiLocation[] = new Array<SaiseiLocation>();
            // selectAllの先頭要素はダミー
            var tempNews: SaiseiNews[] = saisei.newsData.selectAll();
            var allNews: SaiseiNews[] = tempNews.slice(1, tempNews.length);
            this.sortLocation(allNews);

            for (var i = 0; i < allNews.length; i++) { 
                var tempLocation = allNews[i].location;

                if (i === 0 || allNews[i - 1].location !== allNews[i].location) {
                    var tempRec: SaiseiLocation = saisei.locationData.getObject();
                    tempRec.location = tempLocation;
                    tempRec.eventList.push(allNews[i]);
                    resultList.push(tempRec);
                } else {
                    resultList[resultList.length - 1].eventList.push(allNews[i]);
                }
            }
            return resultList;
        }

        private sortLocation = (list: SaiseiNews[]): void => {
            var compStr = "";
            for (var i = 0; i < list.length; i++) {
                compStr = compStr + list[i].location;
            }
            list.sort((n1: SaiseiNews, n2: SaiseiNews) => {
                var comp = 0;
                if (n1.location.length > n2.location.length) {
                    comp = -1;
                } else if (n1.location.length < n2.location.length) {
                    comp = 1;
                } else {
                    if (n1.location.length === 0) {
                        comp = 0;
                    } else {
                        // 全要素を連結した文字列を基準
                        for (var i = 0; i < n1.location.length; i++) {
                            var p1 = compStr.indexOf(n1.location.substring(i, i + 1));
                            var p2 = compStr.indexOf(n2.location.substring(i, i + 1));
                            if (p1 > p2) {
                                comp = 1;
                                break;
                            } else if (p1 < p2) {
                                comp = -1;
                                break;
                            }
                        }
                    }
                }
                return comp;
            });
        }
    }

    export var model = new Model();
}