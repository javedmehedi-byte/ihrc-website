import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";

type Params = Promise<{ code: string }> | { code: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await params;
  const code = (p.code || "").toLowerCase();
  const course = site.courses.find((c) => c.code.toLowerCase() === code);
  return { title: course ? `${course.code} — ${course.name}` : "Course" };
}

export default async function CoursePage({ params }: { params: Params }) {
  const p = await params;
  const code = (p.code || "").toLowerCase();
  const course = site.courses.find((c) => c.code.toLowerCase() === code);

  if (!course) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Course not found</h1>
        <Link className="text-blue-600 underline" href="/">Go back</Link>
      </div>
    );
  }

  // Keep the previous, simpler structure; only wording is dynamic per course
  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl overflow-hidden border bg-white shadow">
        <Image src={course.image} alt={course.name} width={1200} height={500} className="w-full h-64 object-cover" />
        <div className="p-6 bg-blue-700 text-white">
          <span className="inline-block text-xs uppercase tracking-wider opacity-90">Programme</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-1">{course.code} — {course.name}</h1>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Overview</h2>
            <p className="text-gray-900">{course.overview}</p>
          </div>

      <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Semester‑wise Curriculum</h2>
            <div className="grid sm:grid-cols-2 gap-2 text-gray-900">
        {course.curriculum.map((item: string) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

      <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Career Opportunities</h2>
            <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-5 text-gray-900">
        {course.careers.map((c: string) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
      <div className="rounded-2xl border bg-white p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Key Facts</h3>
            <dl className="text-gray-900">
              <div className="py-2 flex items-start justify-between gap-4 border-b last:border-0">
                <dt className="font-medium">Duration</dt>
        <dd>{course.facts.duration}</dd>
              </div>
              <div className="py-2 flex items-start justify-between gap-4 border-b last:border-0">
                <dt className="font-medium">Eligibility</dt>
        <dd>{course.facts.eligibility}</dd>
              </div>
              <div className="py-2 flex items-start justify-between gap-4">
                <dt className="font-medium">Mode</dt>
        <dd>{course.facts.mode}</dd>
              </div>
            </dl>
            <div className="mt-4 flex gap-3">
              <Link href="/admissions/apply" className="inline-flex items-center rounded-lg border px-4 py-2 font-medium bg-black text-white">Apply Now</Link>
              <Link href="/pay-fees" className="inline-flex items-center rounded-lg border px-4 py-2 font-medium">Pay Fees</Link>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Related Courses</h3>
            <ul className="list-disc pl-5 text-blue-700">
              {site.courses.filter((c) => c.code !== course.code).map((c) => (
                <li key={c.code}>
                  <Link href={`/courses/${c.code.toLowerCase()}`} className="hover:underline">{c.code} — {c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
