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

            var tempName = imgName.substring(imgName.indexOf("_"));
            //alert(tempName);
            var nameList: SaiseiPhotoName[] = saisei.imgRuleData.select(tempName);

            // 複数候補がある場合 request:_xxxx.jpg に対してanswer1:_xxxx > answer2:_xxxxyyyとする
            if (nameList.length > 1) {
                nameList.sort((n1: SaiseiPhotoName, n2: SaiseiPhotoName) => {
                    var comp = 0;
                    var stdLength = tempName.replace(".jpg", "").length;
                    var diff1 = Math.abs(stdLength - n1.shortName.length);
                    var diff2 = Math.abs(stdLength - n2.shortName.length);

                    if (diff1 > diff2) {
                        comp = 1;
                    } else if (diff1 < diff2) {
                        comp = -1;
                    }
                    return comp;
                });
            }
            result = nameList[0].creatorHint;

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

        requestEventHints = (eventName: string) => {
            var result = "";
            var temp: saisei.SaiseiPhotoName[] = new Array<SaiseiPhotoName>();

            var allHints: saisei.SaiseiPhotoName[] = saisei.imgRuleData.selectAll();
            for (var i = 0; i < allHints.length; i++) {
                if (allHints[i].eventHint.length > 0 && eventName.indexOf(allHints[i].eventHint) !== -1) {
                    temp.push(allHints[i]);
                }
            }

            // 該当なしは""，複数候補の場合は最も長いものを返す
            if (temp.length !== 0) {
                temp.sort((n1: SaiseiPhotoName, n2: SaiseiPhotoName) => {
                    var comp = 0;
                    if (n1.eventHint.length > n2.eventHint.length) {
                        comp = -1;
                    } else if (n1.eventHint.length < n2.eventHint.length) {
                        comp = 1;
                    }

                    return comp;
                });
                result = temp[0].shortName;
            }

            return result;
        }

        requestLocationHints = (locationName: string) => {
            var result = "";
            var temp: saisei.SaiseiPhotoName[] = new Array<SaiseiPhotoName>();

            var allHints: saisei.SaiseiPhotoName[] = saisei.imgRuleData.selectAll();
            for (var i = 0; i < allHints.length; i++) {
                if (allHints[i].locationHint.length > 0 && locationName.indexOf(allHints[i].locationHint) !== -1) {
                    temp.push(allHints[i]);
                }
            }

            // 該当なしは""，複数候補の場合は最も長いものを返す
            if (temp.length !== 0) {
                temp.sort((n1: SaiseiPhotoName, n2: SaiseiPhotoName) => {
                    var comp = 0;
                    if (n1.locationHint.length > n2.locationHint.length) {
                        comp = -1;
                    } else if (n1.locationHint.length < n2.locationHint.length) {
                        comp = 1;
                    }

                    return comp;
                });
                result = temp[0].shortName;
            }

            return result;
        }
    }

    export var model = new Model();
}