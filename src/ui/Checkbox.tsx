import { LiaToggleOnSolid, LiaToggleOffSolid } from 'react-icons/lia'
import clsx from 'clsx'
import type { IconType } from 'react-icons'

export default function Checkbox({
	label,
	reverseChecked,
	onIcon: OnIcon = LiaToggleOnSolid,
	offIcon: OffIcon = LiaToggleOffSolid,
	...props
}: {
	label: string
	onIcon?: IconType
	offIcon?: IconType
	reverseChecked?: boolean
} & React.ComponentProps<'input'>) {
	return (
		<label className="with-icon cursor-pointer">
			<input className="peer" type="checkbox" hidden {...props} />

			<OnIcon
				className={clsx(
					reverseChecked ? 'peer-checked:hidden' : 'hidden peer-checked:block',
				)}
			/>
			<OffIcon
				className={clsx(
					reverseChecked ? 'hidden peer-checked:block' : 'peer-checked:hidden',
				)}
			/>

			{label}
		</label>
	)
}
