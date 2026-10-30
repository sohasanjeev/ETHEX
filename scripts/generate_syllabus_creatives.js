const fs = require('fs');
const path = require('path');

const syllabusData = {
  class6: {
    className: 'CLASS 6',
    subTitle: 'Junior Foundation & National Olympiad Gateway',
    target: 'Science & Math Olympiads, NTSE Foundation',
    subjects: [
      { name: 'Physics (10 MCQs)', topics: 'Motion & Measurement, Light & Shadows, Electricity & Circuits, Magnets' },
      { name: 'Chemistry (10 MCQs)', topics: 'Sorting Materials, Separation of Substances, Changes Around Us, Air & Water' },
      { name: 'Biology (10 MCQs)', topics: 'Food Components, Getting to Know Plants, Body Movements, Living Organisms' },
      { name: 'Mathematics (15 MCQs)', topics: 'Knowing Numbers, Whole Numbers, Playing with Numbers, Basic Geometry, Fractions' },
      { name: 'Mental Ability / IQ (10 MCQs)', topics: 'Series Completion, Analogy, Classification, Coding-Decoding, Direction Sense' },
      { name: 'Space & Astronomy (5 MCQs)', topics: 'Solar System, ISRO Missions (Chandrayaan & Aditya-L1), Satellites & Rockets' }
    ]
  },
  class7: {
    className: 'CLASS 7',
    subTitle: 'Foundation & Science Champ Olympiad Diagnostic',
    target: 'State Talent Search, Pre-Foundation for JEE/NEET',
    subjects: [
      { name: 'Physics (10 MCQs)', topics: 'Heat & Temperature, Motion & Time, Electric Current Effects, Light & Mirrors' },
      { name: 'Chemistry (10 MCQs)', topics: 'Acids, Bases & Salts, Physical & Chemical Changes, Soil & Water Resources' },
      { name: 'Biology (10 MCQs)', topics: 'Nutrition in Plants & Animals, Respiration in Organisms, Transportation' },
      { name: 'Mathematics (15 MCQs)', topics: 'Integers, Fractions & Decimals, Simple Equations, Lines & Angles, Triangles' },
      { name: 'Mental Ability / IQ (10 MCQs)', topics: 'Blood Relations, Venn Diagrams, Mathematical Operations, Pattern Matching' },
      { name: 'Space & Astronomy (5 MCQs)', topics: 'Planetary Science, Lunar Exploration, Space Telescopes & Gaganyaan Overview' }
    ]
  },
  class8: {
    className: 'CLASS 8',
    subTitle: 'Advanced Science & Mathematics Olympiad',
    target: 'NMMS, Homibhabha Young Scientist, JEE/NEET Pre-Foundation',
    subjects: [
      { name: 'Physics (10 MCQs)', topics: 'Force & Pressure, Friction, Sound & Acoustics, Chemical Effects of Current, Light' },
      { name: 'Chemistry (10 MCQs)', topics: 'Synthetic Fibres & Plastics, Metals & Non-metals, Coal & Petroleum, Combustion' },
      { name: 'Biology (10 MCQs)', topics: 'Crop Production, Microorganisms, Cell Structure, Reproduction & Adolescence' },
      { name: 'Mathematics (15 MCQs)', topics: 'Rational Numbers, Linear Equations, Understanding Quadrilaterals, Square Roots, Algebraic Expressions' },
      { name: 'Mental Ability / IQ (10 MCQs)', topics: 'Syllogism, Number Puzzles, Cube & Dice, Mirror Images, Critical Logic' },
      { name: 'Space Science (5 MCQs)', topics: 'Astrophysics Basics, Mars Missions, ISRO PSLV/LVM3 Launch Vehicles' }
    ]
  },
  class9: {
    className: 'CLASS 9',
    subTitle: 'Pre-JEE & Pre-NEET Advanced Foundation',
    target: 'NSEJS Olympiad, State Board & CBSE/ICSE High Achievers',
    subjects: [
      { name: 'Physics (12 MCQs)', topics: 'Motion, Laws of Motion & Momentum, Gravitation, Work, Energy & Power, Sound' },
      { name: 'Chemistry (12 MCQs)', topics: 'Matter in Our Surroundings, Is Matter Pure?, Atoms & Molecules, Structure of Atom' },
      { name: 'Biology (12 MCQs)', topics: 'Fundamental Unit of Life (Cell), Tissues, Diversity, Natural Resources' },
      { name: 'Mathematics (14 MCQs)', topics: 'Number Systems, Polynomials, Coordinate Geometry, Lines & Angles, Triangles, Circles' },
      { name: 'Mental Ability (10 MCQs)', topics: 'Analytical Reasoning, Data Sufficiency, Ranking & Sequencing, Logical Clocks' }
    ]
  },
  class10: {
    className: 'CLASS 10',
    subTitle: 'Board Excellence & Premier JEE/NEET Launchpad',
    target: 'NTSE, Class 10 Board Rankers, EURO Premier Batches',
    subjects: [
      { name: 'Physics (12 MCQs)', topics: 'Light (Reflection & Refraction), Human Eye, Electricity, Magnetic Effects, Energy' },
      { name: 'Chemistry (12 MCQs)', topics: 'Chemical Reactions, Acids/Bases/Salts, Metals & Non-Metals, Carbon Compounds, Periodic Classification' },
      { name: 'Biology (12 MCQs)', topics: 'Life Processes, Control & Coordination, How Do Organisms Reproduce?, Heredity & Evolution' },
      { name: 'Mathematics (14 MCQs)', topics: 'Real Numbers, Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions, Trigonometry' },
      { name: 'Aptitude & Space (10 MCQs)', topics: 'High-Level Critical Reasoning, Quantitative Aptitude, Deep Space Tech' }
    ]
  },
  jee_class11: {
    className: 'CLASS 11 (JEE)',
    subTitle: 'Engineering Track — JEE Main & Advanced Benchmark',
    target: 'IIT-JEE Mains & Advanced, MHT-CET Engineering 2027',
    subjects: [
      { name: 'Physics (20 MCQs • 80 M)', topics: 'Units & Dimensions, Kinematics (1D & 2D), Laws of Motion, Work Energy Power, Rotational Dynamics, Gravitation' },
      { name: 'Chemistry (20 MCQs • 80 M)', topics: 'Some Basic Concepts of Chemistry, Structure of Atom, Periodic Classification, Chemical Bonding, States of Matter, Thermodynamics' },
      { name: 'Mathematics (20 MCQs • 80 M)', topics: 'Sets, Relations & Functions, Trigonometric Functions, Complex Numbers, Quadratic Equations, Sequence & Series, Straight Lines' }
    ]
  },
  neet_class11: {
    className: 'CLASS 11 (NEET)',
    subTitle: 'Medical Track — NEET-UG Benchmark Examination',
    target: 'Top Govt. MBBS & AIIMS Medical Aspirants 2027',
    subjects: [
      { name: 'Physics (15 MCQs • 60 M)', topics: 'Physical World & Measurement, Kinematics, Laws of Motion, Work Power & Energy, Motion of Systems & Gravitation' },
      { name: 'Chemistry (15 MCQs • 60 M)', topics: 'Mole Concept, Atomic Structure, Chemical Bonding, Periodic Properties, Redox Reactions, Basic Organic Chemistry' },
      { name: 'Botany (15 MCQs • 60 M)', topics: 'Diversity in Living World, Biological Classification, Plant Kingdom, Morphology & Anatomy of Flowering Plants' },
      { name: 'Zoology (15 MCQs • 60 M)', topics: 'Animal Kingdom, Structural Organisation in Animals, Biomolecules, Cell Biology & Cell Division' }
    ]
  },
  jee_class12: {
    className: 'CLASS 12 (JEE)',
    subTitle: 'Final Sprint — JEE Main, Advanced & MHT-CET',
    target: 'IIT, NIT, IIIT & COEP Engineering Selections',
    subjects: [
      { name: 'Physics (20 MCQs • 80 M)', topics: 'Electrostatics, Current Electricity, Moving Charges & Magnetism, EMI & AC, Optics (Ray & Wave), Modern Physics' },
      { name: 'Chemistry (20 MCQs • 80 M)', topics: 'Solid State, Solutions, Electrochemistry, Chemical Kinetics, Coordination Compounds, Haloalkanes & Haloarenes, Alcohols & Carbonyls' },
      { name: 'Mathematics (20 MCQs • 80 M)', topics: 'Relations & Functions, Matrices & Determinants, Calculus (Differentiation & Integration), Differential Equations, Vectors & 3D' }
    ]
  },
  neet_class12: {
    className: 'CLASS 12 (NEET)',
    subTitle: 'Final Sprint — NEET-UG Govt. Medical Seats',
    target: 'Govt. Medical Colleges (MBBS / BDS / BAMS)',
    subjects: [
      { name: 'Physics (15 MCQs • 60 M)', topics: 'Electrostatics, Capacitance, Current Electricity, Magnetism & Matter, Optics, Atoms & Nuclei, Semiconductor Electronics' },
      { name: 'Chemistry (15 MCQs • 60 M)', topics: 'Solutions, Electrochemistry, Chemical Kinetics, p/d/f Block Elements, Aldehydes, Ketones, Carboxylic Acids & Biomolecules' },
      { name: 'Botany (15 MCQs • 60 M)', topics: 'Reproduction in Flowering Plants, Principles of Inheritance & Variation, Molecular Basis of Inheritance, Biotechnology' },
      { name: 'Zoology (15 MCQs • 60 M)', topics: 'Human Reproduction, Reproductive Health, Evolution, Human Health & Disease, Biotechnology & Ecology' }
    ]
  }
};

