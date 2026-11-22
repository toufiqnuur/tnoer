import { createFileRoute } from '@tanstack/react-router'
import PostsPage from '~/features/posts/components/posts-page'

export const Route = createFileRoute('/posts/')({
	component: PostsPage
})
