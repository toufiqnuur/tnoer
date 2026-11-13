import { Outlet, createRootRoute } from '@tanstack/react-router'
import { HeadContent, Scripts } from '@tanstack/react-router'
import Header from '~/components/header'
import Footer from '~/components/footer'
import '~/global.css'

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				name: 'description',
				content: "Hi, I'm Toufiq, a passionate Frontend Developer."
			}
		],
		links: [{ rel: 'icon', href: '/favicon.svg' }],
		scripts: [
			{
				children:
					"(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()"
			}
		]
	}),
	component: RootComponent
})

function RootComponent() {
	return (
		<html lang="en" data-theme="light" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<Header />
				<Outlet />
				<Footer />
				<Scripts />
			</body>
		</html>
	)
}
