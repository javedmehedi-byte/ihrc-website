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
        duration: "3 years + 6 months internship",
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
        duration: "3 years + 6 months internship",
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
        duration: "3 years + 6 months internship",
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
  ] as Course[],

  hero:   { image: "/images/hero.jpg", images: ["/images/hero.jpg", "/images/hero1.jpg", "/images/hero2.jpg"] },
  campus: { image: "/images/campus.jpg" },

  about:
    [
      "IHRC Paramedical College is run by Imphal Hospital & Research Centre Pvt. Ltd.",
      "We provide industry-aligned paramedical education with a strong focus on clinical exposure and patient-centric skills.",
      "Our labs and teaching facilities are designed to mirror real hospital workflows, preparing students for immediate employability.",
      "Experienced faculty, structured internships, and strong hospital partnerships support successful careers in healthcare."
    ].join("\n"),
};
