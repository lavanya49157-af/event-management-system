import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 pt-14 pb-10 border-t border-gray-200 relative z-20 font-sans">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* TOP ROW: BRANDING & QUICK PORTAL LINKS */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-gray-200">
          
          {/* BRANDING */}
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                JNTU
              </div>
              <span className="text-base font-bold tracking-tight text-gray-900">
                JNTU-GV Vizianagaram • Event Report And Management System
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Event Report And Management System — Centralized university platform to document, manage, and generate NBA & NAAC compliant official event reports.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium text-gray-700">
            <a href="#events" className="hover:text-gray-900 transition-colors">Events</a>
            <a href="#notifications" className="hover:text-gray-900 transition-colors">Notifications</a>
            <Link to="/reports" className="hover:text-gray-900 transition-colors">Official Reports</Link>
            <a href="#archive" className="hover:text-gray-900 transition-colors">Archive</a>
            <Link to="/student-login" className="bg-[#F26522] hover:bg-[#e05a1a] text-white px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
              <span>Portal Login</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* MIDDLE ADDRESS & CONTACT */}
        <div className="py-6 border-b border-gray-200/80 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-normal">
          <div className="flex items-center space-x-2">
            <MapPin size={14} className="text-[#F26522] shrink-0" />
            <span>Jawaharlal Nehru Technological University - Gurajada Vizianagaram, Dwarapudi - 535003, AP, India.</span>
          </div>
          <div className="text-gray-500 font-medium">
            Academic Session 2026–2027
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & DEVELOPER CREDIT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-gray-600 text-center sm:text-left font-normal">
            © 2026 <strong className="text-gray-900">JNTU-GV Vizianagaram</strong>. All Rights Reserved.
          </div>

          {/* DEVELOPER CREDIT PILL (LIGHT PREMIER AESTHETIC) */}
          <div className="bg-gray-100 border border-gray-300/80 text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 shadow-2xs">
            <Sparkles size={14} className="text-[#F26522]" />
            <span className="font-medium text-gray-700">
              Developed by <strong className="text-gray-900 font-bold">Yaindum Lavanya</strong> — <span className="text-[#F26522] font-semibold">Information Technology</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
