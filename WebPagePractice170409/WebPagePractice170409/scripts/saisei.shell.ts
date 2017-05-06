namespace saisei {

    class Shell implements SaiseiElement {
        private $container: JQuery;
        //should have to remove blank space add by auto formator
        htmlStructure = '<div class="saisei-head">'
            +'<div class="saisei-head-logo">'
            +'ようこそ灑清教室へ'
            +'</div>'
            +'</div>'
            +'<div class="saisei-main">'
            +'<div class="saisei-main-home">Home</div >'
            +'<div class="saisei-main-gallery">Gallery</div>'
            +'<div class="saisei-main-about">About</div>'
            +'<div class="saisei-main-contents"></div>'
            +'</div>'
            + '<div class="saisei-foot"><h6>Copyright© SAISEI SITE All Rights Reserved.</h6></div>';

        requestText: string = "";

        initModule = ($mainId: JQuery) => {

            $mainId.html(this.htmlStructure);
            this.$container = $mainId;

            saisei.home.initModule(this.getContainer());
            saisei.gallery.initModule(this.getContainer());
            saisei.about.initModule(this.getContainer());

            $(".saisei-main-home").trigger("click");
        };

        getContainer = () => {
            return this.$container;
        };

    }

    export var shell = new Shell();
}