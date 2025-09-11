import { site } from "@/config/site";

export const metadata = {
  title: `About | ${site.name}`,
  description: "About the institution, overview, and institutional policies",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
  <h1 className="text-3xl font-bold text-slate-900">About {site.name}</h1>
        <div className="rounded-xl border p-6 shadow-sm bg-gradient-to-r from-indigo-50 to-white">
          <p className="whitespace-pre-line text-gray-800 leading-relaxed text-justified">{site.about}</p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
  <div className="rounded-xl border p-6 shadow-sm bg-gradient-to-r from-indigo-100 via-indigo-50 to-white">
          <h3 className="text-xl font-semibold mb-3 text-slate-900">Our Vision</h3>
          <p className="text-slate-800 leading-relaxed text-justified">
            {site.vision || "To be a centre of excellence in paramedical education, producing skilled healthcare professionals who serve communities with compassion and competence."}
          </p>
        </div>

        <div className="rounded-xl border p-6 shadow-sm bg-gradient-to-r from-amber-50 to-white">
          <h3 className="text-xl font-semibold mb-3 text-slate-900">Our Mission</h3>
          <div className="text-slate-800 leading-relaxed text-justified">
            {site.missionPoints && site.missionPoints.length ? (
              <ul className="list-disc pl-5 space-y-2">
                {site.missionPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            ) : (
              // fallback: split by sentences for short mission
              <ul className="list-disc pl-5 space-y-2">
                {(site.mission || "").split(/\.\s+/).filter(Boolean).map((s, i) => (
                  <li key={i}>{s.trim()}{s.endsWith('.') ? '' : '.'}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
  <h2 className="text-2xl font-semibold text-slate-900">Academic Board of IHRC</h2>

        <div className="rounded-xl border p-6 shadow-sm bg-gradient-to-r from-violet-50 to-white">
          <h3 className="text-xl font-semibold mb-2 text-slate-900">Background</h3>
          <p className="text-slate-800 whitespace-pre-line text-justified">
            The Academic Board of IHRC Paramedical College is constituted pursuant to the decision of the Board of Directors of Imphal Hospital & Research Centre Pvt. Ltd. on 15 July 2015 (Ref. No. IHRC/VOL-4-2025-261). The Board&apos;s objective is to ensure academic excellence, compliance with affiliating university norms, and adherence to statutory guidelines.
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-900">Members</h3>
          <ol className="list-decimal pl-5 space-y-1 text-slate-800 text-justified">
            <li><strong>Prof. Dr. Chanam Manglem Singh</strong> — Chairperson</li>
            <li><strong>Dr. Mayengbam Madhumangal Singh</strong> — Vice-Chairperson</li>
            <li><strong>Dr. Keinou Javed Mehedi</strong> — Secretary</li>
            <li><strong>Dr. Rajkumari Shanti Devi</strong> — External Expert</li>
            <li><strong>Celina Seram</strong> — Industry Expert</li>
            <li><strong>M. Jimmy</strong> — Financial Expert</li>
          </ol>
        </div>

  <h2 className="text-2xl font-semibold text-slate-900">Institutional Policies</h2>

        <div className="space-y-6">
          <div className="rounded-xl border p-6 shadow-sm bg-gradient-to-r from-rose-50 to-white">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Anti-Ragging Policy</h3>
            <div className="space-y-4 text-slate-800">
              <p>
                <strong>Commitment to Zero Tolerance:</strong> IHRC Paramedical College is committed to providing a safe, respectful, and harassment-free environment for all students, faculty, and staff. Ragging in any form is strictly prohibited and considered a serious offense.
              </p>
              <p>
                <strong>Definition of Ragging:</strong> Ragging includes any act that causes or is likely to cause physical or psychological harm, fear, or shame to a student. This encompasses verbal abuse, physical assault, forced activities, or any form of intimidation.
              </p>
              <p>
                <strong>Reporting Mechanism:</strong> Any student who experiences or witnesses ragging should immediately report it to the Anti-Ragging Committee, faculty members, or the Principal. Reports can be made anonymously if preferred.
              </p>
              <p>
                <strong>Consequences:</strong> Violators of the anti-ragging policy will face disciplinary action, which may include suspension, expulsion, or legal action as per UGC guidelines and state laws.
              </p>
              <p>
                <strong>Support Services:</strong> The college provides counseling services for victims of ragging. Our Anti-Ragging Committee ensures prompt investigation and resolution of all complaints.
              </p>
        <div className="mt-4 text-justified">
                <h4 className="text-lg font-semibold">Anti-Ragging Committee</h4>
          <ul className="list-disc pl-5 mt-2 text-gray-800">
                  <li>
                    <strong>Prof. Dr. Mayengbam Modhumangal Singh</strong> — Chair, Vice-Chancellor of Academic Board
                  </li>
                  <li>
                    <strong>Prof. Dr. Chanam Manglem Singh</strong> — Dean, IHRC Paramedical College
                  </li>
                  <li>
                    <strong>Selina Seram</strong> — Industry Expert, Academic Board
                  </li>
                </ul>
              </div>
              <p>
                <strong>Contact:</strong> For more information or to report an incident, contact the Anti-Ragging Helpline at +91-7005176498 or email admin@ihrcparamedicalcollege.com.
              </p>
            </div>
          </div>

          <div className="rounded-xl border p-6 shadow-sm bg-gradient-to-r from-emerald-50 to-white">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Other Institutional Policies</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li><strong>Academic Integrity Policy:</strong> Ensures fair assessment and prohibits plagiarism, cheating, or any form of academic dishonesty.</li>
              <li><strong>Code of Conduct:</strong> Outlines expected behavior for students, faculty, and staff to maintain a professional environment.</li>
              <li><strong>Grievance Redressal Policy:</strong> Provides mechanisms for addressing complaints related to academics, facilities, or interpersonal issues.</li>
              <li><strong>Equal Opportunity Policy:</strong> Promotes diversity and ensures equal opportunities for all without discrimination based on gender, caste, religion, or disability.</li>
              <li><strong>Data Privacy Policy:</strong> Protects personal information of students and staff in compliance with relevant laws.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              For detailed policies, please refer to the student handbook or contact the administration office.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
