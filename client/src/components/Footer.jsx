import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Footer = () => {
  const { setShowRecruiterLogin } = useContext(AppContext)

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 mt-20 border-t border-slate-900">
      <div className="container px-4 2xl:px-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="bg-white p-4 inline-block rounded-2xl shadow-lg">
                <img width={140} src={assets.logo} alt="Gizmo Logo" className="opacity-100 transition-all duration-300" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering professionals and companies to find their perfect match through innovation and technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 border border-slate-800 group">
                <img width={20} src={assets.facebook_icon} alt="Facebook" className="brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-transform"/>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 hover:bg-blue-400 text-slate-400 hover:text-white transition-all duration-300 border border-slate-800 group">
                <img width={20} src={assets.twitter_icon} alt="Twitter" className="brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 hover:bg-pink-600 text-slate-400 hover:text-white transition-all duration-300 border border-slate-800 group">
                <img width={20} src={assets.instagram_icon} alt="Instagram" className="brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">News & Journals</Link></li>
              <li><a href="#job-list" className="hover:text-white transition-colors">Latest Jobs</a></li>
              <li><button onClick={() => { setShowRecruiterLogin(true); window.scrollTo(0, 0); }} className="hover:text-white transition-colors text-left">For Employers</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/emergency-contact" className="hover:text-red-500 transition-colors flex items-center gap-2">🚨 Emergency Support</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
               <li className="flex gap-3">
                 <span className="text-blue-500">📍</span>
                 <span>123 Tech Avenue, <br/>Cyber City, CX 5000</span>
               </li>
               <li className="flex gap-3">
                 <span className="text-blue-500">📞</span>
                 <span>+880 1000000000</span>
               </li>
               <li className="flex gap-3">
                 <span className="text-blue-500">✉️</span>
                 <span>maisha0055.dev@gmail.com</span>
               </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium uppercase tracking-widest text-slate-500">
           <p>© {new Date().getFullYear()} Copyright ©2026 GIZMO. All rights reserved.</p>
           <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
           </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer