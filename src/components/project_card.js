import Image from "next/image";

export default function ProjectCard({
  image,
  year,
  title,
  description,
  stack,
  source,
  url,
}) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-black">
      <div className="relative aspect-video bg-zinc-100">
        <Image src={image} fill alt="" />
        <div className="absolute -bottom-4 right-4 rounded-lg border-2 border-black bg-yellow-300 px-4 py-2 text-sm font-semibold">
          {year}
        </div>
      </div>
      <div className="p-4">
        <h5 className="text-lg font-semibold">{title}</h5>
        <p className="text-sm text-zinc-600">{description}</p>
        <p className="mt-1 text-sm font-medium">{stack}</p>
        <div className="mt-2 flex justify-end gap-4">
          <a className="font-semibold text-blue-600" href={source}>
            Source Code
          </a>
          <a className="font-semibold text-blue-600" href={url}>
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}
