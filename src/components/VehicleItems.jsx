function VehicleItems({ vehicles }) {
    return (
        <div className="flex flex-col gap-2">
            {vehicles?.length > 0 &&
                vehicles.map((vehicle) => {
                    return (
                        <div
                            key={vehicle.id}
                            className="flex justify-between w-full p-2 bg-gray-100"
                        >
                            <div className="flex items-center w-full overflow-hidden">
                                <div className="text-xl plate">{vehicle.plate_number}</div>
                            </div>
                            <div className="flex gap-1">
                                <button type="button" className="text-sm btn btn-secondary">
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="text-sm text-white bg-red-600 btn hover:bg-red-500"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default VehicleItems;