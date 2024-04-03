interface MonitorDetail {
  id: number;
  name: string;
  brand: string;
  img: string;
  price: string;
  url: string;
  category: string;
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
}

interface KeyboardDetail {
  id: number;
  name: string;
  brand: string;
  img: string;
  price: string;
  url: string;
  category: string;
  connect: string;
  connectInterface?: string | null;
  keySwitch: string;
  led: string;
  num: number;
  force?: string | null;
  color: string;
  form: string;
  contact: string;
}

interface MouseDetail {
  id: number;
  name: string;
  brand: string;
  img: string;
  price: string;
  url: string;
  category: string;
  connect: string;
  connectInterface?: string | null;
  mouseType: string;
  dpi?: string | null;
  color: string;
  weight?: string | null;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

interface Hardware {
  combinationId: number;
  monitors: MonitorDetail[];
  keyboard: KeyboardDetail;
  mouse: MouseDetail;
  totalPrice: string;
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
