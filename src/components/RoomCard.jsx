import React from 'react';
// we included isAdmin cause we needed to filter the room to show the neccery informations to the naccecery person
const RoomCard = ({ room, removeRoom, toggleRoomStatus, isAdmin }) => {
    return (
        <div
            key={room.id}
            className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            {/* Delete Button (Subtle Hover) */}
            {/* we added isAdmin here becuse we needed to filter the delete button to be shown only to the admin so we're basically checkeing if the person is the admin is not no delete button */}
            {isAdmin && (
                <button
                    onClick={() => removeRoom(room.id)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-100 text-slate-300 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm z-10"
                    title="Delete Room"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            )}

            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">{room.name}</h2>
                {room.is_booked ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                        Occupied
                    </span>
                ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Available
                    </span>
                )}
            </div>

            <div className="mt-6 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900">{room.price}</span>
                <span className="text-sm font-semibold text-slate-400">ETB</span>
            </div>
            {/* same here as well as the delete button to filter the check in/out */}
            {isAdmin && (
                <div className="mt-6 pt-6 border-t border-slate-50">
                    <button
                        onClick={() => toggleRoomStatus(room.id, room.is_booked)}
                        className={`w-full py-3 px-4 text-white text-sm font-bold rounded-xl transition-all duration-300 ${room.is_booked
                            ? "bg-slate-600 hover:bg-slate-700 shadow-inner"
                            : "bg-slate-900 hover:bg-slate-800 shadow-md"
                            }`}
                    >
                        {room.is_booked ? "Check Out" : "Check In"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoomCard;
