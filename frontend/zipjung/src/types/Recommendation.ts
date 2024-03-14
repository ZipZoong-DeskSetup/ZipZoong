interface MonitorDetail {
    id: number;
    model: string;
    detail: string;
    img: string;
    price: number;
}

interface KeyboardDetail {
    id: number;
    model: string;
    detail: string;
    img: string;
    price: number;
}

interface MouseDetail {
    id: number;
    model: string;
    detail: string;
    img: string;
    price: number;
}

interface Hardware {
    id: number;
    monitor: MonitorDetail[];
    keyboard: KeyboardDetail;
    mouse: MouseDetail;
}

interface Recommendations {
    combination: Hardware[];
}

export type { Recommendations, Hardware, MonitorDetail, KeyboardDetail, MouseDetail }