// config/site.ts
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
    { code: "DT",  name: "B. Sc. in Dialysis Technology",              image: "/images/course-dt.jpg"  },
    { code: "MLT", name: "B.Sc. in Medical Laboratory Technology",      image: "/images/course-mlt.jpg" },
    { code: "OTT", name: "B. Sc. in Operation Theatre Technology",      image: "/images/course-ott.jpg" },
  ],

  hero:   { image: "/images/hero.jpg" },
  campus: { image: "/images/campus.jpg" },

  about:
    [
      "IHRC Paramedical College is run by Imphal Hospital & Research Centre Pvt. Ltd.",
      "We provide industry-aligned paramedical education with a strong focus on clinical exposure and patient-centric skills.",
      "Our labs and teaching facilities are designed to mirror real hospital workflows, preparing students for immediate employability.",
      "Experienced faculty, structured internships, and strong hospital partnerships support successful careers in healthcare."
    ].join("\n"),
};
