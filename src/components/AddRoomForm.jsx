import React, { useState } from 'react';

const AddRoomForm = ({ addRoom, adding }) => {
    const [newRoomName, setNewRoomName] = useState("");
    const [newRoomPrice, setNewRoomPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newRoomName || !newRoomPrice) return;

        const success = await addRoom(newRoomName, newRoomPrice);
        if (success) {
            setNewRoomName("");
            setNewRoomPrice("");
        }
    };

    return (
        <section className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Add New Room</h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Room Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Deluxe Suite"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                            required
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price (ETB)</label>
                        <input
                            type="number"
                            placeholder="e.g. 1500"
                            value={newRoomPrice}
                            onChange={(e) => setNewRoomPrice(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={adding}
                        className="w-full md:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {adding ? "Adding..." : "Add Room"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddRoomForm;
