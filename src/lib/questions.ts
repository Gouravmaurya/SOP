export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface ChecklistStep {
  id: string;
  text: string;
  correctOrder: number;
}

export const levelQuestions: Record<number, Question[]> = {
  // Level 1: Prework Safety Quiz
  1: [
    {
      id: 1,
      text: "What is the FIRST step before opening a Feeder Pillar?",
      options: [
        { id: "a", text: "Visually inspect for physical damage or signs of heating", isCorrect: true, explanation: "Safety protocol requires a visual check to avoid immediate flash hazards." },
        { id: "b", text: "Directly unlock and pull the door open", isCorrect: false, explanation: "Pulling the door without inspection can trigger arc flashes if there's internal damage." },
        { id: "c", text: "Check the meter reading through the glass", isCorrect: false, explanation: "Inspection comes before data gathering for safety." }
      ]
    },
    {
      id: 2,
      text: "Which PPE is MANDATORY for live feeder pillar operations?",
      options: [
        { id: "a", text: "Cotton gloves and safety goggles", isCorrect: false, explanation: "Cotton provides zero electrical and arc flash thermal protection." },
        { id: "b", text: "Insulated Gloves (Class 0), Face Shield, and FR Suit", isCorrect: true, explanation: "Standard arc flash protection suite required for live work." },
        { id: "c", text: "Just a standard hard hat and steel-toed boots", isCorrect: false, explanation: "Arc flash protection is critical for hand and face exposure." }
      ]
    },
    {
      id: 3,
      text: "What must you check before entering a high-voltage work area?",
      options: [
        { id: "a", text: "Active Permit to Work (PTW) and the single-line diagram", isCorrect: true, explanation: "You must always verify authorized access limits and structural circuits." },
        { id: "b", text: "Toolbox inventory list and lunch schedules", isCorrect: false, explanation: "Important for logistics, but not a life-safety gate clearance requirement." },
        { id: "c", text: "Regional weather reports only", isCorrect: false, explanation: "Weather is a hazard factor, but does not grant permit validation." }
      ]
    },
    {
      id: 4,
      text: "What is the correct protocol if you detect a burning odor before opening the pillar?",
      options: [
        { id: "a", text: "Abort operation, secure the perimeter, and notify the Control Room immediately", isCorrect: true, explanation: "A burning smell indicates an active thermal or short-circuit event. Do not open." },
        { id: "b", text: "Carefully open the door to locate the smoking element", isCorrect: false, explanation: "Opening the cabinet exposes you to extreme arc flash risk if an active fault exists." },
        { id: "c", text: "Use a nearby stick to pry the lock open from a distance", isCorrect: false, explanation: "Extremely dangerous; safety mandates securing the perimeter and reporting." }
      ]
    },
    {
      id: 5,
      text: "Why must you verify the status of the upstream isolation point?",
      options: [
        { id: "a", text: "To ensure the circuit can be safely isolated and verified dead if needed", isCorrect: true, explanation: "Always identify your lock-out-tag-out sources before work begins." },
        { id: "b", text: "To adjust grid billing rates during downtime", isCorrect: false, explanation: "Upstream isolation is for safety, not metering or billing adjustments." },
        { id: "c", text: "To measure regional insulation resistance beforehand", isCorrect: false, explanation: "Insulation tests are done locally on isolated elements, not upstream." }
      ]
    }
  ],

  // Level 2: Foundation Check Quiz
  2: [
    {
      id: 1,
      text: "What is a critical foundation hazard that prevents any work on a feeder pillar?",
      options: [
        { id: "a", text: "Severe plinth tilting, structural cracking, or water accumulation at the base", isCorrect: true, explanation: "Structural foundation failures can tip the cabinet or conduct ground leakage." },
        { id: "b", text: "Slight dust layer on the concrete edge", isCorrect: false, explanation: "Cosmetic dust is a regular field condition and not a structural safety hazard." },
        { id: "c", text: "Small weeds growing 2 meters away from the base", isCorrect: false, explanation: "Weeds must be cleared eventually, but minor growth is not an immediate life hazard." }
      ]
    },
    {
      id: 2,
      text: "What should be verified regarding the concrete plinth base plinth integrity?",
      options: [
        { id: "a", text: "Ensure no hollow cavities, washouts, or soil erosion underneath the plinth", isCorrect: true, explanation: "Soil erosion can cause the heavy pillar plinth to collapse or sink during maintenance." },
        { id: "b", text: "Verify that the plinth is painted bright green", isCorrect: false, explanation: "Painting concrete is not a structural safety rule." },
        { id: "c", text: "Measure the exact moisture ratio of the concrete using an electronic meter", isCorrect: false, explanation: "Visual inspection of integrity is standard field protocol, not laboratory testing." }
      ]
    },
    {
      id: 3,
      text: "Why is stagnant water around the plinth base a severe hazard?",
      options: [
        { id: "a", text: "It creates a massive electrical shock conduction pathway for ground fault currents", isCorrect: true, explanation: "Water drastically decreases contact resistance, amplifying electric shock severity." },
        { id: "b", text: "It attracts small insects that might startle the engineer", isCorrect: false, explanation: "Startle hazards exist, but shock conduction is the fatal risk." },
        { id: "c", text: "It washes off the lubrication on the door hinges", isCorrect: false, explanation: "Shock safety takes precedence over mechanical hinge maintenance." }
      ]
    },
    {
      id: 4,
      text: "What mechanical anchor factor must the plinth bolts satisfy?",
      options: [
        { id: "a", text: "Securely anchored, rust-treated, and completely tightened without thread stripping", isCorrect: true, explanation: "Anchor bolts keep the heavy metal cabinet physically secure against wind and operations." },
        { id: "b", text: "Coated with yellow plastic decorative caps", isCorrect: false, explanation: "Plastic caps are cosmetic, not structural anchors." },
        { id: "c", text: "Loosened slightly to accommodate thermal expansion", isCorrect: false, explanation: "Anchors must be fully tightened; loose anchors endanger stability." }
      ]
    },
    {
      id: 5,
      text: "What is the minimum safe cleared perimeter from the plinth base?",
      options: [
        { id: "a", text: "1.0 meter clearance of all debris, tall grass, and blocking objects", isCorrect: true, explanation: "Trainees need clear access to escape quickly in case of an arc flash or emergency." },
        { id: "b", text: "No clearance needed as long as the door opens at least 45 degrees", isCorrect: false, explanation: "Insufficient clearance restricts safe working and fast emergency egress." },
        { id: "c", text: "5.0 meters marked by high-barrier steel fencing", isCorrect: false, explanation: "Overspecified; 1.0 meter of clean working area is standard compliance." }
      ]
    }
  ],

  // Level 8: Hazard Analysis Quiz
  8: [
    {
      id: 1,
      text: "You notice a fuse carrier is severely charred and discolored. What does this indicate?",
      options: [
        { id: "a", text: "Severe local contact resistance and dangerous thermal heating", isCorrect: true, explanation: "Charring is a key symptom of loose contacts heating up under normal load." },
        { id: "b", text: "Standard chemical aging of composite materials", isCorrect: false, explanation: "High temperatures cause charring, requiring immediate replacement." },
        { id: "c", text: "Normal oxidation of high-quality protective copper plating", isCorrect: false, explanation: "Copper oxidation is green/black, but charring is structural damage due to heat." }
      ]
    },
    {
      id: 2,
      text: "What is the correct action if you discover a bird's nest or active snake inside the pillar?",
      options: [
        { id: "a", text: "Abort operation, secure cabinet, and contact specialized wildlife responders", isCorrect: true, explanation: "Protect wildlife and personnel; do not poke live components near hazards." },
        { id: "b", text: "Carefully poke it out using an insulated fiberglass switch stick", isCorrect: false, explanation: "Startling a snake or bird inside a live cabinet can trigger short-circuits or attacks." },
        { id: "c", text: "Spray high-pressure water inside to flush the hazard away", isCorrect: false, explanation: "Spraying water inside a live electrical cabinet causes catastrophic explosions." }
      ]
    },
    {
      id: 3,
      text: "During a load check, Phase Red has 120% load, while Yellow and Blue have 25%. What is this?",
      options: [
        { id: "a", text: "Severe phase unbalance leading to high neutral currents and thermal breakdowns", isCorrect: true, explanation: "Unbalanced loads trigger excessive heating and cable insulation stress." },
        { id: "b", text: "Optimal energy efficiency configurations", isCorrect: false, explanation: "Unbalanced phases degrade transformer efficiency and overload single circuits." },
        { id: "c", text: "A standard transient load shift that can be completely ignored", isCorrect: false, explanation: "Load balancing must be reviewed to prevent phase and neutral burnouts." }
      ]
    },
    {
      id: 4,
      text: "What represents a complete failure of the earthing system inside the cabinet?",
      options: [
        { id: "a", text: "Broken, disconnected, or heavily corroded copper grounding tape", isCorrect: true, explanation: "Without the grounding tape, the metal cabinet chassis can become dangerously energized." },
        { id: "b", text: "Use of insulated green/yellow stripes on secondary ground wires", isCorrect: false, explanation: "Green/yellow is the international standard color for earth conductors." },
        { id: "c", text: "Connecting the frame grounding point directly to the base concrete plinth", isCorrect: false, explanation: "Grounding goes to a dedicated earthing rod, not concrete plinth isolation, but copper tape integrity is the key check." }
      ]
    },
    {
      id: 5,
      text: "What is the most crucial step before shutting and locking the pillar door?",
      options: [
        { id: "a", text: "Conduct a visual sweep to ensure no tools, screws, or keys are left inside", isCorrect: true, explanation: "Foreign metal objects left inside can bridge contacts and cause catastrophic short-circuits." },
        { id: "b", text: "Apply shiny polish to the outer paint scheme", isCorrect: false, explanation: "Cosmetics are low priority compared to internal clearance safety sweeps." },
        { id: "c", text: "Leave a spare fuse lying on the floor plate for the next shift", isCorrect: false, explanation: "Loose metal objects must never be left unsecured inside a live breaker area." }
      ]
    }
  ]
};

