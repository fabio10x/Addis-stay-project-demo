import { supabase } from "./supabase"
import { useEffect } from "react"
import { useState } from "react"
import AddRoomForm from "./components/AddRoomForm"
import AuthForm from "./components/AuthForm"
import Header from "./components/Header"
import RoomList from "./components/RoomList"


function App() {

  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  // we did this because we want to show the form only when the admin turns true and not to the users
  const [showAuth, setShowAuth] = useState(false);

  async function handleSignUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) alert(error.message);
    else alert("Check your email for confirmation link!");
  }

  async function handleSignIn(email, password) {
    const { data, error } = await
      supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  useEffect(() => {


    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });


    getRooms();
    return () => subscription.unsubscribe();
  }, []);

  async function getRooms() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('*');

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    } finally {
      setLoading(false);
    }
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
      <div className="p-4 text-center border-b border-slate-200">
        {user ? (
          <span className="text-sm font-bold text-green-600">
            Manager Mode: You can edit inventory
          </span>
        ) : (
          <span className="text-sm font-bold text-slate-400">
            Guest Mode: View availability only
          </span>
        )}
      </div>

      <Header user={user} onLoginClick={() => setShowAuth(!showAuth)} />

      {showAuth && !user && (
        <div className="max-w-md mx-auto mt-8">
          <AuthForm onSignIn={handleSignIn} onSignUp={handleSignUp} />
        </div>
      )}

      <main className="max-w-7xl mx-auto py-10 px-6 md:px-12">
        {/* we wrote the user && because we want the form to be shown only for the manager(admin) not the user  */}
        {user && <AddRoomForm addRoom={addRoom} adding={adding} />}

        <RoomList
          rooms={rooms}
          loading={loading}
          removeRoom={removeRoom}
          toggleRoomStatus={toggleRoomStatus}
          isAdmin={user ? true : false}
        />
      </main>
    </div>
  )
}

export default App
