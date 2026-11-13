import { Link } from '@tanstack/react-router'

const currentYear = new Date().getFullYear()

const socialLinks = [
	{
		name: 'Gmail',
		url: 'mailto:toufiq.nuur@gmail.com'
	},
	{
		name: 'GitHub',
		url: 'https://github.com/toufiqnuur'
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/toufiqnuur/'
	}
]

const siteLinks = [
	{
		name: 'Home',
		url: '/'
	},
	{
		name: 'Projects',
		url: '/projects'
	},
	{
		name: 'Uses',
		url: '/uses'
	},
	{
		name: 'About',
		url: '/about'
	}
]

const otherLinks = [
	{
		name: 'Blog',
		url: 'https://tdots.pages.dev',
		external: true
	},
	{
		name: 'Guest Book',
		url: '/guestbook',
		external: false
	},
	{
		name: 'Support Me',
		url: '/support-me',
		external: false
	}
]

export default function Footer() {
	return (
		<footer className="mt-12 bg-zinc-100 dark:bg-zinc-950/25">
			<div className="container">
				<div className="flex flex-col gap-8 py-8 md:flex-row md:items-center md:gap-32">
					<div>
						<div className="text-3xl font-bold">光</div>
						<div className="mt-4 text-xl font-semibold">Toufiq Nuur Rahman.</div>
						<div className="mt-4 max-w-48 font-medium opacity-75">
							Sleman, Special Region of Yogyakarta, Indonesia
						</div>
					</div>
					<div className="grid grid-cols-2 gap-8 md:flex-1 md:grid-cols-3 md:gap-16">
						<div>
							<div className="font-semibold">Navigation</div>
							<ul className="mt-2 flex flex-col">
								{siteLinks.map((site) => (
									<li key={site.name}>
										<Link className="text-sm font-medium opacity-75" to={site.url}>
											{site.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<div className="font-semibold">Others</div>
							<ul className="mt-2 flex flex-col">
								{otherLinks.map((item) =>
									item.external ? (
										<li key={item.name}>
											<a
												className="text-sm font-medium opacity-75"
												href={item.url}
												target="_blank"
												rel="noreferrer"
											>
												{item.name}
											</a>
										</li>
									) : (
										<li key={item.name}>
											<Link className="text-sm font-medium opacity-75" to={item.url}>
												{item.name}
											</Link>
										</li>
									)
								)}
							</ul>
						</div>

						<div>
							<div className="font-semibold">Social</div>
							<ul className="mt-2 flex flex-col">
								{socialLinks.map((social) => (
									<li key={social.name}>
										<a
											className="text-sm font-medium opacity-75"
											href={social.url}
											target="_blank"
											rel="noreferrer"
										>
											{social.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="border-t-2 border-zinc-200 py-4 text-sm font-medium opacity-75 dark:border-white/10">
					&copy; 2023 - {currentYear} Toufiq. All rights reserved.
				</div>
			</div>
		</footer>
	)
}
