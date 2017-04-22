namespace saisei {
    // Dataは各オブジェクトの性質に応じてCRUDを実装する
    // Dataに直接アクセスするのはModelのみ
    class ImgData implements SaiseiData {
        // 暫定版 最終的にリストは外部ファイル化
        private prefixPath: string = "../images/";
        private imgPathList: string[] = [
            "201011sogetsuten_takamaru.jpg",
            "201011sogetsuten_hagiya.jpg",
            "201011sogetsuten_kouji.jpg",
            "201011sogetsuten_omori.jpg",
            "201411hitachi_hagiya.jpg",
            "201411hitachi_namekawa.jpg",
            "201411hitachi_omori.jpg",
            "201411hitachi_kikuchi.jpg",
            "201411hitachi_suzuki.jpg",
            "201411kenten_gassaku.jpg",
            "201411kenten_gassaku.jpg",
            "201411kenten_gassaku.jpg",
            "201411sogetsuten_hagiya.jpg",
            "201411sogetsuten_hagiya.jpg",
            "201411sogetsuten_omori.jpg",
            "201411sogetsuten_omori.jpg"
        ];

        select = (key: string) => {
            var result:string[] = new Array<string>();
            for (var i = 0; i < this.imgPathList.length; i++) {
                var fileName = this.imgPathList[i];
                if (fileName.match(key)) {
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

    export var imgData = new ImgData();
}