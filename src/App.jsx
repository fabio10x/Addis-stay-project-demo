import { supabase } from "./supabase"
import { useEffect } from "react"
import { useState } from "react"
import RoomCard from "./components/RoomCard"
import AddRoomForm from "./components/AddRoomForm"


function App() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getRooms();
  }, []);

  async function getRooms() {
    setLoading(true);
    const { data, error } = await supabase
      .from('rooms')
      .select('*');

    if (error) {
      console.log("Error fetching:", error.message);
    } else {
      setRooms(data || []);
    }
    setLoading(false);
  }

  async function addRoom(name, price) {
    setAdding(true);
    const { error } = await supabase
      .from('rooms')
      .insert([{ name, price: Number(price) }]);

    if (error) {
      console.log("Error adding room:", error.message);
      setAdding(false);
      return false;
    } else {
      await getRooms(); // Refresh grid
      setAdding(false);
      return true;
    }
  }

  async function removeRoom(id) {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);

    if (error) {
      console.log("Error deleting room:", error.message);
    } else {
      await getRooms(); // Refresh grid
    }
  }

  async function toggleRoomStatus(id, currentStatus) {
    const { error } = await supabase
      .from('rooms')
      .update({ is_booked: !currentStatus })
      .eq('id', id);

    if (error) {
      console.log('Error updating status:', error.message);
    } else {
      await getRooms();
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Addis stay Admin</h1>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-6 md:px-12">

        {/* Add Room Form Component */}
        <AddRoomForm addRoom={addRoom} adding={adding} />

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-slate-200 mb-4"></div>
              <p className="text-slate-500 font-medium animate-bounce">Checking rooms....</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  removeRoom={removeRoom}
                  toggleRoomStatus={toggleRoomStatus}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-400">No rooms found.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
