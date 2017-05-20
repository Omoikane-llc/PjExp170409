namespace dataViewer {

    class Shell {
        initModule = ():void => {

            // select file
            $("#dataView-select-dir").bind("change", (event: JQueryEventObject) => {
                //alert("onchange");
                var selectedFile = $("#dataView-select-dir").prop("files")[0];
                var fileName:string = selectedFile.name;
                if (fileName.indexOf("jpg") !== -1) {
                    var fileRdr = new FileReader();
                    fileRdr.readAsDataURL(selectedFile);
                    fileRdr.onload = function () {
                        $("#dataView-photo").attr("src", fileRdr.result);
                    };
                } else {
                    alert("jpgファイルを選択してください");
                }
                
            });

            // text input
            $("#dataViewer-input").bind("change", (event: JQueryEventObject) => {
                var eventListText = this.getEventListText();
                var imgPathText = this.getImgPathText();
                var rulePhotoNameText = this.getRulePhotoNameText();
                //alert("input text " + eventListText);
                $("#dataView-textArea").val("").val(eventListText + "\r\n" + imgPathText + "\r\n" + rulePhotoNameText);
            });

            // select change
            $("#dataView-input-select01").bind("change", (event: JQueryEventObject) => {
                var selectVal:string = $("#dataView-input-select01").val();
                var hints = selectVal.split(" ");
                $("#dataView-input-text03").val("").val(hints[0] + " " + hints[1]);
            });
            $("#dataView-input-select02").bind("change", (event: JQueryEventObject) => {
                var shortName = $("#dataView-input-select02").val();
                var creatorHint = $('#dataView-input-select02 option:selected').text();
                $("#dataView-input-text05").val("").val(shortName + " " + creatorHint);
            });
        }

        private getEventListText = () => {
            var inputText01 = $("#dataView-input-text01").val();
            var inputText02a = $("#dataView-input-text02a").val();
            var inputText02b = $("#dataView-input-text02b").val();
            var inputText02c = $("#dataView-input-text02c").val();
            var inputText03:string = $("#dataView-input-text03").val();
            var inputText04 = $("#dataView-input-text04").val();

            var curlBra = "{";
            var curlKet = "},";
            var yyyymmdd = 'yyyymmdd:"' + inputText02a + inputText02b + '",';
            var yyyyNen = 'yyyyNen:"' + inputText02a + '年",';
            var mmddaaStart = 'mmddaaStart:"' + this.transMMDD(inputText02b) + '",';
            var mmddaaEnd = 'mmddaaEnd:"' + this.transMMDD(inputText02c) + '",';
            var eventName = 'eventName:"' + inputText01 + '",';
            var location = 'location:"' + inputText03.split(" ")[1] + '",';
            var titleName = 'titleName:"' + inputText04 + '"';

            // { yyyymmdd: 20170223, yyyyNen: "2017年", mmddaaStart: "2月23日（木）", mmddaaEnd: "2月28日（火）", eventName: "草月創流90周年記念", location: "水戸京成百貨店", titleName: "茨城県支部草月いけばな展" }
            return curlBra + yyyymmdd + yyyyNen + mmddaaStart + mmddaaEnd + eventName + location + titleName + curlKet;
        }

        private getImgPathText = () => {
            var inputText02a = $("#dataView-input-text02a").val();
            var inputText02b = $("#dataView-input-text02b").val();
            var inputText05: string = $("#dataView-input-text05").val();
            var inputText06: string = $("#dataView-input-text06").val();
            var imgParam: string[] = inputText05.split(" ");

            var curlBra = "{";
            var curlKet = "},";
            var imgPath = 'imgpath:"' + inputText02a + inputText02b +"event名" +imgParam[0] + '連番",';
            var imgInfo = 'imginfo:"' + inputText06 + '",';

            return curlBra + imgPath + imgInfo + curlKet;
        }
        private getRulePhotoNameText = () => {
            var inputText01 = $("#dataView-input-text01").val();
            var inputText03:string = $("#dataView-input-text03").val();
            var inputText05: string = $("#dataView-input-text05").val();
            var imgParam: string[] = inputText05.split(" ");

            var curlBra = "{";
            var curlKet = "},";
            var shortName1 = 'shortName:"' + imgParam[0] + '",';
            var eventHint1 = 'eventHint:"' + '",';
            var locationHint1 = 'locationHint:"' + '",';
            var creatorHint1 = 'creatorHint:"' + imgParam[1] + '",';
            var shortName2 = 'shortName:"' + "event名" + '",';
            var eventHint2 = 'eventHint:"' + inputText01 + '",';
            var locationHint2 = 'locationHint:"' + '",';
            var creatorHint2 = 'creatorHint:"' + '",';
            var shortName3 = 'shortName:"' + inputText03.split(" ")[0] + '",';
            var eventHint3 = 'eventHint:"' + '",';
            var locationHint3 = 'locationHint:"' + inputText03.split(" ")[1] + '",';
            var creatorHint3 = 'creatorHint:"'  + '",';

            var record1 = curlBra + shortName1 + eventHint1 + locationHint1 + creatorHint1 + curlKet;
            var record2 = curlBra + shortName2 + eventHint2 + locationHint2 + creatorHint2 + curlKet;
            var record3 = curlBra + shortName3 + eventHint3 + locationHint3 + creatorHint3 + curlKet;

            return record1 + "\r\n" + record2 + "\r\n" + record3
        }

        private transMMDD = (mmdd: string) => {
            var result = "";
            if (mmdd.length !== 4) {
                alert("月日はmmddの形式で入力して下さい");
            } else {
                
                if (mmdd.indexOf("0") === 0) {
                    result = mmdd.substring(1, 2) + "月" + mmdd.substring(2, mmdd.length) + "日";
                } else {
                    result = mmdd.substring(0, 2) + "月" + mmdd.substring(2, mmdd.length) + "日";
                }
            }
            return result;
        }

    }
    export var shell = new Shell();
    
}