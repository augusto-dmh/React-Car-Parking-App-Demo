import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ValidationError from "@/components/ValidationError"
import IconSpinner from "@/components/IconSpinner"

function Login() {
    // i noticed that since there's no UI change that needs these state variables - such as in-live validation, there's no need for them to exist.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const { login, errors, loading } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        await login({ email, password, remember_me: rememberMe });

        setPassword("");
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">Login</h1>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email" className="required">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-input"
                        autoComplete="email"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="email" />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password" className="required">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-input"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="password" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 hover:cursor-pointer" htmlFor="remember">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            className="w-4 h-4"
                            checked={rememberMe}
                            onChange={() => setRememberMe((previous) => !previous)}
                            disabled={loading}
                        />
                        <span className="select-none">Remember me</span>
                    </label>
                </div>

                <div className="border-t h-[1px] my-6"></div>

                <button type="submit" className="w-full btn btn-primary" disabled={loading}>
                    {loading && <IconSpinner />}
                    Login
                </button>
            </div>
        </form>
    );
}

export default Login;
