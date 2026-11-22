import { createFileRoute } from '@tanstack/react-router'
import Hero from '~/components/hero'
import Contact from '~/components/contact'
import Posts from '~/features/posts/components/posts-section'
import Projects from '~/features/projects/components/project-section'
import ParticleWaveform from '~/components/particle-waveform'
import Teardowns from '~/features/teardowns/components/teardown-section'

export const Route = createFileRoute('/')({
	component: Index
})

function Index() {
	return (
		<main className="space-y-8 pb-8 md:space-y-12">
			<Hero />
			<Projects />
			<div className="relative overflow-x-clip">
				<div className="container relative py-8 grid md:grid-cols-2 gap-24 md:gap-8">
					<ParticleWaveform className="inset-x-[-15%] -inset-y-12 opacity-70 dark:opacity-80" />
					<div className="relative z-10">
						<Posts />
					</div>
					<div className="relative z-10">
						<Teardowns />
					</div>
				</div>
			</div>
			<Contact />
		</main>
	)
}
