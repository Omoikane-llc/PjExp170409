namespace saisei {
    export interface SaiseiElement {
        htmlStructure: string;
        initModule: Function;
    }

    export interface SaiseiData {
        select: Function;
        push: Function;
        delete: Function;
        length: Function;
    }
}