export type LevelStatus = "locked" | "current" | "completed";

export interface Level {
  id: number;
  title: string;
  description: string;
  type: "quiz" | "simulation" | "technical";
  status: LevelStatus;
  stars: number;
  points: number;
  position: { x: number; y: number };
}

export const feederPillarQuest: Level[] = [
  { id: 1, title: "Prework Safety", description: "Learn the essential safety protocols before starting any field work.", type: "quiz", status: "completed", stars: 3, points: 500, position: { x: 50, y: 80 } },
  { id: 2, title: "Foundation Check", description: "Inspect the physical structure and surrounding area for stability.", type: "quiz", status: "completed", stars: 2, points: 750, position: { x: 30, y: 70 } },
  { id: 3, title: "PPE Essentials", description: "Correctly sequence the wearing of Personal Protective Equipment.", type: "technical", status: "current", stars: 0, points: 1000, position: { x: 60, y: 60 } },
  { id: 4, title: "Reptile Check", description: "Identify and manage wildlife hazards within the equipment area.", type: "simulation", status: "locked", stars: 0, points: 1200, position: { x: 40, y: 50 } },
  { id: 5, title: "Door Mechanics", description: "Understand the proper opening and securing of unit doors.", type: "simulation", status: "locked", stars: 0, points: 1500, position: { x: 70, y: 40 } },
  { id: 6, title: "Internal Inspection", description: "Conduct a thorough check of internal components and wiring.", type: "technical", status: "locked", stars: 0, points: 1800, position: { x: 50, y: 30 } },
  { id: 7, title: "Cable Routing", description: "Properly route and secure high-voltage cables.", type: "simulation", status: "locked", stars: 0, points: 2000, position: { x: 30, y: 20 } },
  { id: 8, title: "Hazard Analysis", description: "Final assessment on comprehensive hazard identification.", type: "quiz", status: "locked", stars: 0, points: 2500, position: { x: 60, y: 10 } },
];
