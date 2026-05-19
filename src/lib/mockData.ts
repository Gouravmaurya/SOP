export type LevelStatus = "locked" | "current" | "completed";

export interface Level {
  id: number;
  title: string;
  description: string;
  type: "quiz";
  status: LevelStatus;
  stars: number;
  points: number;
  position: { x: number; y: number };
}

export const feederPillarQuest: Level[] = [
  { id: 1, title: "Prework Safety", description: "Learn the essential safety protocols before starting any field work.", type: "quiz", status: "current", stars: 0, points: 500, position: { x: 50, y: 7 } },
  { id: 2, title: "Foundation Check", description: "Inspect the physical structure and surrounding area for stability.", type: "quiz", status: "locked", stars: 0, points: 750, position: { x: 32, y: 19 } },
  { id: 3, title: "PPE Essentials", description: "Correctly verify the wearing sequence of Personal Protective Equipment.", type: "quiz", status: "locked", stars: 0, points: 1000, position: { x: 68, y: 31 } },
  { id: 4, title: "Reptile Check", description: "Identify and manage wildlife hazards within the equipment area.", type: "quiz", status: "locked", stars: 0, points: 1200, position: { x: 32, y: 43 } },
  { id: 5, title: "Door Mechanics", description: "Understand the proper opening and securing of unit doors.", type: "quiz", status: "locked", stars: 0, points: 1500, position: { x: 68, y: 55 } },
  { id: 6, title: "Internal Inspection", description: "Conduct a thorough check of internal components and wiring.", type: "quiz", status: "locked", stars: 0, points: 1800, position: { x: 50, y: 67 } },
  { id: 7, title: "Cable Routing", description: "Identify correct routing and alignment procedures for high-voltage cables.", type: "quiz", status: "locked", stars: 0, points: 2000, position: { x: 32, y: 79 } },
  { id: 8, title: "Hazard Analysis", description: "Final assessment on comprehensive hazard identification.", type: "quiz", status: "locked", stars: 0, points: 2500, position: { x: 50, y: 91 } },
];

