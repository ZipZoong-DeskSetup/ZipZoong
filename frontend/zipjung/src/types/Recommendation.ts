interface MonitorDetail {
  id: number;
  model: string;
  detail: string;
  img: string;
  price: number;
  link: string;
}

interface KeyboardDetail {
  id: number;
  model: string;
  detail: string;
  img: string;
  price: number;
  link: string;
}

interface MouseDetail {
  id: number;
  model: string;
  detail: string;
  img: string;
  price: number;
  link: string;
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

export type {
  Recommendations,
  Hardware,
  MonitorDetail,
  KeyboardDetail,
  MouseDetail,
};
