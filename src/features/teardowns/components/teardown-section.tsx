import { Link } from '@tanstack/react-router'
import { teardowns } from '~/features/contents/lib/content'
import TeardownItem from './teardown-item'

type TeardownsProps = {
	limit?: number
}

export default function Teardowns({ limit = 5 }: TeardownsProps) {
	const items = teardowns.slice(0, limit)

	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-3xl font-bold md:text-4xl">Waffling</h3>
					<p className="lg:text-lg font-medium text-zinc-400">Teardowns</p>
				</div>
				<Link to="/teardowns" className="flex items-center gap-2">
					View all teardowns <span className="icon-[carbon--arrow-right]" />
				</Link>
			</div>

			<div className="mt-6 space-y-2">
				{items.map((item) => (
					<TeardownItem
						key={item._meta.path}
						title={item.title}
						description={item.description}
						slug={item._meta.path}
					/>
				))}
			</div>
		</>
	)
}
