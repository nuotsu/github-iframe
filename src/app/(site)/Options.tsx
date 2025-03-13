'use client'

import { useState, useEffect } from 'react'
import { store, DISPLAYS, type Theme, type Display } from '@/lib/store'
import Input from '@/ui/Input'
import { debounce } from '@/lib/utils'
import {
  VscSettings,
  VscFileCode,
  VscRepo,
  VscSymbolColor,
  VscEye,
  VscEyeClosed,
  VscPaintcan,
  VscCode,
  VscListSelection,
  VscListOrdered,
  VscLock,
  VscUnlock,
} from 'react-icons/vsc'
import { bundledThemes } from 'shiki'
import Checkbox from '@/ui/Checkbox'

export default function Options() {
  const {
    repo,
    path,
    theme,
    lang,
    display,
    lineNums,
    highlight,
    scrollTo,
    setRepo,
    setPath,
    setTheme,
    setLang,
    setDisplay,
    setLineNums,
    setHighlight,
    setScrollTo,
  } = store()

  const ext = path?.split('.').at(-1) ?? ''

  // State for private repo access
  const [accountType, setAccountType] = useState<'users' | 'orgs'>('users')
  const [token, setToken] = useState<string>('')
  const [showTokenInput, setShowTokenInput] = useState<boolean>(false)
  const [showToken, setShowToken] = useState<boolean>(false)

  // Split repo into owner and repoName
  const [owner, repoName] = repo ? repo.split('/') : ['', '']

  // Debounced function to fetch private repo data
  const fetchPrivateRepo = debounce((tokenValue: string) => {
    if (tokenValue && owner && repoName) {
      console.log('Fetching private repo with:', { owner, repoName, accountType, token: tokenValue })
      // Future: Implement API call to fetch private repo data here
    }
  }, 500)

  // Automatically fetch when token changes
  useEffect(() => {
    if (showTokenInput && token) {
      fetchPrivateRepo(token)
    }
  }, [token, showTokenInput, owner, repoName, accountType])

  return (
    <fieldset className="border border-neutral-300 p-2">
      <legend className="with-icon">
        <VscSettings /> Options
      </legend>

      <div className="grid gap-x-4 gap-y-2 md:grid-cols-2">
        {/* Existing Repo Input */}
        <Input
          title="Repo owner/repo"
          icon={VscRepo}
          defaultValue={repo}
          onChange={debounce((e) => setRepo(e.target.value))}
          pattern=".+/.+"
          required
        />

        <Input
          title="Path to file"
          icon={VscFileCode}
          defaultValue={path}
          onChange={debounce((e) => setPath(e.target.value))}
          className="group-[:has(.view-file-source:hover)_input]/root:border-black/30"
          required
        />

        {/* Private Repo Options */}
        <div className="col-span-2 space-y-2">
          <div className="flex items-center gap-4">
            <label className="flex items-center text-sm text-neutral-500">
              <input
                type="radio"
                name="accountType"
                value="users"
                checked={accountType === 'users'}
                onChange={() => setAccountType('users')}
                className="mr-1"
              />
              User
            </label>
            <label className="flex items-center text-sm text-neutral-500">
              <input
                type="radio"
                name="accountType"
                value="orgs"
                checked={accountType === 'orgs'}
                onChange={() => setAccountType('orgs')}
                className="mr-1"
              />
              Org
            </label>
          </div>

          <button
            type="button"
            onClick={() => setShowTokenInput(!showTokenInput)}
            className="w-fit border border-neutral-300 px-3 py-1 rounded-md bg-white text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-2 text-sm"
          >
            {showTokenInput ? <VscUnlock /> : <VscLock />}
            {showTokenInput ? 'Not Private' : 'Private Repo?'}
          </button>

          {showTokenInput && (
            <div className="space-y-2">
              <Input
                title="Personal Access Token"
                icon={showToken ? VscEye : VscEyeClosed}
                value={token}
                onChange={(e) => setToken(e.target.value)} // No debounce here, handled by useEffect
                type={showToken ? 'text' : 'password'}
                placeholder="ghp_xxxxxxxxxxxxxxxx"
              />
              <span
                onClick={() => setShowToken(!showToken)}
                className="text-sm text-blue-500 cursor-pointer hover:underline"
              >
                {showToken ? 'Hide token' : 'Show token'}
              </span>
              <p className="text-xs text-neutral-500">
                Use a token with <code>repo</code> scope from{' '}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub Settings
                </a>. Fetches automatically as you type.
              </p>
            </div>
          )}
        </div>

        {/* Remaining Existing Inputs */}
        <Input icon={VscSymbolColor}>
          <select
            title="Theme"
            className="input w-full"
            defaultValue={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            <option disabled>Select a theme</option>
            {Object.entries(bundledThemes).map(([option]) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Input>

        <Input
          label="Language"
          icon={VscCode}
          defaultValue={lang}
          onChange={debounce((e) => setLang(e.target.value))}
          placeholder={ext}
        />

        <Input
          label="Display"
          icon={display === 'none' ? VscEyeClosed : VscEye}
        >
          <select
            className="input w-full"
            defaultValue={display}
            onChange={(e) => setDisplay(e.target.value as Display)}
          >
            {DISPLAYS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Input>

        <Checkbox
          label={`${lineNums ? 'Hide' : 'Show'} line numbers`}
          onIcon={VscListOrdered}
          offIcon={VscListSelection}
          defaultChecked={lineNums}
          reverseChecked
          onChange={(e) => setLineNums(e.target.checked)}
        />

        <Input
          label="Highlight"
          title="Lines to highlight"
          icon={VscPaintcan}
          defaultValue={highlight}
          onChange={debounce((e) => setHighlight(e.target.value))}
          pattern="((\d+|\d+-\d+),)*(\d+|\d+-\d+)"
          placeholder="lines (e.g. 5,14-19)"
        />

        {highlight && (
          <Checkbox
            className="anim-fade-to-r"
            label="Scroll to highlighted line"
            defaultChecked={scrollTo}
            onChange={(e) => setScrollTo(e.target.checked)}
          />
        )}
      </div>
    </fieldset>
  )
}