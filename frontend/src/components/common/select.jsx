function Select({
    label,
    children,
    ...props
}) {
    return (
        <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
                {label}
            </label>

            <select
                className="
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    px-3
                    py-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                "
                {...props}
            >
                {children}
            </select>

        </div>
    );
}

export default Select;