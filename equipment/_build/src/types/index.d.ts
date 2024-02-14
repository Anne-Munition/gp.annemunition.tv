interface Item {
  name: string;
  image: string;
  url: string;
  asin: string;
  top: number;
  left: number;
  icon: string;
}

interface PC {
  case: Item;
  cpu: Item;
  cooler: Item;
  motherboard: Item;
  memory: Item;
  storage: Item[];
  gpu: Item;
  psu: Item;
  other: Item[];
}

interface Line {
  points: Point[];
}

interface Point {
  x: number;
  y: number;
}
