import { DOMAIN } from '@/lib/store'

export default function Error() {
	return (
		<figure className="grid h-svh w-svw place-content-center gap-3 bg-white text-center font-mono">
			<img
				className="w-[250px]"
				src="https://media.giphy.com/media/KSKvdT1YGCpUIonvSq/giphy.gif?cid=790b7611ju2wj33qj50w7u3czq0kl1v3se763hjo4crfwl12&ep=v1_gifs_search&rid=giphy.gif&ct=g"
				width={480}
				height={400}
				loading="eager"
				alt='Michael Scott saying "I tried."'
				draggable={false}
			/>

			<figcaption className="text-sm">Error loading the code...</figcaption>

			<a className="text-xs underline" href={DOMAIN} target="_blank">
				Try again
			</a>
		</figure>
	)
}
