import type { ComponentProps } from 'react'

export default function Input({
	icon: Icon,
	title,
	...props
}: { icon: React.ElementType } & ComponentProps<'input'>) {
	return (
		<label className="with-icon group cursor-pointer">
			<Icon />
			<input
				className="grow border-b outline-none invalid:!border-red-500 focus:border-current group-hover:border-black/30"
				type="text"
				title={title}
				placeholder={title}
				{...props}
			/>
		</label>
	)
}
