namespace saisei {
    // Dataは各オブジェクトの性質に応じてCRUDを実装する
    // Dataに直接アクセスするのはModelのみ
    class ImgData implements SaiseiData {
        // 暫定版 最終的にリストは外部ファイル化
        private prefixPath: string = "../images/";
        private imgPathList: string[] = saisei.imgPathList;

        select = (key: string) => {
            var result:string[] = new Array<string>();
            for (var i = 0; i < this.imgPathList.length; i++) {
                var fileName = this.imgPathList[i];
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
        length = () => {
            return this.imgPathList.length;
        };
    }

    class NewsData implements SaiseiData {
        private nwesList: SaiseiNews[];

        select = () => { };
        push = () => { };
        delete = () => { }; // たぶん不要
        length = () => { };
    }

    export var imgData = new ImgData();
}