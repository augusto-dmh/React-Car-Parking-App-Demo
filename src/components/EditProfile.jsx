import { useState } from "react";
import useProfile from "@/hooks/useProfile";
import ValidationError from "@/components/ValidationError"
import IconSpinner from "@/components/IconSpinner"

function EditProfile() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const { errors, loading, successMessage, editProfile } = useProfile();

    async function handleSubmit(event) {
        event.preventDefault();

        editProfile({ name, email });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">Edit Profile</h1>
                { successMessage &&
                    <div className="mb-4 alert alert-success" role="alert">
                        <p>{ successMessage }</p>
                    </div>
                }

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name" className="required">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-input"
                        autoComplete="name"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="name" />
                </div>

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

                <div className="border-t h-[1px] my-6"></div>

                <button type="submit" className="w-full btn btn-primary" disabled={loading}>
                    {loading && <IconSpinner />}
                    Update Profile
                </button>
            </div>
        </form>
    );
}

export default EditProfile;
