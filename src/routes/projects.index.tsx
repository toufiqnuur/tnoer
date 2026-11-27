import { createFileRoute } from '@tanstack/react-router'
import ProjectPage from '~/features/projects/components/project-page'

export const Route = createFileRoute('/projects/')({
	component: ProjectPage
})
