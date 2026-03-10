import { useState } from 'react';

const AuthForm = ({ onSignIn, onSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e, action) => {
        e.preventDefault();
        const cleanEmail = email.trim();

        console.log(`Action: ${action} | sending:`, cleanEmail);
        if (action === 'signin') {
            onSignIn(cleanEmail, password);
        } else {
            onSignUp(cleanEmail, password);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-8 md:p-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-tight">
                    Management <br /> Access Only
                </h1>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider block">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium"
                            placeholder="admin@addisstay.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-4 pt-4">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'signin')}
                            className="w-full bg-black text-white font-bold py-4 uppercase tracking-widest hover:bg-slate-800 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'signup')}
                            className="w-full bg-transparent border-2 border-black text-black font-bold py-4 uppercase tracking-widest hover:bg-slate-100 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-medium text-slate-500 uppercase tracking-widest text-center">
                    © 2026 Addis Stay • Professional Portal
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
