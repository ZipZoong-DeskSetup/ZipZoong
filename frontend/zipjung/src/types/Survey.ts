interface ISurvey {
  totalPrice: number;
  surveyDetail: 'SIMPLE' | 'DETAIL';
  monitorPrice: 0;
  keyboardPrice: 0;
  mousePrice: 0;
  monitorUsage: 1 | 2 | 4 | 8 | 16;
  keyboardUsage: 1 | 2 | 4 | 8 | 16;
  mouseUsage: 1 | 2 | 4 | 8 | 16;
  keyboardColor: 'BLACK' | 'WHITE' | 'COLOR' | 'NONE';
  mouseColor: 'BLACK' | 'WHITE' | 'COLOR' | 'NONE';
  monitorCount: 1;
  keyboardLayout: 0 | 1 | 2 | 3 | 4;
  keyboardConnection: 'WIRE' | 'WIRELESS' | 'BOTH';
  mouseConnection: 'WIRE' | 'WIRELESS' | 'BOTH';
  keyboardHealth: boolean;
  mouseHealth: boolean;
  monitorSize: (1 | 2 | 4 | 8 | 16)[];
  monitorRatio: (1 | 2 | 4 | 8)[];
  monitorPanel: 'FLAT' | 'CURVED';
  keyboardType: 'MEMBRANE' | 'PANTOGRAPH' | 'MECHANICAL';
  keyboardSound: 'RED' | 'BLACK' | 'BROWN' | 'BLUE';
  mouseSound: boolean;
}

interface ISimpleSurvey {
  surveyDetail: 'SIMPLE';
  monitorPrice: 0;
  keyboardPrice: 0;
  mousePrice: 0;
  monitorCount: 1;
  monitorSize: [4];
  monitorRatio: [1];
  monitorPanel: 'FLAT';
  keyboardType: 'MECHANICAL';
  keyboardSound: 'RED';
  mouseSound: true;
}

export type {ISurvey, ISimpleSurvey};
