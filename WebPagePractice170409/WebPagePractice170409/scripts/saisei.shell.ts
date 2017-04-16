namespace saisei {

    class Shell implements SaiseiElement {
        private $container: JQuery;
        //should have to remove blank space add by auto formator
        htmlStructure = '<div class="saisei-head">'
            +'<div class="saisei-head-logo">'
            +'<h1>ようこそ灑清教室へ</h1>'
            +'</div>'
            +'</div>'
            +'<div class="saisei-main">'
            +'<div class="saisei-main-home">Home</div >'
            +'<div class="saisei-main-gallery">Gallery</div>'
            +'<div class="saisei-main-about">About</div>'
            +'<div class="saisei-main-contents"></div>'
            +'</div>'
            + '<div class="saisei-foot"><h6>Copyright© SAISEI SITE All Rights Reserved.</h6></div>';

        initModule = ($mainId: JQuery) => {
            //alert(this.htmlStructure);
            $mainId.html(this.htmlStructure);
            this.$container = $mainId;

            saisei.home.initModule(this.getContainer());
            saisei.gallery.initModule(this.getContainer());
        };

        getContainer = () => {
            return this.$container;
        };

    }

    export var shell = new Shell();
}