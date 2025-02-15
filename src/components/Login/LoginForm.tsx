import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/schemas";
import { useAuth } from "../../services/useUser";

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const { handleLogin, loading, error } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        await handleLogin(data.name, data.email);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mt-6">
                <input
                    type="text"
                    {...register("name")}
                    className="peer w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    placeholder="Full Name"
                />
                <label className="absolute -top-4 left-0 text-sm text-gray-800 opacity-75">
                    Full Name
                </label>
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="relative mt-6">
                <input
                    type="email"
                    {...register("email")}
                    className="peer w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    placeholder="Email Address"
                />
                <label className="absolute -top-4 left-0 text-sm text-gray-800 opacity-75">
                    Email Address
                </label>
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <div className="mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none cursor-pointer"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </div>
        </form>
    );
};