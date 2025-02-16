import { useProfile } from "@/hooks/useProfile";
import ValidationError from "@/components/ValidationError";
import IconSpinner from "@/components/IconSpinner";
import SkeletonProfile from "@/components/skeletons/SkeletonProfile";
import "@/assets/main.css";

function EditProfile() {
    const [profile, updateProfile] = useProfile();

    async function handleSubmit(event) {
        event.preventDefault();
        await updateProfile(profile.data);
    }

    if (Object.keys(profile.data).length === 0) {
        return <SkeletonProfile />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">Edit Profile</h1>

                {profile.status && (
                    <div className="mb-4 alert alert-success" role="alert">
                        {profile.status}
                    </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name" className="required">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={profile.data?.name || ''}
                        onChange={(event) => profile.setData({ ...profile.data, name: event.target.value })}
                        className="form-input"
                        autoComplete="name"
                        disabled={profile.loading}
                    />
                    <ValidationError errors={profile.errors} field="name" />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email" className="required">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.data?.email || ''}
                        onChange={(event) => profile.setData({ ...profile.data, email: event.target.value })}
                        className="form-input"
                        autoComplete="email"
                        disabled={profile.loading}
                    />
                    <ValidationError errors={profile.errors} field="email" />
                </div>

                <div className="border-t h-[1px] my-6"></div>

                <div className="flex flex-col gap-2 mb-4">
                    <button type="submit" className="btn btn-primary" disabled={profile.loading}>
                        {profile.loading && <IconSpinner />}
                        Update Profile
                    </button>
                </div>
            </div>
        </form>
    );
}

export default EditProfile;