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
  productType: 'MONITOR' | 'KEYBOARD' | 'MOUSE';
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
  productType: 'MONITOR' | 'KEYBOARD' | 'MOUSE';
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
  productType: 'MONITOR' | 'KEYBOARD' | 'MOUSE';
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

export type {MyPageUserInfo, NicknameCheck, MyPageCombination, MyPageCombiList};
