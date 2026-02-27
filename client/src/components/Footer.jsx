import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-20">
      <div className="container px-4 2xl:px-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <img width={140} src={assets.logo} alt="Logo" className="brightness-0 invert opacity-90" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Connecting top talent with the world's most innovative companies. Your career journey starts here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity"><img width={32} src={assets.facebook_icon} alt="Facebook" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><img width={32} src={assets.twitter_icon} alt="Twitter" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><img width={32} src={assets.instagram_icon} alt="Instagram" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><Link to="/news" className="hover:text-white hover:translate-x-1 transition-all inline-block">News & Journals</Link></li>
              <li><a href="#job-list" className="hover:text-white hover:translate-x-1 transition-all inline-block">Browse Jobs</a></li>
              <li><Link to="/recruiter-login" className="hover:text-white hover:translate-x-1 transition-all inline-block">Post a Job</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Popular Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Technology</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Finance</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Education</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Marketing</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for latest job alerts.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
           <p>© {new Date().getFullYear()} Gizmo by maisha0055.dev | All rights reserved.</p>
           <div className="flex gap-6 uppercase tracking-wider">
             <a href="#" className="hover:text-white transition-colors border-1 border-gray-400 pl-4 border-none">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Cookies</a>
           </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer