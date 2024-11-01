'use client'

import { store, type Theme } from '@/lib/store'
import Input from '@/ui/Input'
import { debounce } from '@/lib/utils'
import {
	VscSettings,
	VscFileCode,
	VscRepo,
	VscSymbolColor,
} from 'react-icons/vsc'
import { bundledThemes } from 'shiki'
import Checkbox from '@/ui/Checkbox'

export default function Options() {
	const {
		repo,
		path,
		theme,
		lineNums,
		setRepo,
		setPath,
		setTheme,
		setLineNums,
	} = store()

	return (
		<fieldset className="border p-2">
			<legend className="with-icon">
				<VscSettings /> Options
			</legend>

			<div className="grid gap-x-4 gap-y-2 md:grid-cols-2">
				<Input
					title="owner/repo"
					icon={VscRepo}
					defaultValue={repo}
					onChange={debounce((e) => setRepo(e.target.value))}
					pattern=".+/.+"
				/>

				<Input
					title="path/to/file"
					icon={VscFileCode}
					defaultValue={path}
					onChange={debounce((e) => setPath(e.target.value))}
				/>

				<Input icon={VscSymbolColor}>
					<select
						title="Theme"
						className="input w-full"
						defaultValue={theme}
						onChange={(e) => setTheme(e.target.value as Theme)}
					>
						<option disabled>Select a theme</option>
						{Object.entries(bundledThemes).map(([theme]) => (
							<option key={theme}>{theme}</option>
						))}
					</select>
				</Input>

				<Checkbox
					label="Show line numbers"
					defaultChecked={lineNums}
					onChange={(e) => setLineNums(e.target.checked)}
				/>
			</div>
		</fieldset>
	)
}
