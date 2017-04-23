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

    export interface SaiseiNews {
        yyyymmdd: number;
        yyyyNen: string;
        mmddaaStart: string;
        mmddaaEnd: string;
        eventName: string;
        location: string;
        titleName: string;
    }
}