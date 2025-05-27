// types.ts
import {Car} from "./types"


export async function getCars(): Promise<Car[]> {
  const response = await fetch('/api/public/cars');
  const data = await response.json();
  return data;
}
