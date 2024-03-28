// import {MonitorDetail} from './Recommendation';
// TODO: 나중에 Monitor, Keyboard, Mouse Detail값 가져오기

interface MyPageUserInfo {
  message: string;
  data: {
    userId: number;
    userNickname: string;
    userEmail: string;
    userImg: string;
    userCreatedAt: string;
    userUpdatedAt: string;
  };
}

interface NicknameCheck {
  message: string;
  data: {
    isAvailable: boolean;
  };
}

// FIXME: 추천 결과값에 따라 detail 정보 바꿔주기, null값 추가해야 할 수도
interface MonitorDetail {
  productId: number;
  productName: string;
  productType: 'MONITOR';
  details: {
    brand: string;
    size: number;
    resolution: string;
    aspectRatio: string;
    refreshRate: string;
    panelType: string;
  };
}
interface KeyboardDetail {
  productId: number;
  productName: string;
  productType: 'KEYBOARD';
  details: {
    brand: string;
    switch: string;
    led: string;
    layout: string;
    color: string;
    connect: string;
  };
}
interface MouseDetail {
  productId: number;
  productName: string;
  productType: 'MOUSE';
  details: {
    brand: string;
    connect: string;
    type: string;
    price: number;
    noiseLevel: string;
    color: string;
    osCompatibility: string;
    weight: number;
    dimensions: {
      widht: number;
      length: number;
      height: number;
    };
  };
}

interface Combination {
  combination: {
    monitor: MonitorDetail[];
    keyboard: KeyboardDetail;
    mouse: MouseDetail;
  };
}

interface MyPageCombination {
  data: Combination;
}

interface MyPageCombiList {
  data: {
    combination: {
      combinationId: string;
      monitor: MonitorDetail[];
      keyboard: KeyboardDetail;
      mouse: MouseDetail;
    }[];
  };
}

// FIXME: 데이터 구조보고 타입 수정 필요
interface CombiMonitorDetail {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: string;
  url: string;
  category: 'MONITOR';
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
}

interface CombiMouseDetail {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: string;
  url: string;
  category: 'MOUSE';
  connect: string;
  connectInterface: string;
  mouseType: string;
  dpi: number;
  color: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

interface CombiKeyboardDetail {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: string;
  url: string;
  category: 'KEYBOARD';
  connect: string;
  connectInterface: string | null;
  keySwitch: string;
  led: string | null;
  num: number;
  force: number;
  color: string;
  form: string;
  contact: string;
}

export type {
  MyPageUserInfo,
  NicknameCheck,
  MyPageCombination,
  MyPageCombiList,
  MonitorDetail,
  MouseDetail,
  KeyboardDetail,
  CombiKeyboardDetail,
  CombiMouseDetail,
  CombiMonitorDetail,
};
