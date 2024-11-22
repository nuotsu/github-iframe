import clsx from 'clsx'

export default function Input({
	icon: Icon,
	title,
	label,
	className,
	children,
	...props
}: {
	icon: React.ElementType
	label?: string
} & React.ComponentProps<'input'>) {
	return (
		<label
			className={clsx('with-icon group/input cursor-pointer', className)}
			title={title}
		>
			<Icon className="group-has-[[required]:invalid]/input:text-red-500" />

			{label && <span>{label}</span>}

			{children || (
				<input
					className="input w-full grow"
					type="text"
					title={title}
					placeholder={title}
					{...props}
				/>
			)}
		</label>
	)
}
