import { site } from "@/config/site";

type Faculty = {
  name: string;
  designation: string;
  qualification?: string;
  specialization?: string;
  experience?: string;
};

type FacultySections = {
  dean?: Faculty[];
  medicalLab?: Faculty[];
  operationTheatre?: Faculty[];
  dialysis?: Faculty[];
};

export const metadata = {
  title: `Faculties | ${site.name}`,
  description: "Faculty profiles organized by department",
};

export default function FacultiesPage() {
  const sections = [
    { key: "dean", title: "Dean (Overall)" },
    { key: "medicalLab", title: "Medical Lab Technology" },
    { key: "operationTheatre", title: "Operation Theatre & Anaesthesia Technology" },
    { key: "dialysis", title: "Dialysis Technology" },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Faculties</h1>
  <p className="text-sm text-white max-w-2xl">Dedicated clinically experienced faculty guiding students with practical exposure and ethical focus.</p>
        <div className="inline-block bg-white p-4 rounded-md shadow-md ring-1 ring-slate-200 text-slate-900 space-y-1">
          <p className="text-sm font-medium">Total Faculties including Guest Faculty: <span className="font-semibold">{site.stats?.totalFaculties}</span></p>
          <p className="text-sm font-medium">Total intake of Students per course: <span className="font-semibold">{site.stats?.studentIntakePerCourse}</span></p>
          <p className="text-sm font-medium">Teacher Students ratio: <span className="font-semibold">{site.stats?.teacherStudentRatio}</span></p>
        </div>
      </header>
  {sections.map(section => (
        <section key={section.key} className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
    {(site.faculties as FacultySections)[section.key as keyof FacultySections]?.map((f: Faculty) => (
              <div key={f.name} className="rounded-xl border p-5 shadow hover:shadow-lg transition bg-gradient-to-r from-white to-sky-50">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-900 border flex items-center justify-center font-semibold text-white text-sm">
                    {f.name.split(" ").slice(0,2).map((p: string)=>p[0]).join("")}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-slate-900 leading-tight">{f.name}</p>
                    <p className="text-slate-800 leading-tight">{f.designation}</p>
                    <p className="text-slate-600 leading-tight text-xs">{f.qualification}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-slate-700">
                  {f.specialization && <p><span className="font-medium">Specialization:</span> {f.specialization}</p>}
                  {f.experience && <p><span className="font-medium">Experience:</span> {f.experience}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
