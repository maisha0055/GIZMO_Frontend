import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const RecruiterCTA = () => {
    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <section className="container mx-auto px-4 2xl:px-20 py-20">
            <div className="relative overflow-hidden bg-[#2e3d00] rounded-[2.5rem] shadow-2xl group">
                {/* Decorative background gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-64 -mt-64 transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-olive-500/10 rounded-full blur-2xl -ml-32 -mb-32"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-10 lg:p-20 gap-16">
                    {/* Left: Content */}
                    <div className="w-full lg:w-3/5 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-olive-100 text-sm font-semibold mb-8 backdrop-blur-md border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                            For Employers & Recruiters
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.15]">
                            Find your next <span className="text-[#c8d48a]">superstar</span> <br /> 
                            talent today.
                        </h2>
                        
                        <p className="text-olive-50/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Join thousands of top companies who trust GIZMO to build their dream teams. Get access to verified candidates and premium hiring tools.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <button 
                                onClick={() => { setShowRecruiterLogin(true); window.scrollTo(0, 0); }}
                                className="group relative px-10 py-5 bg-[#c8d48a] hover:bg-[#b5c276] text-[#1e2d00] font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(200,212,138,0.25)] active:scale-95 flex items-center gap-3 overflow-hidden"
                            >
                                <span className="relative z-10 font-bold">Post your first job</span>
                                <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            
                            <div className="flex -space-x-3 items-center">
                                {[1,2,3,4].map((i) => (
                                    <img 
                                        key={i} 
                                        className="w-10 h-10 rounded-full border-2 border-[#2e3d00] bg-gray-200" 
                                        src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} 
                                        alt="User" 
                                    />
                                ))}
                                <span className="pl-6 text-olive-50/60 text-sm font-medium">Trusted by 500+ local companies</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature highlight cards */}
                    <div className="w-full lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        {[
                            { title: 'Verified Profiles', icon: '✅', Color: 'bg-emerald-500/10' },
                            { title: 'Quick Hiring', icon: '⚡', Color: 'bg-yellow-500/10' },
                            { title: 'AI Matching', icon: '🤖', Color: 'bg-blue-500/10' },
                            { title: 'Secure Data', icon: '🛡️', Color: 'bg-purple-500/10' }
                        ].map((item, idx) => (
                            <div key={idx} className={`p-6 rounded-3xl border border-white/5 backdrop-blur-xl hover:bg-white/5 transition-colors group/card cursor-default`}>
                                <div className="text-3xl mb-4 transform transition-transform duration-300 group-hover/card:scale-125 group-hover/card:rotate-12">{item.icon}</div>
                                <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                                <p className="text-olive-50/40 text-sm mt-2">Premium quality candidates waiting for you.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RecruiterCTA
