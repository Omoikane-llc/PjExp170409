var saisei;
(function (saisei) {
    var Shell = (function () {
        function Shell() {
            var _this = this;
            this.test2 = "test2";
            this.htmlStructure = $('<div class="saisei-shell-head">'
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
            this.initModule = function (mainId) {
                _this.htmlStructure.insertAfter(mainId);
            };
        }
        return Shell;
    }());
    saisei.shell = new Shell();
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.shell.js.map