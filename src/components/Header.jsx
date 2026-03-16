import { supabase } from "../supabase"

const Header = ({ user, onLoginClick }) => {
  return (
    <nav className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 sticky top-0 z-10 flex justify-between items-center">
      <h1 className="text-xl font-bold text-slate-900 tracking-tight">Addis stay Admin</h1>
      {user ? (
        <button
          onClick={() => supabase.auth.signOut()}
          className="px-4 py-2 border-2 border-black font-bold text-xs uppercase tracking-tight hover:bg-slate-100 transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={onLoginClick}
          className="px-4 py-2 border-2 border-black font-bold text-xs uppercase tracking-tight hover:bg-slate-100 transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          Management Login
        </button>
      )}
    </nav>
  )
}

export default Header
