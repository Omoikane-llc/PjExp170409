namespace saisei {

    class Shell implements SaiseiElement {
        test2 = "test2";
        htmlStructure = $('<div class="saisei-shell-head">'
            + '<div class="saisei-shell-head-logo">'
            + '<h1>ようこそ灑清教室へ</h1>'
            + '</div>'
            + '<div class="saisei-shell-head-nav"></div>'
            + '</div>'
            + '<div class="saisei-shell-main">'
            + '<div class="saisei-shell-main-nav"></div>'
            + '<div class="saisei-shell-main-content"></div>'
            + '</div>'
            + '<div class="saisei-shell-foot"></div>'
            + '<div class="saisei-shell-modal"></div>');

        initModule = (mainId:string) => {
            this.htmlStructure.insertAfter(mainId);
        };
    }

    export var shell = new Shell();
}