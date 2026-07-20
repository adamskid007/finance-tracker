function Input({
    label,
    ...props
}) {
    return (
        <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
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
            />

        </div>
    );
}

export default Input;