import { DOMAIN } from '@/lib/store'

export default function Error() {
	return (
		<figure
			data-not-found
			className="grid h-svh w-svw place-content-center gap-3 text-center font-mono"
		>
			<img
				className="m-auto w-[60px]"
				src="https://github.githubassets.com/assets/mona-loading-dark-7701a7b97370.gif"
				width={384}
				height={384}
				loading="eager"
				alt="Mona loading..."
				draggable={false}
			/>

			<figcaption className="text-sm">Error loading the code...</figcaption>

			<a className="text-xs underline" href={DOMAIN} target="_blank">
				Try again
			</a>
		</figure>
	)
}
