var saisei;
(function (saisei) {
    var Model = (function () {
        function Model() {
            var _this = this;
            // ModelはDataへのfacadeとする
            // 機能モジュールからのリクエストに対して必要な型のレスポンスを返す．
            this.requestImgData = function (key) {
                var list = saisei.imgData.select(key);
                return list;
            };
            this.requestCreatorName = function (imgName) {
                var result = "";
                var tempName = imgName.substring(imgName.indexOf("_"));
                //alert(tempName);
                var nameList = saisei.imgRuleData.select(tempName);
                // todo extract longest match item
                result = nameList[0];
                return result;
            };
            this.requestNewsData = function (key) {
                var resultList = saisei.newsData.select(key);
                return resultList;
            };
            this.requestAllEvents = function () {
                var resultList;
                var tempNews = saisei.newsData.selectAll();
                resultList = tempNews.slice(1, tempNews.length);
                return resultList;
            };
            this.requestAllCreators = function () {
                var resultList = new Array();
                var tempList = saisei.imgRuleData.selectAll();
                for (var i = 0; i < tempList.length; i++) {
                    if (tempList[i].creatorHint.length > 0) {
                        resultList.push(tempList[i]);
                    }
                }
                return resultList;
            };
            this.requestAllLocations = function () {
                var resultList = new Array();
                // selectAllの先頭要素はダミー
                var tempNews = saisei.newsData.selectAll();
                var allNews = tempNews.slice(1, tempNews.length);
                _this.sortLocation(allNews);
                for (var i = 0; i < allNews.length; i++) {
                    var tempLocation = allNews[i].location;
                    if (i === 0 || allNews[i - 1].location !== allNews[i].location) {
                        var tempRec = saisei.locationData.getObject();
                        tempRec.location = tempLocation;
                        tempRec.eventList.push(allNews[i]);
                        resultList.push(tempRec);
                    }
                    else {
                        resultList[resultList.length - 1].eventList.push(allNews[i]);
                    }
                }
                return resultList;
            };
            this.sortLocation = function (list) {
                var compStr = "";
                for (var i = 0; i < list.length; i++) {
                    compStr = compStr + list[i].location;
                }
                list.sort(function (n1, n2) {
                    var comp = 0;
                    if (n1.location.length > n2.location.length) {
                        comp = -1;
                    }
                    else if (n1.location.length < n2.location.length) {
                        comp = 1;
                    }
                    else {
                        if (n1.location.length === 0) {
                            comp = 0;
                        }
                        else {
                            // 全要素を連結した文字列を基準
                            for (var i = 0; i < n1.location.length; i++) {
                                var p1 = compStr.indexOf(n1.location.substring(i, i + 1));
                                var p2 = compStr.indexOf(n2.location.substring(i, i + 1));
                                if (p1 > p2) {
                                    comp = 1;
                                    break;
                                }
                                else if (p1 < p2) {
                                    comp = -1;
                                    break;
                                }
                            }
                        }
                    }
                    return comp;
                });
            };
            this.requestEventHints = function (eventName) {
                var result = "";
                var temp = new Array();
                var allHints = saisei.imgRuleData.selectAll();
                for (var i = 0; i < allHints.length; i++) {
                    if (allHints[i].eventHint.length > 0 && eventName.indexOf(allHints[i].eventHint) !== -1) {
                        temp.push(allHints[i]);
                    }
                }
                // 該当なしは""，複数候補の場合は最も長いものを返す
                if (temp.length !== 0) {
                    temp.sort(function (n1, n2) {
                        var comp = 0;
                        if (n1.eventHint.length > n2.eventHint.length) {
                            comp = -1;
                        }
                        else if (n1.eventHint.length < n2.eventHint.length) {
                            comp = 1;
                        }
                        return comp;
                    });
                    result = temp[0].shortName;
                }
                return result;
            };
            this.requestLocationHints = function (locationName) {
                var result = "";
                var temp = new Array();
                var allHints = saisei.imgRuleData.selectAll();
                for (var i = 0; i < allHints.length; i++) {
                    if (allHints[i].locationHint.length > 0 && locationName.indexOf(allHints[i].locationHint) !== -1) {
                        temp.push(allHints[i]);
                    }
                }
                // 該当なしは""，複数候補の場合は最も長いものを返す
                if (temp.length !== 0) {
                    temp.sort(function (n1, n2) {
                        var comp = 0;
                        if (n1.locationHint.length > n2.locationHint.length) {
                            comp = -1;
                        }
                        else if (n1.locationHint.length < n2.locationHint.length) {
                            comp = 1;
                        }
                        return comp;
                    });
                    result = temp[0].shortName;
                }
                return result;
            };
        }
        return Model;
    }());
    saisei.model = new Model();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.model.js.map