function generateSvg(key, info) {
  const isJeeOrNeet = key.includes('jee') || key.includes('neet');
  
  let subjectsHtml = '';
  const numSubjects = info.subjects.length;
  
  info.subjects.forEach((s, idx) => {
    subjectsHtml += `
      <g transform="translate(40, ${250 + idx * (numSubjects <= 4 ? 85 : 68)})">
        <rect width="1120" height="${numSubjects <= 4 ? 74 : 58}" rx="14" fill="#0E1B3E" stroke="#1E3264" stroke-width="1.5" />
        <rect x="0" y="0" width="8" height="${numSubjects <= 4 ? 74 : 58}" rx="4" fill="#0066FF" />
        <text x="28" y="${numSubjects <= 4 ? 32 : 25}" font-family="Segoe UI, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#FACC15">${escapeXml(s.name)}</text>
        <text x="28" y="${numSubjects <= 4 ? 54 : 44}" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#CBD5E1">${escapeXml(s.topics)}</text>
      </g>
    `;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070D22"/>
      <stop offset="50%" stop-color="#0B163B"/>
      <stop offset="100%" stop-color="#060A1C"/>
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="50%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#FDE047"/>
    </linearGradient>
    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0066FF"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="0.75" stroke-opacity="0.3"/>
    </pattern>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="800" fill="url(#bgGradient)"/>
  <rect width="1200" height="800" fill="url(#gridPattern)"/>

  <!-- Top Accent Glowing Bar -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#goldGradient)"/>

  <!-- Header Banner -->
  <g transform="translate(40, 36)">
    <!-- Brand Tag -->
    <rect width="180" height="30" rx="8" fill="#1E293B" stroke="#334155"/>
    <text x="14" y="20" font-family="Segoe UI, sans-serif" font-size="11" font-weight="800" fill="#38BDF8" letter-spacing="1.5">EURO CAMPUS</text>
    
    <rect x="190" y="0" width="220" height="30" rx="8" fill="#1E293B" stroke="#334155"/>
    <text x="204" y="20" font-family="Segoe UI, sans-serif" font-size="11" font-weight="800" fill="#FBBF24" letter-spacing="1">ETHEX 2026 OFFICIAL</text>

    <!-- Main Title -->
    <text x="0" y="80" font-family="Segoe UI, sans-serif" font-size="38" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">${escapeXml(info.className)} — SYLLABUS &amp; PATTERN</text>
    <text x="0" y="112" font-family="Segoe UI, sans-serif" font-size="16" font-weight="600" fill="#94A3B8">${escapeXml(info.subTitle)} • Target: ${escapeXml(info.target)}</text>
  </g>

  <!-- Key Exam Metrics Banner -->
  <g transform="translate(40, 168)">
    <!-- Metric 1: Total Questions -->
    <g transform="translate(0, 0)">
      <rect width="265" height="60" rx="14" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
      <text x="18" y="26" font-family="Segoe UI, sans-serif" font-size="11" font-weight="800" fill="#64748B" letter-spacing="1">TOTAL QUESTIONS</text>
      <text x="18" y="49" font-family="Segoe UI, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF">60 Multiple Choice (MCQs)</text>
    </g>

    <!-- Metric 2: Total Marks -->
    <g transform="translate(285, 0)">
      <rect width="265" height="60" rx="14" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
      <text x="18" y="26" font-family="Segoe UI, sans-serif" font-size="11" font-weight="800" fill="#64748B" letter-spacing="1">MAXIMUM MARKS</text>
      <text x="18" y="49" font-family="Segoe UI, sans-serif" font-size="20" font-weight="900" fill="#38BDF8">240 Marks</text>
    </g>

    <!-- Metric 3: Duration -->
    <g transform="translate(570, 0)">
      <rect width="265" height="60" rx="14" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
      <text x="18" y="26" font-family="Segoe UI, sans-serif" font-size="11" font-weight="800" fill="#64748B" letter-spacing="1">TEST DURATION</text>
      <text x="18" y="49" font-family="Segoe UI, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF">90 Minutes</text>
    </g>

    <!-- Metric 4: Marking Scheme -->
    <g transform="translate(855, 0)">
      <rect width="265" height="60" rx="14" fill="#0F172A" stroke="#1E293B" stroke-width="1.5"/>
      <text x="18" y="26" font-family="Segoe UI, sans-serif" font-size="11" font-weight="800" fill="#64748B" letter-spacing="1">MARKING SCHEME</text>
      <text x="18" y="49" font-family="Segoe UI, sans-serif" font-size="20" font-weight="900" fill="#FBBF24">+4 Marks / -1 Mark</text>
    </g>
  </g>

  <!-- Subject Breakdown Rows -->
  ${subjectsHtml}

  <!-- Footer Banner with ISRO & Scholarship Guarantee -->
  <g transform="translate(40, 715)">
    <rect width="1120" height="54" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1"/>
    <text x="24" y="33" font-family="Segoe UI, sans-serif" font-size="13" font-weight="800" fill="#FBBF24">★ WIN UP TO 90% SCHOLARSHIP &amp; NATIONAL ISRO STUDY TOUR</text>
    <text x="730" y="33" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="#94A3B8">Centres: PCMC (Chinchwad) &amp; Shikrapur • Online Pan-India</text>
  </g>
</svg>
`;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const targetDir = path.join(__dirname, '..', 'public', 'branding', 'syllabus');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

Object.keys(syllabusData).forEach((key) => {
  const filePath = path.join(targetDir, `${key}.svg`);
  const svgContent = generateSvg(key, syllabusData[key]);
  fs.writeFileSync(filePath, svgContent, 'utf8');
  console.log(`Generated: ${filePath}`);
});
console.log('All 9 syllabus templates successfully generated!');
