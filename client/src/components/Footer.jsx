import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 pt-16 pb-8 mt-20 border-t border-slate-100">
      <div className="container px-4 2xl:px-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 inline-block rounded-2xl border border-slate-100 shadow-sm">
                <img width={140} src={assets.logo} alt="Gizmo Logo" className="opacity-90 grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Empowering professionals and companies to find their perfect match through innovation and technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-slate-100 group">
                <img width={20} src={assets.facebook_icon} alt="Facebook" className="group-hover:scale-110 transition-transform"/>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-blue-50 hover:text-blue-400 transition-all duration-300 border border-slate-100 group">
                <img width={20} src={assets.twitter_icon} alt="Twitter" className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 border border-slate-100 group">
                <img width={20} src={assets.instagram_icon} alt="Instagram" className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/news" className="hover:text-blue-600 transition-colors">News & Journals</Link></li>
              <li><a href="#job-list" className="hover:text-blue-600 transition-colors">Latest Jobs</a></li>
              <li><Link to="/recruiter-login" className="hover:text-blue-600 transition-colors">For Employers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/emergency-contact" className="hover:text-red-600 transition-colors flex items-center gap-2">🚨 Emergency Support</Link></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Career Advice</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
               <li className="flex gap-3">
                 <span className="text-blue-600">📍</span>
                 <span>123 Tech Avenue, <br/>Cyber City, CX 5000</span>
               </li>
               <li className="flex gap-3">
                 <span className="text-blue-600">📞</span>
                 <span>+1 (555) 123-4567</span>
               </li>
               <li className="flex gap-3">
                 <span className="text-blue-600">✉️</span>
                 <span>maisha0055.dev@gmail.com</span>
               </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium uppercase tracking-widest text-slate-400">
           <p>© {new Date().getFullYear()} GIZMO. Built with ❤️ by maisha0055.dev</p>
           <div className="flex gap-6">
             <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
             <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
             <a href="#" className="hover:text-slate-600 transition-colors">Cookie Policy</a>
           </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer