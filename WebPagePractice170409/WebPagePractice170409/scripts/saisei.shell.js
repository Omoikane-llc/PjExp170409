var saisei;
(function (saisei) {
    var shell;
    (function (shell) {
        var ShellElement = (function () {
            function ShellElement() {
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
            }
            return ShellElement;
        }());
    })(shell = saisei.shell || (saisei.shell = {}));
})(saisei || (saisei = {}));
//# sourceMappingURL=saisei.shell.js.map