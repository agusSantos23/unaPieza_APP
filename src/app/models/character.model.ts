import { DevilFruit } from "./devil-fruit.model";

export interface Character {
  id: number;
  name: string;
  gender: string;
  band: string;
  level: string;
  ateDevilFruit: number;
  created_at: string;
  updated_at: string;
  devil_fruits: DevilFruit[] | string ; 
}