import { Link } from '@tanstack/react-router'

type TeardownItemProps = {
	title: string
	description: string
	slug: string
}

export default function TeardownItem({ title, description, slug }: TeardownItemProps) {
	return (
		<div className="group relative">
			<Link to="/posts/$slug" params={{ slug }} className="block">
				<div className="flex items-center justify-between p-4 rounded-xl border dark:bg-zinc-500/10 backdrop-blur-xl border-white/10 ring-2 ring-zinc-700/5 drop-shadow-xl transition group-hover:inset-shadow-sm group-hover:inset-shadow-white/10 group-hover:scale-105 group-hover:z-10">
					<div className="min-w-0">
						<h5 className="font-semibold">{title}</h5>
						<p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 line-clamp-1">
							{description}
						</p>
					</div>
					<span className="icon-[andrsrxn--arrow-up-right] shrink-0 text-3xl not-group-hover:text-zinc-600" />
				</div>
			</Link>
		</div>
	)
}
