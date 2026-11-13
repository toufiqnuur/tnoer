interface ProjectData {
	icon: string
	image: string
	title: string
	year: string
	description: string
	stack: string[]
	source: string
	url: string
}

interface Props {
	data: ProjectData
}

export default function Project({ data }: Props) {
	const resolveAsset = (name: string) => `/assets/projects/${name}`

	return (
		<div className="flex flex-col overflow-hidden rounded-3xl border-3 border-white shadow-sm md:shadow-xl dark:border-white/10">
			<div className="relative aspect-16/10 border-b-3 border-white bg-zinc-100 dark:border-zinc-700">
				<img
					src={resolveAsset(data.image)}
					width={800}
					height={500}
					alt={data.title}
					className="dark:brightness-90"
					loading="lazy"
					sizes="(min-width: 768px) 50vw, 100vw"
				/>
				<div className="absolute -bottom-11 left-4 h-16 w-16 overflow-hidden rounded-3xl border-3 border-white bg-zinc-100 shadow-sm dark:border-zinc-700 dark:shadow-lg">
					<img
						src={resolveAsset(data.icon)}
						width={64}
						height={64}
						alt={data.title + ' icon'}
						loading="lazy"
						sizes="64px"
					/>
				</div>

				<div className="absolute right-4 -bottom-5.5 rounded-2xl border-2 border-sky-300 bg-linear-to-bl from-sky-400 to-sky-300 px-4 py-2 text-sm font-semibold text-sky-50 shadow-sm dark:border-sky-500 dark:from-sky-600 dark:to-sky-500">
					{data.year}
				</div>
			</div>
			<div className="flex flex-1 flex-col bg-linear-to-tl from-blue-50 from-50% to-white p-4 dark:from-zinc-900/75 dark:to-zinc-800/75">
				<div className="mt-8 flex-1">
					<h5 className="mt-1 text-lg font-semibold">{data.title}</h5>
					<p className="mt-3 text-sm font-medium text-zinc-600 md:text-base dark:text-zinc-400">
						{data.description}
					</p>
					<ul className="mt-2">
						{data.stack.map((t) => (
							<li
								key={t}
								className="mt-2 mr-2 inline-block rounded-lg border-t border-l border-blue-100 bg-linear-to-bl from-blue-200/50 to-white/10 px-2 py-1 text-xs font-medium text-sky-800 uppercase dark:border-zinc-900 dark:from-zinc-800/50 dark:to-zinc-900/10 dark:text-sky-600"
							>
								{t}
							</li>
						))}
					</ul>
				</div>
				<div className="mt-6 flex justify-end gap-2">
					<a
						className="rounded-xl border-r border-b border-blue-200 bg-linear-to-tl from-blue-50 to-white px-2.5 py-1 text-sm font-medium text-blue-500 shadow-md dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800 dark:text-blue-400"
						href={data.source}
						target="_blank"
						rel="noreferrer"
					>
						Source Code
					</a>
					<a
						className="rounded-xl border-r border-b border-blue-500 bg-linear-to-tl from-blue-500/90 to-blue-400/90 px-2.5 py-1 text-sm font-medium text-zinc-50 shadow-md dark:from-blue-600/90 dark:to-blue-500/90"
						href={data.url}
						target="_blank"
						rel="noreferrer"
					>
						Live View
					</a>
				</div>
			</div>
		</div>
	)
}
