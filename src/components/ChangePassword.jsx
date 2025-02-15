import ValidationError from "@/components/ValidationError";
import IconSpinner from "@/components/IconSpinner";
import { usePassword } from "@/hooks/usePassword";

function ChangePassword() {
    const { 
        passwordFields, 
        setPasswordFields, 
        loading, 
        errors,
        successMessage, 
        updatePassword 
    } = usePassword();

    async function handleSubmit(event) {
        event.preventDefault();
        await updatePassword(passwordFields);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">Change Password</h1>

                {successMessage && (
                    <div className="mb-4 alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="current_password" className="required">Current Password</label>
                    <input
                        id="current_password"
                        name="current_password"
                        type="password"
                        value={passwordFields.current_password || ''}
                        onChange={(event) => setPasswordFields({ ...passwordFields, current_password: event.target.value })}
                        className="form-input"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="current_password" />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password" className="required">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={passwordFields.password || ''}
                        onChange={(event) => setPasswordFields({ ...passwordFields, password: event.target.value })}
                        className="form-input"
                        autoComplete="new-password"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="password" />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password_confirmation" className="required">Password</label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={passwordFields.password_confirmation || ''}
                        onChange={(event) => setPasswordFields({ ...passwordFields, password_confirmation: event.target.value })}
                        className="form-input"
                        autoComplete="new-password"
                        disabled={loading}
                    />
                </div>

                <div className="border-t h-[1px] my-6"></div>

                <div className="flex flex-col gap-2 mb-4">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <IconSpinner />}
                        Update Profile
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ChangePassword;