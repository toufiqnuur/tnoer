import { createFileRoute } from '@tanstack/react-router'

const gear = [
	{
		type: 'Laptop',
		name: 'Acer Nitro V ANV15 51',
		description:
			'My reliable daily driver, its Intel 13th gen i5 and 16GB of RAM easily power all my development tasks.'
	},
	{
		type: 'Keyboard',
		name: 'Royal Kludge RK G68',
		description:
			'This 65% mechanical keyboard gives me essential arrow keys in a compact, desk-saving layout.'
	},
	{
		type: 'Mouse',
		name: 'Fantech WG12R Raigor III',
		description: 'It has a dual-mode connection and a rechargeable battery that lasts so long.'
	},
	{
		type: 'Monitor',
		name: 'Samsung 24" S24R35xFZ',
		description:
			"It's not the best, but it's perfect for my workflow, giving me extra workspace and handling entertainment just fine."
	},
	{
		type: 'Speaker',
		name: 'Philips SPA 20',
		description:
			"An affordable, high-value speaker that's a huge upgrade on laptop audio, offering clear sound and a dual-mode connection"
	}
]

const software = [
	{ icon: 'neovim.png', type: 'Code Editor', name: 'Neovim' },
	{ icon: 'alacritty.png', type: 'Terminal Emulator', name: 'Alacritty' },
	{ icon: 'yaak.png', type: 'API Client', name: 'Yaak' },
	{ icon: 'tableplus.png', type: 'DB Client', name: 'Table Plus' }
]

export const Route = createFileRoute('/uses')({
	component: Uses
})

function Uses() {
	return (
		<main className="space-y-8 pb-8 md:space-y-12">
			<div className="container py-8">
				<h3 className="text-3xl font-bold md:text-4xl">My Daily Uses</h3>
				<p className="mt-1.5 font-medium text-zinc-600 dark:text-zinc-300">
					A list of the gear I use for my professional work.
				</p>
				<div className="mt-12 rounded-4xl border border-white/50 bg-white/10 p-4 shadow backdrop-blur-2xl md:p-8 dark:border-white/10 dark:bg-white/5">
					<div className="flex gap-2">
						<span className="block h-4 w-4 rounded-full border border-zinc-200 bg-zinc-50 shadow-xs dark:border-zinc-700 dark:bg-zinc-800" />
						<span className="block h-4 w-4 rounded-full border border-zinc-200 bg-zinc-50 shadow-xs dark:border-zinc-700 dark:bg-zinc-800" />
						<span className="block h-4 w-4 rounded-full border border-zinc-200 bg-zinc-50 shadow-xs dark:border-zinc-700 dark:bg-zinc-800" />
					</div>
					<img
						src="/assets/img/workspace.jpg"
						width={1200}
						height={800}
						className="mt-4 rounded-2xl"
						alt="Uses"
						loading="lazy"
						sizes="(min-width: 1024px) 1024px, 100vw"
					/>
				</div>

				<div className="mt-12 gap-8 md:mt-36 md:flex">
					<div className="h-fit shrink-0 md:w-72">
						<h2 className="text-2xl font-bold md:text-3xl">Workstation</h2>
					</div>
					<div className="space-y-8 max-md:mt-8">
						{gear.map((item) => (
							<div key={item.type} className="flex flex-col">
								<span className="font-semibold text-zinc-700 dark:text-zinc-400">{item.type}</span>
								<span className="mt-0.5 text-lg font-bold text-zinc-600 dark:text-zinc-300">
									{item.name}
								</span>
								<p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="mt-36 gap-8 md:flex">
					<div className="h-fit shrink-0 md:w-72">
						<h2 className="text-2xl font-bold md:text-3xl">Applications</h2>
						<p className="mt-4 font-medium text-zinc-600 dark:text-zinc-300">
							I almost always choose native applications, prioritizing their speed and lightweight
							performance.
						</p>
					</div>
					<div className="grid w-full gap-8 max-md:mt-8 md:grid-cols-2">
						{software.map((item) => (
							<div key={item.type} className="flex items-center gap-4">
								<div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-clip rounded-3xl bg-zinc-100 dark:bg-zinc-100/10">
									<img
										src={`/assets/img/${item.icon}`}
										width={64}
										height={64}
										alt={item.name}
										sizes="64px"
									/>
								</div>
								<div className="flex flex-col">
									<span className="font-semibold">{item.type}</span>
									<span className="text-zinc-500 dark:text-zinc-400">{item.name}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="mt-12 text-sm font-medium text-zinc-500 dark:text-zinc-400">
					* Please note: All items listed are my personal preference and are not paid endorsements.
				</div>
			</div>
		</main>
	)
}
