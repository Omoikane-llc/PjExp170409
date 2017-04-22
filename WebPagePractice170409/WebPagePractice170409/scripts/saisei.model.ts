namespace saisei {
    class Model {
        // ModelはDataへのfacadeとする
        // 機能モジュールからのリクエストに対して必要な型のレスポンスを返す．
        requestImgData = (key: string) => {
            var list:string[] = saisei.imgData.select(key);
            alert(list[0]);
        }
    }

    export var model = new Model();
}