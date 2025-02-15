import { AuthCardProps } from "../../utils/types"

export const AuthCard: React.FC<AuthCardProps> = ({ children, title, desc }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
                        <p className="mt-2 text-gray-500">{desc}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
