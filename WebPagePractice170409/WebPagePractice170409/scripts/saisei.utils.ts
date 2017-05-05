namespace saisei {
    class Utils {
        // {xxx,yyy} => [xxx,yyy]
        parseTuple = (record: string) => {
            var temp = record.trim().split("{").join("").split("}").join(",");
            var result: string[] = temp.split(",");
            //alert(result.toString());
            return result;
        }

        // EventNameからimgファイル検索のためのキーを取得
        getKeyByEvent = (yyyymmdd: string, eventName = "") => {
            var yyyymm: string = yyyymmdd.substring(0, 6);

            // eventHintになければ，locationHintに関連付ける
            var hint: string;
            if (eventName.length !== 0) {
                hint = saisei.model.requestEventHints(eventName);
            } else {
                hint = "";
            }

            if (hint.length === 0) {
                hint = saisei.model.requestLocationHints(eventName);
            }

            var result = yyyymm + hint;
            return result;
        }

        // style="background-image:url('images/shell-img001.jpg')" => "images/shell-img001.jpg"
        getPathFromStyleUri = (styleText: string) => {
            var result: string = "";
            var startIndex = styleText.indexOf("url(") + "url(".length;
            var endIndex = styleText.indexOf(")");
            result = styleText.substring(startIndex, endIndex);
            return result;
        }
    }

    export var utils = new Utils();
}