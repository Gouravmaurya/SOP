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

  // Level 3: PPE Essentials Quiz
  3: [
    {
      id: 1,
      text: "What must you check before donning a pair of Class 0 electrical insulated gloves?",
      options: [
        { id: "a", text: "Perform an air inflation test to verify there are zero pinholes, tears, or cracks", isCorrect: true, explanation: "An air test forces air inside the glove to highlight micro-tears that can leak high-voltage currents." },
        { id: "b", text: "Verify that the color of the gloves matches your custom hard hat color", isCorrect: false, explanation: "Color matching is purely stylistic and provides zero physical safety value." },
        { id: "c", text: "Wipe them with heavy mineral oil to keep the rubber soft and pliable", isCorrect: false, explanation: "Petroleum-based chemicals degrade natural rubber compounds, destroying electrical resistance." }
      ]
    },
    {
      id: 2,
      text: "What cal/cm² rating is the typical industry minimum for electrical arc flash protection shields?",
      options: [
        { id: "a", text: "8 to 12 cal/cm² (Arc Flash PPE Category 2 standard)", isCorrect: true, explanation: "Category 2 protection requires a minimum shield/suit threshold of 8 cal/cm² to prevent thermal transfers." },
        { id: "b", text: "1.2 cal/cm² (Standard warehouse safety baseline)", isCorrect: false, explanation: "1.2 cal/cm² is the threshold for second-degree burns, which is completely insufficient protection." },
        { id: "c", text: "100 cal/cm² (High-voltage substation emergency suit)", isCorrect: false, explanation: "Overspecified; 100 cal/cm² is only for specialized, high-heat transmission operations." }
      ]
    },
    {
      id: 3,
      text: "What is the correct sequence of layers for protecting your hands during live work?",
      options: [
        { id: "a", text: "Class 0 insulated rubber glove underneath, leather protective outer glove on top", isCorrect: true, explanation: "The rubber glove provides the dielectric barrier, and the outer leather glove protects it from physical punctures." },
        { id: "b", text: "Thin cotton glove underneath, Class 0 rubber glove directly exposed to the open air", isCorrect: false, explanation: "An exposed rubber glove can quickly snag on sharp metal and rip, exposing the worker to shock." },
        { id: "c", text: "Heavy leather glove underneath, thin rubber glove stretched on the outside", isCorrect: false, explanation: "Stretching rubber over leather limits dexterity and ruins the insulation properties." }
      ]
    },
    {
      id: 4,
      text: "Why are metallic objects (rings, watches, zippers) strictly prohibited under FR PPE?",
      options: [
        { id: "a", text: "They conduct arc-flash heat instantly, causing severe, localized contact burns to skin", isCorrect: true, explanation: "Metal acts as a heat sink during an arc blast, heating up to white-hot levels instantly." },
        { id: "b", text: "They interfere with digital voltage testing telemetry tools", isCorrect: false, explanation: "Standard tools are shielded; the primary risk is contact burn induction." },
        { id: "c", text: "They create excessive noise inside the safety suit during movement", isCorrect: false, explanation: "Acoustic comfort is not the structural safety concern." }
      ]
    },
    {
      id: 5,
      text: "What is the correct storage method for dielectric rubber gloves?",
      options: [
        { id: "a", text: "Stored flat in a protective canvas bag, away from heat, ozone, and direct sunlight", isCorrect: true, explanation: "Dielectric rubber is highly sensitive to UV, extreme temperatures, and mechanical folding stress." },
        { id: "b", text: "Rolled up tightly inside your central steel toolbox underneath heavy metal wrenches", isCorrect: false, explanation: "Rolling causes stress cracking, and heavy tools easily puncture the protective rubber." },
        { id: "c", text: "Hung on a sunny outdoor tool rack for direct visual ventilation", isCorrect: false, explanation: "UV rays from direct sunlight trigger dry-rotting, destroying the dielectric barrier properties." }
      ]
    }
  ],

  // Level 4: Reptile Check Quiz
  4: [
    {
      id: 1,
      text: "What is the FIRST action if you spot a green snake coiled inside the bottom cable gland plate?",
      options: [
        { id: "a", text: "Suspend all work immediately, secure the area, and report the hazard to Control Room", isCorrect: true, explanation: "Your immediate priority is safety. Poking or handling animals inside a live cabinet is hazardous." },
        { id: "b", text: "Quickly push the snake out using a dry wooden stick or fiberglass rod", isCorrect: false, explanation: "Startling a snake inside a high-voltage enclosure can cause it to strike or bridge phase terminals." },
        { id: "c", text: "Spray chemical contact cleaner aerosol directly on the snake to force it out", isCorrect: false, explanation: "Aerosols can trigger explosive arc flashes and represent animal cruelty." }
      ]
    },
    {
      id: 2,
      text: "Why are electrical feeder pillars highly attractive nesting shelters for birds and reptiles?",
      options: [
        { id: "a", text: "The thermal heat generated by running busbars offers warm protection from weather", isCorrect: true, explanation: "Busbars dissipate heat, making dry, enclosed cabinets a prime nesting habitat." },
        { id: "b", text: "The high-voltage electromagnetic field improves reptile internal navigation", isCorrect: false, explanation: "Reptiles do not seek electromagnetic fields for navigation; they seek dry warmth." },
        { id: "c", text: "They are attracted to the hum of active electrical currents", isCorrect: false, explanation: "The sound does not attract wildlife; the structural dry warmth does." }
      ]
    },
    {
      id: 3,
      text: "What should you check around the concrete base plinth before stepping near the enclosure doors?",
      options: [
        { id: "a", text: "Inspect tall grass, dry leaf piles, or plinth gaps where snakes or wasps might nest", isCorrect: true, explanation: "Undergrowth and plinth openings are common nesting zones for dangerous pests." },
        { id: "b", text: "Calculate the exact angle of the cabinet shadow for optimal visibility", isCorrect: false, explanation: "Shadow calculations are irrelevant to physical perimeter safety assessments." },
        { id: "c", text: "Check for decorative gravel alignment and plinth concrete color matching", isCorrect: false, explanation: "Cosmetic checks do not identify immediate environmental hazards." }
      ]
    },
    {
      id: 4,
      text: "If a teammate is bitten by an unidentified reptile, what is the crucial medical safety rule?",
      options: [
        { id: "a", text: "Keep the teammate completely calm and still, call emergency services, and do NOT cut the bite", isCorrect: true, explanation: "Movement accelerates venom spread. Rest and immediate hospital dispatch are vital." },
        { id: "b", text: "Chase the reptile with an iron rod to capture or kill it first", isCorrect: false, explanation: "Chasing the animal puts you at risk of being bitten, delaying immediate first aid." },
        { id: "c", text: "Apply a tight tourniquet directly above the wound and suck out the venom", isCorrect: false, explanation: "Sucking venom is ineffective, and tight tourniquets can cause severe tissue necrosis." }
      ]
    },
    {
      id: 5,
      text: "What is the best design step to prevent animal ingress inside cabinet structures?",
      options: [
        { id: "a", text: "Ensure all cable entry gland plates are completely sealed with non-combustible foam/seals", isCorrect: true, explanation: "Properly sealing base cable gland openings blocks paths for pests while preserving thermal safety." },
        { id: "b", text: "Spray highly sweet-scented synthetic insecticide around the base plinth daily", isCorrect: false, explanation: "Scented sprays are temporary, wash away with rain, and can attract other wildlife." },
        { id: "c", text: "Leave a shallow container of water and milk nearby to keep them away from the panel", isCorrect: false, explanation: "Leaving food out actively attracts more animals to the substation perimeter." }
      ]
    }
  ],

  // Level 5: Door Mechanics Quiz
  5: [
    {
      id: 1,
      text: "What is a major safety concern when opening feeder pillar cabinet doors on high-wind days?",
      options: [
        { id: "a", text: "Wind catching the wide door can slam-swing it, crushing fingers or hitting internal components", isCorrect: true, explanation: "Large metal doors catch wind easily. Unsecured doors can swing violently, causing injuries." },
        { id: "b", text: "High winds can immediately distort thermal fuse ratings inside the panel", isCorrect: false, explanation: "Feeder fuses are heavily insulated and unaffected by standard door wind cycles." },
        { id: "c", text: "Wind currents can cause the door panels to detach from the hinges entirely", isCorrect: false, explanation: "Structural hinges are designed to withstand winds; slamming is the main risk." }
      ]
    },
    {
      id: 2,
      text: "What should you do immediately after fully opening the cabinet doors?",
      options: [
        { id: "a", text: "Secure both door panels in their mechanical locking stays/hooks to prevent movement", isCorrect: true, explanation: "Mechanical stays lock doors in an open position, preventing wind-induced slams." },
        { id: "b", text: "Apply immediate lubricant to the outer locking cylinders", isCorrect: false, explanation: "Lock maintenance is secondary to securing the workspace safety perimeters." },
        { id: "c", text: "Leave the keys in the locking cylinder to verify active access status", isCorrect: false, explanation: "Leaving keys in the lock can lead to accidental snags or locking during an egress." }
      ]
    },
    {
      id: 3,
      text: "How do you verify that a three-point locking rod system is operating correctly?",
      options: [
        { id: "a", text: "Confirm the steel rods engage securely into the top, bottom, and center frames when turned", isCorrect: true, explanation: "Three-point systems anchor doors at three critical structural points to prevent forced entry or warping." },
        { id: "b", text: "Listen for a high-pitched metallic ring when tapping the door plates", isCorrect: false, explanation: "Acoustics do not verify correct latch alignment and mechanical engagement." },
        { id: "c", text: "Coat the entire rod system in high-viscosity dielectric insulating grease", isCorrect: false, explanation: "Excessive grease attracts dust, gumming up the mechanical slots over time." }
      ]
    },
    {
      id: 4,
      text: "What represents a critical door seal gasket failure during an inspection?",
      options: [
        { id: "a", text: "Gasket rubber showing dry rot cracks, compression sets, or missing segments", isCorrect: true, explanation: "Degraded gaskets permit rainwater, humidity, and fine dust to penetrate the electrical core." },
        { id: "b", text: "Gasket showing slight gray powder dusting on the surface", isCorrect: false, explanation: "Gray powder is talc from manufacturing to keep rubber from sticking, not a failure." },
        { id: "c", text: "The gasket not being painted in bright safety yellow", isCorrect: false, explanation: "Seals must remain unpainted to maintain rubber compressibility and shape." }
      ]
    },
    {
      id: 5,
      text: "What is the correct field protocol for securing a warped, stubborn door handle?",
      options: [
        { id: "a", text: "Clean debris from locking slots and request formal hinge alignment maintenance", isCorrect: true, explanation: "Never force structural doors. Warped handles require hinge recalibration to seal correctly." },
        { id: "b", text: "Use a heavy sledgehammer to drive the lock cylinder in until it latches", isCorrect: false, explanation: "Hammering damages the locks and can cause short-circuits due to internal vibrations." },
        { id: "c", text: "Lash the doors closed using scrap copper wire tied around the side brackets", isCorrect: false, explanation: "Tying doors shut is non-compliant, unsafe, and leaves the cabinet vulnerable." }
      ]
    }
  ],

  // Level 6: Internal Inspection Quiz
  6: [
    {
      id: 1,
      text: "What does an unusually high temperature reading (>85°C) on a single phase busbar joint indicate?",
      options: [
        { id: "a", text: "High local contact resistance caused by loose connections, load imbalance, or oxidation", isCorrect: true, explanation: "High resistance in hot connections generates local thermal runaway, risking fire." },
        { id: "b", text: "Excellent high-efficiency thermal energy conduction within the terminal", isCorrect: false, explanation: "Excess heat is energy wasted as resistance, not an efficiency indicator." },
        { id: "c", text: "Standard operating temperature under balanced load cycles", isCorrect: false, explanation: "Standard distribution joints should remain well below 65°C under normal load." }
      ]
    },
    {
      id: 2,
      text: "What safety precaution is mandatory during an infrared thermal camera scan of a live panel?",
      options: [
        { id: "a", text: "Maintain standard safe boundary distance (MAD) and wear complete arc flash face shield", isCorrect: true, explanation: "Thermography is live work. Keep your distance and wear FR shields in case of explosive faults." },
        { id: "b", text: "Isolate the upstream breaker so you scan components when completely cold", isCorrect: false, explanation: "Thermal faults are invisible when de-energized. The system must be under active load." },
        { id: "c", text: "Touch the camera lens directly against the busbar plates to clear interference", isCorrect: false, explanation: "Touching live copper busbars with an uninsulated camera leads to fatal electrocution." }
      ]
    },
    {
      id: 3,
      text: "You inspect the RYB phase fuse carriers and notice the Red carrier is discolored. Action?",
      options: [
        { id: "a", text: "Log the damage, request circuit isolation, and replace the carrier and fuse link", isCorrect: true, explanation: "Discoloration indicates local overheating. Safe replacement prevents arc flash faults." },
        { id: "b", text: "Wipe the soot off the surface and tighten it with regular steel pliers while live", isCorrect: false, explanation: "Using non-insulated tools on live components guarantees high-voltage shock." },
        { id: "c", text: "Swap the red carrier with the blue phase to see if the heat transfers", isCorrect: false, explanation: "Swapping live components without isolating the load causes dangerous arc blasts." }
      ]
    },
    {
      id: 4,
      text: "Why is verifying bolt tightness on copper busbars a critical check?",
      options: [
        { id: "a", text: "Loose bolts create tiny air gaps, increasing resistance and generating extreme local heat", isCorrect: true, explanation: "Clamping pressure is key to low electrical resistance across structural connections." },
        { id: "b", text: "Over-tightening bolts restricts standard high-voltage flow rates", isCorrect: false, explanation: "Bolts secure mechanical contact; tightness has zero impact on current capacities." },
        { id: "c", text: "Loose bolts allow the copper busbar plates to expand naturally under thermal load", isCorrect: false, explanation: "Busbars expand, but loose fasteners cause electrical heating and safety failures." }
      ]
    },
    {
      id: 5,
      text: "What is the standard tool used to verify voltage presence on live terminals?",
      options: [
        { id: "a", text: "An insulated, CAT IV rated digital multimeter with proper safety probes", isCorrect: true, explanation: "CAT IV multimeters are built to withstand high-energy utility distribution transients safely." },
        { id: "b", text: "A standard non-insulated steel household neon screwdriver", isCorrect: false, explanation: "Low-voltage test screwdrivers are unsafe for high-energy distribution networks." },
        { id: "c", text: "A scrap piece of insulated copper grounding cable tapped against the chassis", isCorrect: false, explanation: "Tapping cables creates dead short-circuits and explosive arc events." }
      ]
    }
  ],

  // Level 7: Cable Routing Quiz
  7: [
    {
      id: 1,
      text: "What is a critical requirement for power cables entering the bottom gland plate?",
      options: [
        { id: "a", text: "Robust glanding and anchoring to ensure zero downward mechanical strain on the lugs", isCorrect: true, explanation: "Cables are extremely heavy; without anchor glands, their weight tears terminals off busbars." },
        { id: "b", text: "Cables should hang completely loose inside the plinth to maximize air flow", isCorrect: false, explanation: "Loose cables strain terminations and can rub against metal edges, exposing conductors." },
        { id: "c", text: "Wrapping the outer armor shielding completely in thick layers of clear plastic tape", isCorrect: false, explanation: "Plastic tape is for basic moisture seals, not structural strain support." }
      ]
    },
    {
      id: 2,
      text: "Why must high-voltage distribution cables maintain a minimum bending radius?",
      options: [
        { id: "a", text: "To avoid mechanical stress, cracking in insulation layers, and electrical tracking", isCorrect: true, explanation: "Sharp bends crush insulation, yielding hotspots and sudden dielectric breakdown faults." },
        { id: "b", text: "To optimize the flow velocity of high-speed alternating currents", isCorrect: false, explanation: "Bending affects structural insulation layers, not current velocity." },
        { id: "c", text: "To keep the cables parallel to the visual baseline of the cable trench", isCorrect: false, explanation: "Tidiness is a side benefit; the primary goal is preventing insulation failures." }
      ]
    },
    {
      id: 3,
      text: "What does the standard RYB phase sequence color coding identify?",
      options: [
        { id: "a", text: "Red, Yellow, and Blue phases (standard L1, L2, and L3 phase order)", isCorrect: true, explanation: "RYB is the standard color-coding configuration for three-phase AC systems." },
        { id: "b", text: "Regional Utility Board high-voltage safety ratings", isCorrect: false, explanation: "RYB stands for Phase colors, not regional utility board systems." },
        { id: "c", text: "Rated Yield Breakdown indicators for insulation limits", isCorrect: false, explanation: "Insulation limits are written in kV, not coded in phase colors." }
      ]
    },
    {
      id: 4,
      text: "What is the primary role of a spring washer in busbar cable terminations?",
      options: [
        { id: "a", text: "To maintain constant contact pressure during load thermal expansion cycles", isCorrect: true, explanation: "Joints expand when hot and contract when cold; spring washers absorb this motion without loosening." },
        { id: "b", text: "To isolate the steel bolt from phase current flows", isCorrect: false, explanation: "Washers are metal and conduct; they are mechanical pressure devices, not insulators." },
        { id: "c", text: "To make it much easier to unscrew the nut during emergency shutoffs", isCorrect: false, explanation: "They resist loosening; emergency shutdowns are electrical, not manual nut-loosening." }
      ]
    },
    {
      id: 5,
      text: "What is a common indicator of electrical tracking along cable insulation surfaces?",
      options: [
        { id: "a", text: "Carbonized, tree-like paths or fine white powder trails across the barrier surface", isCorrect: true, explanation: "Tracking is surface arc leakage that carbonizes path materials, creating short-circuit paths." },
        { id: "b", text: "Minor water condensation droplets pooling on bottom curves", isCorrect: false, explanation: "Condensation is water, while tracking is permanent carbonized structural damage." },
        { id: "c", text: "The presence of bright green vinyl electrical marking tape", isCorrect: false, explanation: "Vinyl tape is used for color coding phases and grounding, not an indication of damage." }
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
