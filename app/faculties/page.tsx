import { site } from "@/config/site";

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
        <h1 className="text-3xl font-bold text-blue-700">Faculties</h1>
        <p className="text-sm text-gray-600 max-w-2xl">Dedicated clinically experienced faculty guiding students with practical exposure and ethical focus.</p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>Total Faculties including Guest Faculty: {site.stats?.totalFaculties}</p>
          <p>Total intake of Students per course: {site.stats?.studentIntakePerCourse}</p>
          <p>Teacher Students ratio: {site.stats?.teacherStudentRatio}</p>
        </div>
      </header>
      {sections.map(section => (
        <section key={section.key} className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">{section.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(site.faculties as any)[section.key]?.map((f: any) => (
              <div key={f.name} className="rounded-xl border bg-white p-5 shadow hover:shadow-lg transition">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-blue-50 border flex items-center justify-center font-semibold text-blue-700 text-sm">
                    {f.name.split(" ").slice(0,2).map((p: string)=>p[0]).join("")}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-blue-700 leading-tight">{f.name}</p>
                    <p className="text-gray-700 leading-tight">{f.designation}</p>
                    <p className="text-gray-600 leading-tight text-xs">{f.qualification}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-gray-600">
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
