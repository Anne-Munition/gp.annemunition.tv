interface Item {
  name: string;
  image: string;
  url: string;
  posX?: number;
  posY?: number;
  height?: number;
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
  other: Item[]
}
