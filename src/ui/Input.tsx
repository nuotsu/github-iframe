import clsx from 'clsx'

export default function Input({
	icon: Icon,
	title,
	className,
	children,
	...props
}: { icon: React.ElementType } & React.ComponentProps<'input'>) {
	return (
		<label
			className={clsx('with-icon group cursor-pointer', className)}
			title={title}
		>
			<Icon />

			{children || (
				<input
					className="input grow"
					type="text"
					title={title}
					placeholder={title}
					{...props}
				/>
			)}
		</label>
	)
}
