/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck, 
  Calculator, 
  Trophy, 
  FileJson, 
  GraduationCap, 
  ExternalLink,
  Anchor,
  ShieldCheck,
  BarChart3,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

const NavyBlue = "#002147";

interface ServiceCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  isMain?: boolean;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, isMain, link }) => {
  const content = (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`
        relative p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all
        ${isMain ? 'md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#002147] to-[#003a7d] text-white border-none' : 'text-slate-800'}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${isMain ? 'bg-white/10' : 'bg-slate-50'}`}>
          {React.cloneElement(icon as React.ReactElement, { 
            size: isMain ? 32 : 24, 
            className: isMain ? 'text-white' : 'text-[#002147]' 
          })}
        </div>
        {link && <ExternalLink size={18} className={isMain ? 'text-white/60' : 'text-slate-400'} />}
      </div>
      
      <h3 className={`font-bold leading-tight ${isMain ? 'text-2xl mb-2' : 'text-lg mb-1'}`}>
        {title}
      </h3>
      
      {description && (
        <p className={`text-sm leading-relaxed ${isMain ? 'text-white/80 max-w-2xl' : 'text-slate-500'}`}>
          {description}
        </p>
      )}

      {isMain && (
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/90">
          <span className="px-3 py-1 rounded-full bg-white/20">Accede aquí...</span>
        </div>
      )}
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

const SectionHeader: React.FC<{ title: string; subtitle?: string; id?: string }> = ({ title, subtitle, id }) => (
  <div className="mb-8 mt-12" id={id}>
    <div className="flex items-center gap-3 mb-2">
      <div className="h-px flex-1 bg-slate-200"></div>
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
        {title}
      </h2>
      <div className="h-px flex-1 bg-slate-200"></div>
    </div>
    {subtitle && <p className="text-center text-slate-500 text-sm">{subtitle}</p>}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#002147] selection:text-white">
      {/* Header / Hero */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-[#002147] rounded-xl">
              <Anchor className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-[#002147] leading-none">DECANATURA ACADÉMICA</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Escuela Naval de Cadetes "Almirante Padilla"</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <a href="#inicio" className="hover:text-[#002147] transition-colors">Inicio</a>
            <a href="#secretaria" className="hover:text-[#002147] transition-colors">Secretaría</a>
            <a href="#facultades" className="hover:text-[#002147] transition-colors">Facultades</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Portal de Servicios <br />
              <span className="text-[#002147]">Oficina de Estadística</span>
            </h2>
          </motion.div>
        </div>

        {/* Inicio Section */}
        <div id="inicio" className="grid grid-cols-1 gap-6 mb-12">
          <ServiceCard 
            isMain
            title="Dashboard Interactivo - Información ENAP"
            description="Visualización centralizada de indicadores académicos, demográficos y operativos de la Escuela Naval. Acceso a datos en tiempo real para la toma de decisiones estratégicas."
            icon={<LayoutDashboard />}
          />
        </div>

        {/* Main Service - Statistics Office */}
        <SectionHeader title="Oficina de Estadística" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            title="Validación de Concesiones Especiales"
            description="Revisión y validación técnica de soportes para concesiones especiales de alumnos."
            icon={<ShieldCheck />}
          />
          
          <ServiceCard 
            title="Generación de Promedios Académicos"
            description="Cálculo y generación oficial de promedios ponderados y acumulados por programa."
            icon={<Calculator />}
          />
          
          <ServiceCard 
            title="Distinciones y Excelencia"
            description="Identificación y listado de alumnos destacados para cuadros de honor y excelencia académica."
            icon={<Trophy />}
          />
          
          <ServiceCard 
            title="Extractor de Notas SMA"
            description="Herramienta técnica para la exportación y procesamiento de datos del sistema SMA."
            icon={<FileJson />}
          />
        </div>

        {/* Academic Secretariat */}
        <SectionHeader title="Secretaría Académica" id="secretaria" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            title="Solicitud de Grado"
            description="Portal para el inicio y seguimiento del trámite administrativo de solicitud de grado para alumnos."
            icon={<FileCheck />}
            link="https://forms.office.com/Pages/ResponsePage.aspx?id=s2Y_9SPqGka2_wFlQEKnmR1gKXCrs2ZAr1hz3S5VoOdUNkxVMTdTMTVHMkMyNzBVU1QwWEJUSjZDVi4u"
          />
          <ServiceCard 
            title="Validación de Soportes de Grado"
            description="Validación integral de requisitos y documentación para procesos de graduación."
            icon={<GraduationCap />}
            link="https://verificadorgrado.vercel.app/"
          />
        </div>

        {/* Faculties */}
        <SectionHeader title="Facultades" id="facultades" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            title="Extracción de información de Cédulas"
            description="Acceso al portal externo para la extracción y consulta de información de identificación."
            icon={<Search />}
            link="https://cedulas.vercel.app/"
          />
        </div>

        {/* Footer Info */}
        <footer className="mt-24 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Anchor className="text-[#002147]" size={20} />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 leading-tight">Escuela Naval de Cadetes "Almirante Padilla"</span>
                  <span className="text-xs text-slate-500 font-semibold mt-0.5">Decanatura Académica</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">Oficina de Estadística</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <div className="bg-slate-100 px-4 py-3 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ubicación</p>
                <p className="text-xs font-medium text-slate-700">Cartagena de Indias, Colombia</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Escuela Naval de Cadetes "Almirante Padilla" - Oficina de Estadística
          </div>
        </footer>
      </main>
    </div>
  );
}
