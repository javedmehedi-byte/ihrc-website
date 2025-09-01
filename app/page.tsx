import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  return (
    <main className="space-y-12">
      {/* HERO */}
  <HeroSlider images={site.hero.images ?? [site.hero.image]} title={site.name} subtitle={site.tagline} />

      {/* COURSES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Courses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {site.courses.map((c) => (
            <Link
              key={c.code}
              href={`/courses/${c.code.toLowerCase()}`}
              className="card-3d overflow-hidden hover:shadow-xl"
            >
              <Image
                src={c.image}
                alt={c.name}
                width={640}
                height={360}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-blue-700">{c.code}</h3>
                <p className="text-strong">{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT / CAMPUS */}
      <section className="rounded-2xl border bg-white shadow p-6 flex flex-col md:flex-row items-center gap-6">
        <Image
          src={site.campus.image}
          alt="Campus"
          width={520}
          height={320}
          className="rounded-xl w-full md:w-1/2 object-cover"
        />
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2 text-green-600">About Us</h2>
          <p className="text-gray-700 whitespace-pre-line">{site.about}</p>
        </div>
      </section>
    </main>
  );
}
