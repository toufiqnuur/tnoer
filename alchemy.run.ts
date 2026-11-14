import * as Alchemy from 'alchemy'
import * as Cloudflare from '@alchemy.run/cloudflare'
import * as Effect from 'effect/Effect'
import * as GitHub from '@alchemy.run/github'
import * as Output from 'alchemy/Output'
import * as Layer from 'effect/Layer'

export const Website = (name: string) =>
	Cloudflare.Website.Vite('Website', {
		env: {},
		name
	})

export default Alchemy.Stack(
	'noure',
	{
		providers: Layer.mergeAll(Cloudflare.providers(), GitHub.providers()),
		state: Cloudflare.state()
	},
	Effect.gen(function* () {
		const stage = yield* Alchemy.Stage
		const webname = stage === 'prod' ? 'me' : `me-${stage}`
		const website = yield* Website(webname)

		if (process.env.PULL_REQUEST) {
			yield* GitHub.Comment('preview-comment', {
				owner: 'toufiqnuur',
				repository: 'tnoer',
				issueNumber: Number(process.env.PULL_REQUEST),
				body: Output.interpolate`
          ## Preview Deployed

          **URL:** ${website.url}

          Built from commit ${process.env.GITHUB_SHA?.slice(0, 7)}

          ---
          _This comment updates automatically with each push._
        `
			})
		}

		return { url: website.url }
	})
)
