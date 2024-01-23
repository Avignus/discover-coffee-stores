import React, { ChangeEvent } from "react"

interface TextInputProps {
    id: string
    name: string
    type?: string
    value?: string | number
    placeholder?: string
    isInvalid?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
} // Set this variable dynamically based on your logic

const TextInput: React.FC<TextInputProps> = ({
    id,
    name,
    value,
    placeholder = "",
    onChange,
    type = "text",
}) => {
    const inputClassName =
        'appearance-none rounded-none relative block w-full px-3 py-2 border ${"border-gray-300"} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'

    return (
        <input
            id={id}
            name={name}
            type={type}
            autoComplete="off"
            required
            className={inputClassName}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default TextInput
