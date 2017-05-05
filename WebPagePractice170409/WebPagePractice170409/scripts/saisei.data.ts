namespace saisei {
    // Dataは各オブジェクトの性質に応じてCRUDを実装する
    // Dataに直接アクセスするのはModelのみ
    class ImgData implements SaiseiData {

        //private prefixPath: string = saisei.prefixPath;
        private imgPathList: string[];

        constructor() {
            var temp = saisei.imgPathList;
            temp.sort((str1: string, str2: string) => {
                var comp = 0;
                var n1 = Number(str1.substring(0, 6));
                var n2 = Number(str2.substring(0, 6));
                var p1 = str1.indexOf(saisei.imgOrderKey);
                var p2 = str2.indexOf(saisei.imgOrderKey);

                if (n1 > n2) {
                    comp = -1;
                } else if (n1 < n2) {
                    comp = 1;
                } else {
                    if (p1 > p2) {
                        comp = -1;
                    } else if (p1 < p2) {
                        comp = 1;
                    }
                }
                return comp;
            });
            this.imgPathList = temp;
        }

        select = (key: string) => {
            var result:string[] = new Array<string>();
            for (var i = 0; i < this.imgPathList.length; i++) {
                var fileName = this.imgPathList[i];
                //alert(fileName + " " + key);
                if (fileName.length > 0 && fileName.indexOf(key) !== -1) {
                    result.push(fileName);
                }
            }
            return result;
        };
        push = (fileName: string) => {
            this.imgPathList.push(fileName);
        };
        delete = () => { }; // たぶん不要
        length = (): number => {
            return this.imgPathList.length;
        };
    }

    class NewsData implements SaiseiData {
        private newsList: SaiseiNews[] = saisei.eventListData;

        select = (key: string, prop = "property") => {
            var result: SaiseiNews[] = new Array<SaiseiNews>();

            // keyが年月，イベント名，開催場所のいずれかにヒットすれば返却する実装
            for (var i = 0; i < this.newsList.length; i++) {
                var record = this.newsList[i];
                var conVal = this.concatValues(record);

                if (conVal.length > 0 && conVal.indexOf(key) !== -1) {
                    result.push(record);
                }
            }
            this.sortDesc(result);
            return result;
        };
        push = (record: SaiseiNews) => {
            this.newsList.push(record);
        };
        delete = () => { }; // たぶん不要
        length = (): number => {
            return this.newsList.length;
        };

        // 全イベントリスト
        selectAll = () => {
            var result: SaiseiNews[] = new Array<SaiseiNews>();
            result = this.newsList;
            this.sortDesc(result);
            return result;
        }

        // 型情報を保持したままプロパティリストを得る良い方法がなかった
        private concatValues = (record: SaiseiNews) => {
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
        }

        private sortDesc = (list: SaiseiNews[]):void => {

            list.sort((n1: SaiseiNews, n2: SaiseiNews) => {
                var comp = 0;
                if (n1.yyyymmdd > n2.yyyymmdd) {
                    comp = -1;
                } else if (n1.yyyymmdd < n2.yyyymmdd) {
                    comp = 1;
                }
                return comp;
            });
        }
    }

    class ImgRuleData implements SaiseiData {
        private ruleList: SaiseiPhotoName[] = saisei.rulePhotoName;
        select = (imgName: string, prop = "creator") => {
            var result: string[] = new Array<string>();
            for (var i = 0; i < this.ruleList.length; i++) {
                var hint = "";

                if (prop === "event") {
                    hint = this.ruleList[i].eventHint;
                } else if (prop === "location") {
                    hint = this.ruleList[i].locationHint;
                } else {
                    hint = this.ruleList[i].creatorHint;
                }

                if (imgName.length > 0 && imgName.indexOf(this.ruleList[i].shortName) !== -1) {
                    result.push(hint);
                }
            }
            return result;
        }
        push = (record: SaiseiPhotoName) => {
            this.ruleList.push(record);
        }
        delete = () => { }; // たぶん不要
        length = (): number => {
            return this.ruleList.length;
        }

        // 全データ取得
        selectAll = () => {
            var result: SaiseiPhotoName[] = new Array<SaiseiPhotoName>();
            for (var i = 0; i < this.ruleList.length; i++) {
                result.push(this.ruleList[i]);
            }
            return result;
        }

    }

    class LocationData implements SaiseiLocation {
        location: string;
        eventList: SaiseiNews[];

        getObject = () => {
            var result = new LocationData();
            result.location = "";
            result.eventList = new Array<SaiseiNews>();
            return result;
        }
    }

    export var imgData = new ImgData();
    export var newsData = new NewsData();
    export var imgRuleData = new ImgRuleData();
    export var locationData = new LocationData();
}