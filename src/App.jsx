import { supabase } from "./supabase"
import { useEffect } from "react"
import { useState } from "react"
import AddRoomForm from "./components/AddRoomForm"
import AuthForm from "./components/AuthForm"
import Header from "./components/Header"
import RoomList from "./components/RoomList"


function App() {

  const [user, setUser] = useState({ email: 'admin@addisstay.com' });

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

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {

    /*
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
    */

    getRooms();
    // return () => subscription.unsubscribe();
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


  if (!user) {
    return (
      <AuthForm
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="max-w-7xl mx-auto py-10 px-6 md:px-12">
        <AddRoomForm addRoom={addRoom} adding={adding} />

        <RoomList
          rooms={rooms}
          loading={loading}
          removeRoom={removeRoom}
          toggleRoomStatus={toggleRoomStatus}
        />
      </main>
    </div>
  )
}

export default App
