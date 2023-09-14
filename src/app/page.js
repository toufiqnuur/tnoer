import Image from "next/image";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { PiStarFourFill } from "react-icons/pi";
import { BsFillEnvelopeFill, BsGithub, BsLinkedin } from "react-icons/bs";
import ProjectCard from "~/components/project_card";

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-12">
      <header className="m-4 max-w-5xl rounded-lg md:mx-auto">
        <div className="flex h-14 items-center justify-between">
          <Link className="ml-4 text-lg font-semibold" href="/">
            TOUFIQ.
          </Link>
          <button className="px-4 py-3">
            <IoIosMenu size={32} />
          </button>
        </div>
      </header>

      <div className="relative">
        <div className="overlay absolute -top-32 left-0 -z-10 h-[180%] w-full md:h-[200%]"></div>
        <div className="mx-4 max-w-5xl md:mx-auto md:flex md:flex-wrap md:items-center md:justify-center">
          <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-2 border-black bg-blue-400 md:mx-0">
            <Image
              className="absolute -bottom-4 left-1"
              src="/profile-me.png"
              width={180}
              height={180}
              alt=""
            />
          </div>
          <div className="mt-4 text-center md:ml-16 md:text-left">
            <div className="text-3xl font-semibold">Iam Toufiq.</div>
            <h1 className="text-xl">Front End Web Developer</h1>
            <div className="mt-6 space-x-4">
              <a
                className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white"
                href="https://drive.google.com/file/d/1hkk9KBUEzZaRaG9WI3HqzEoSQfzWow9n/view?usp=sharing"
              >
                Download CV
              </a>
              <a
                className="rounded-lg px-4 py-2 text-sm font-semibold text-blue-600"
                href="#contacts"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-t from-white via-white to-transparent">
        <div className="mx-4 max-w-5xl py-4 md:mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 rounded-lg border-2 border-black bg-amber-300 p-4 text-black/50">
            <div className="text-xl font-semibold">React</div>
            <div>
              <PiStarFourFill />
            </div>
            <div className="text-xl font-semibold">Tailwind Css</div>
            <div>
              <PiStarFourFill />
            </div>
            <div className="text-xl font-semibold">NextJs</div>
            <div>
              <PiStarFourFill />
            </div>
            <div className="text-xl font-semibold">NodeJs</div>
            <div>
              <PiStarFourFill />
            </div>
            <div className="text-xl font-semibold">SQL</div>
          </div>
        </div>
      </div>

      <div className="mx-4 max-w-5xl md:mx-auto">
        <h3 className="text-2xl font-semibold">Projects</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            image="/projects/arkon.jpeg"
            title="Arkon - Artis Konektor"
            description="Platform to connect with local artists"
            year="2023"
            stack="NextJs | Tailwind Css | Supabase"
            source="https://github.com/toufiqnuur/arkon"
            url="https://arkon.vercel.app"
          />
          <ProjectCard
            image="/projects/sev.jpeg"
            title="Sev - URL Shortener"
            description="URL made simple"
            year="2023"
            stack="NextJs | Chakra UI | Supabase"
            source="https://github.com/toufiqnuur/sev.my.id"
            url="https://sev.my.id"
          />
          <ProjectCard
            image="/projects/skanesga.jpeg"
            title="Skanesga - Landing Page"
            description="SMKN 1 Seyegan Landing Page (not official)"
            year="2021"
            stack="SvelteKit | TailwindCss"
            source="https://github.com/toufiqnuur/skanesga"
            url="https://skanesga.vercel.app"
          />
        </div>
      </div>

      <div className="mx-6 max-w-5xl md:mx-auto" id="contacts">
        <div className="mt-4 items-center justify-center gap-6 py-2 md:flex">
          <Image src="/contacts.png" width={200} height={200} alt="" />
          <div className="mt-2 md:mt-0">
            <h3 className="text-2xl font-semibold">Get in touch</h3>
            <div className="mt-6 flex space-x-2">
              <BsGithub size={20} />
              <a href="https://github.com/toufiqnuur">toufiqnuur</a>
            </div>
            <div className="mt-4 flex space-x-2">
              <BsLinkedin size={20} />
              <a href="https://www.linkedin.com/in/toufiqnuur/">toufiqnuur</a>
            </div>
            <div className="mt-4 flex space-x-2">
              <BsFillEnvelopeFill size={20} />
              <a href="mailto:toufiq.nuur@gmail.com">toufiq.nuur@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-zinc-100">
        <div className="mx-6 max-w-5xl py-4 md:mx-auto">
          <div className="font-medium text-zinc-500">
            &copy;2023, Toufiq Nuur Rahman
          </div>
        </div>
      </footer>
    </div>
  );
}
