import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

const TextRoll = ({ text }: { text: string }) => (
  <span className="relative flex flex-col overflow-hidden h-[20px] leading-[20px]">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 flex flex-col">
      <span className="h-[20px] flex items-center">{text}</span>
      <span className="h-[20px] flex items-center">{text}</span>
    </span>
  </span>
);

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  roleBadge: string;
  children: ReactNode;
  footerLinkText?: string;
  footerLinkTo?: string;
}

export default function AuthLayout({
  title,
  subtitle,
  roleBadge,
  children,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <div className="bg-[#EFEFEF] min-h-screen flex flex-col relative overflow-hidden font-sans text-gray-900">
      {/* Full-Screen Animated Shader Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Shader className="w-full h-full">
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
      </div>

      {/* TOP HEADER */}
      <header className="relative z-20 w-full max-w-[1440px] mx-auto p-3 sm:p-4">
        <div className="bg-white rounded-full px-4 py-2 flex items-center justify-between shadow-xs">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white text-[9px] font-bold tracking-tight shrink-0">
              JNTU
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 tracking-tight">ERMS Portal</span>
              <span className="text-[10px] font-semibold text-gray-500">JNTU-GV Vizianagaram</span>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-full transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* CENTER AUTH CARD */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-2xl border border-gray-100 max-w-md w-full">
          {/* Card Header Badge */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xs shadow-sm">
              {roleBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>

          {/* Children Form */}
          {children}

          {/* Optional Footer Link */}
          {footerLinkText && footerLinkTo && (
            <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
              <span>{footerLinkText} </span>
              <Link to={footerLinkTo} className="font-semibold text-indigo-600 hover:text-indigo-500 underline">
                Click here
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
