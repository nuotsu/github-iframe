import type { ComponentProps } from 'react'

export default function Input({
	icon: Icon,
	...props
}: { icon: React.ElementType } & ComponentProps<'input'>) {
	return (
		<label className="with-icon cursor-pointer">
			<Icon />
			<input type="text" {...props} />
		</label>
	)
}
