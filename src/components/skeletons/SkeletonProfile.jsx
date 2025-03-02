import React from 'react';

function SkeletonProfile() {
    return (
        <div className="flex flex-col w-full mx-auto md:w-96">
            <h1 className="text-opacity-0 heading" role="none">Edit Profile</h1>

            <div className="flex flex-col gap-2 mb-4 animate-pulse">
                <label className="w-full bg-gray-300 rounded opacity-0 required" role="none">Name</label>
                <input className="bg-gray-300 rounded form-input" role="none" disabled />
            </div>

            <div className="flex flex-col gap-2 mb-4 animate-pulse">
                <label className="w-full bg-gray-300 rounded opacity-0 required" role="none">Email</label>
                <input className="bg-gray-300 rounded form-input" role="none" disabled />
            </div>

            <div className="border-t h-[1px] my-6"></div>

            <div className="flex flex-col gap-2 mb-4 animate-pulse">
                <button className="text-opacity-0 bg-gray-300 rounded btn btn-primary hover:bg-gray-300" role="none" disabled>Update Profile</button>
            </div>
        </div>
    );
}

export default SkeletonProfile;