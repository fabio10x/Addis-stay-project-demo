import RoomCard from "./RoomCard"

const RoomList = ({ rooms, loading, removeRoom, toggleRoomStatus, isAdmin }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-slate-200 mb-4"></div>
          <p className="text-slate-500 font-medium animate-bounce">Checking rooms....</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            removeRoom={removeRoom}
            toggleRoomStatus={toggleRoomStatus}
            // we passes is admin here to port it to room card as a props
            isAdmin={isAdmin}
          />
        ))
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-slate-400">No rooms found.</p>
        </div>
      )}
    </div>
  )
}

export default RoomList
