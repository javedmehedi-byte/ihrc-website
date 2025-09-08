// config/site.ts
export type Course = {
  code: string;
  name: string;
  image: string;
  overview: string;
  facts: { duration: string; eligibility: string; mode: string };
  curriculum: string[];
  careers: string[];
};

export const site = {
  name: "IHRC PARAMEDICAL COLLEGE",
  tagline: "Empowering Healthcare through Education",
  // Picked a clean healthcare blue; swap later if you have a specific hex
  brand: { primary: "#0b68e6" },

  contact: {
    address: "Lalambung RIMS Road, Imphal West, Manipur-795001",
    phone: "+91-7005176498",
    email: "admin@ihrcparamedicalcollege.com",
    mapsUrl: "", // paste Google Maps link here when you have it
  },

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    x: "",
    linkedin: "",
  },

  // Use short codes for UI where needed, keep full names for display
  courses: [
    {
      code: "DT",
      name: "B. Sc. in Dialysis Technology",
      image: "/images/course-dt.jpg",
      overview:
        "The B.Sc. in Dialysis Technology trains students to operate dialysis machines, manage patient care during hemodialysis, and assist nephrologists with safe clinical procedures.",
      facts: {
        duration: "3 years + 12 months internship",
        eligibility: "10+2 Science (PCB) or equivalent",
        mode: "Full‑time",
      },
      curriculum: [
        "Human Anatomy & Physiology",
        "Basics of Nephrology",
        "Dialyzer Reprocessing",
        "Clinical Dialysis",
      ],
      careers: [
        "Dialysis Technologist",
        "Dialysis Unit Coordinator",
        "Clinical Assistant",
      ],
    },
    {
      code: "MLT",
      name: "B.Sc. in Medical Laboratory Technology",
      image: "/images/course-mlt.jpg",
      overview:
        "The B.Sc. in MLT focuses on diagnostic sciences with hands‑on training across hematology, microbiology, biochemistry, and pathology for accurate disease detection.",
      facts: {
        duration: "3 years + 12 months internship",
        eligibility: "10+2 Science (PCB) or equivalent",
        mode: "Full‑time",
      },
      curriculum: [
        "Hematology & Blood Banking",
        "Clinical Biochemistry",
        "Medical Microbiology",
        "Histopathology & Cytology",
      ],
      careers: [
        "Laboratory Technologist",
        "Phlebotomy Specialist",
        "Quality Control Associate",
      ],
    },
    {
      code: "OTT",
      name: "B. Sc. in Operation Theatre Technology",
      image: "/images/course-ott.jpg",
      overview:
        "The B.Sc. in OTT prepares students for sterile OT practices, surgical assistance, instrumentation, and peri‑operative patient care alongside surgeons and anesthetists.",
      facts: {
        duration: "3 years + 12 months internship",
        eligibility: "10+2 Science (PCB) or equivalent",
        mode: "Full‑time",
      },
      curriculum: [
        "Operation Theatre Procedures",
        "Sterilization & Infection Control",
        "Anesthesia Basics",
        "Surgical Instruments & Assistance",
      ],
      careers: [
        "OT Technologist",
        "Surgical Assistant",
        "CSSD Technician",
      ],
    },
    // Diploma Programmes
    {
      code: "DMLT",
      name: "Diploma in Medical Laboratory Technology",
      image: "/images/course-mlt.jpg",
      overview:
        "The Diploma in MLT equips students with core lab skills across hematology, biochemistry, and microbiology to support accurate and timely diagnostics.",
      facts: {
        duration: "2 years + 6 months internship",
        eligibility: "10+2 Science (PCB) or equivalent",
        mode: "Full‑time",
      },
      curriculum: [
        "Basics of Laboratory Techniques",
        "Clinical Biochemistry",
        "Hematology & Blood Banking",
        "Medical Microbiology",
      ],
      careers: [
        "Lab Technician",
        "Phlebotomist",
        "Sample Processing Assistant",
      ],
    },
    {
      code: "DDT",
      name: "Diploma in Dialysis Technology",
      image: "/images/course-dt.jpg",
      overview:
        "A practice‑oriented program covering dialysis procedures, machine handling, and patient care to assist nephrology teams.",
      facts: {
        duration: "2 years + 6 months internship",
        eligibility: "10+2 Science (PCB) or equivalent",
        mode: "Full‑time",
      },
      curriculum: [
        "Fundamentals of Nephrology",
        "Dialysis Equipment & Maintenance",
        "Patient Monitoring & Safety",
        "Dialyzer Reprocessing",
      ],
      careers: [
        "Dialysis Technician",
        "Dialysis Assistant",
        "Unit Coordinator (Dialysis)",
      ],
    },
    {
      code: "DOTT",
      name: "Diploma in Operation Theatre Technology",
      image: "/images/course-ott.jpg",
      overview:
        "Focuses on OT protocols, sterilization, and instrumentation to support surgical teams throughout peri‑operative care.",
      facts: {
        duration: "2 years + 6 months internship",
        eligibility: "10+2 Science (PCB) or equivalent",
        mode: "Full‑time",
      },
      curriculum: [
        "OT Procedures & Asepsis",
        "Sterilization & Infection Control",
        "Surgical Instruments",
        "Anesthesia Basics",
      ],
      careers: [
        "OT Technician",
        "CSSD Assistant",
        "Surgical Support Staff",
      ],
    },
  ] as Course[],

  hero:   { image: "/images/hero.jpg", images: ["/images/hero.jpg", "/images/hero1.jpg", "/images/hero2.jpg"] },
  campus: { image: "/images/campus.jpg" },

  about:
    [
      "IHRC Paramedical College is run by Imphal Hospital & Research Centre Pvt. Ltd.",
      "We provide industry-aligned paramedical education with a strong focus on clinical exposure and patient-centric skills.",
      "Our labs and teaching facilities are designed to mirror real hospital workflows, preparing students for immediate employability.",
      "Experienced faculties, structured internships, and strong hospital partnerships support successful careers in healthcare."
    ].join("\n"),
  facilities: [
    {
      title: "Own Advanced Lab",
      desc: "In‑house hematology, microbiology, biochemistry and pathology labs mirroring hospital standards.",
      icon: "🧪",
    },
    {
      title: "Own Dialysis Unit",
      desc: "Hands-on training with in‑house dialysis machines for safe hemodialysis procedures.",
      icon: "💉",
    },
    {
      title: "Own Operation Theatre",
      desc: "Sterile in‑house OT setup for instrumentation, asepsis and peri‑operative training.",
      icon: "🛠",
    },
    {
      title: "Robust Faculties",
      desc: "Clinically well‑experienced, student‑centric teaching staff delivering outcome‑driven learning with strong ethical grounding.",
      icon: "🎯",
    },
    {
      title: "Digital Learning Resources",
      desc: "Access to e-learning materials, journals and structured case discussions.",
      icon: "💻",
    },
    {
      title: "Student Support Services",
      desc: "Guidance, mentoring and career counseling for academic success.",
      icon: "🤝",
    },
  ],
  faculties: {
    dean: [
      {
        name: "Prof. Dr. Chanam Manglem Singh",
        designation: "Dean (Overall)",
        qualification: "MD OB/GY, FICS, FICOG",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
    ],
    medicalLab: [
      {
        name: "Keinou Rejwana Shahani",
        designation: "Program Coordinator",
        qualification: "M.Sc. MLT",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Manoharmayum Balraj Sharma",
        designation: "Lecturer",
        qualification: "Cytotechnologist ICMR",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. Dr. Y. Mohen Singh",
        designation: "Guest Faculty",
        qualification: "MD Pathology",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. Dr. Waikhom Gyaneshor Singh",
        designation: "Guest Faculty",
        qualification: "MD Biochemistry",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. T. Shantikumar Singh",
        designation: "Guest Faculty",
        qualification: "MD Microbiology",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
    ],
    operationTheatre: [
      {
        name: "Prof. Dr. RK Shanti Devi",
        designation: "Program Coordinator",
        qualification: "MD Anaesthesia",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Kh. Gunamani Singh",
        designation: "Lecturer",
        qualification: "B.Sc. Perfusion Technology, OT",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. Dr. Chanam Manglem Singh",
        designation: "Guest Faculty",
        qualification: "MD OB/GY",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. Dr. T. Arun Kumar",
        designation: "Guest Faculty",
        qualification: "MS General Surgery",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. Dr. S. Rajendra Singh",
        designation: "Guest Faculty",
        qualification: "MD Urology",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
    ],
    dialysis: [
      {
        name: "Dr. Keinou Javed Mehedi",
        designation: "Program Coordinator",
        qualification: "MBBS with Dialysis/ ICU experience",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Laishram Jackson",
        designation: "Lecturer",
        qualification: "Diploma in Dialysis Technology",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Laikhuram Shitaljit Singh",
        designation: "Lecturer",
        qualification: "Diploma in Dialysis Technology",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. Dr. Y. Iboton Singh",
        designation: "Guest Faculty",
        qualification: "MD Medicine",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
      {
        name: "Prof. Dr. Thangjam Premchand",
        designation: "Guest Faculty",
        qualification: "MD Medicine",
        specialization: "",
        experience: "",
        image: "/logo.png",
      },
    ],
  },
  stats: {
    totalFaculties: 9,
    studentIntakePerCourse: 15,
    teacherStudentRatio: "1:3.2",
  },
};
