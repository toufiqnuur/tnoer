import { createFileRoute } from '@tanstack/react-router'
import TeardownsPage from '~/features/teardowns/components/teardown-page'

export const Route = createFileRoute('/teardowns/')({
	component: TeardownsPage
})
