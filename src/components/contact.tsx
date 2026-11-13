const contactMethods = [
	{
		icon: 'icon-[formkit--email]',
		type: 'Email',
		name: 'toufiq.nuur',
		url: 'mailto:toufiq.nuur@gmail.com'
	},
	{
		icon: 'icon-[formkit--linkedin]',
		type: 'LinkedIn',
		name: 'toufiqnuur',
		url: 'https://www.linkedin.com/in/toufiqnuur/'
	},
	{
		icon: 'icon-[formkit--github]',
		type: 'GitHub',
		name: 'toufiqnuur',
		url: 'https://github.com/toufiqnuur'
	}
]

export default function Contact() {
	return (
		<div className="container py-8">
			<h3
				id="contacts"
				className="text-3xl font-bold text-zinc-700 md:text-center md:text-4xl dark:text-zinc-200"
			>
				Get in touch
			</h3>
			<div className="mt-12 grid gap-8 md:grid-cols-3">
				{contactMethods.map((item) => (
					<div key={item.type} className="flex items-center gap-4">
						<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border-r border-b border-sky-200 bg-linear-to-tl from-sky-100 to-transparent dark:border-zinc-700 dark:from-transparent dark:to-zinc-700">
							<span
								className={`${item.icon} bg-linear-to-tl from-sky-500 to-sky-300 text-3xl dark:from-sky-600 dark:to-sky-400`}
							/>
						</div>
						<div className="flex flex-col">
							<span className="font-medium">{item.type}</span>
							<a href={item.url} target="_blank" rel="noreferrer" className="text-zinc-400">
								{item.name}
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
