import type { ComponentProps } from 'react'

export default function Input({
	icon: Icon,
	title,
	children,
	...props
}: { icon: React.ElementType } & ComponentProps<'input'>) {
	return (
		<label className="with-icon group cursor-pointer">
			<Icon />

			{children || (
				<input
					className="input grow group-hover:border-black/30"
					type="text"
					title={title}
					placeholder={title}
					{...props}
				/>
			)}
		</label>
	)
}