export const levelChecklists: Record<number, ChecklistStep[]> = {
  // Level 3: PPE Essentials Checklist (Technical)
  3: [
    { id: "1", text: "Verify Permit-to-Work credentials & inspect FR Suit for damage", correctOrder: 0 },
    { id: "2", text: "Don electrically insulated safety leather boots", correctOrder: 1 },
    { id: "3", text: "Don Class 0 Insulated Rubber Gloves under leather protectors", correctOrder: 2 },
    { id: "4", text: "Secure Arc Flash Protective Face Shield and dielectric Hard Hat", correctOrder: 3 },
    { id: "5", text: "Perform a final buddy-check to verify no exposed skin surfaces", correctOrder: 4 }
  ],

  // Level 6: Internal Inspection Checklist (Technical)
  6: [
    { id: "1", text: "Validate circuit isolation status using an approved tester", correctOrder: 0 },
    { id: "2", text: "Perform Infrared Thermography scan on busbars to detect hot spots", correctOrder: 1 },
    { id: "3", text: "Visually check Red, Yellow, Blue (RYB) phase fuse carriers for heat charring", correctOrder: 2 },
    { id: "4", text: "Verify that the main chassis grounding tape is securely tightened", correctOrder: 3 },
    { id: "5", text: "Wipe down minor non-conductive dust panels using dry insulated tools", correctOrder: 4 }
  ]
};
