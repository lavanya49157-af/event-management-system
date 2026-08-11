import { X, FileText, Download } from 'lucide-react';
import { useState } from 'react';

interface CustomReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (title: string, type: 'PDF' | 'CSV') => void;
}

export default function CustomReportModal({ isOpen, onClose, onGenerate }: CustomReportModalProps) {
  const [reportName, setReportName] = useState('Custom Event Report');
  const [format, setFormat] = useState<'PDF' | 'CSV'>('PDF');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            Generate Custom Report
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Report Name</label>
            <input 
              type="text" 
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="E.g., Spring 2026 Engagement"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Data Source</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
              <option>All Events</option>
              <option>Department Events Only</option>
              <option>Participant Attendance</option>
              <option>Financial Overview</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Date Range</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Current Year</option>
              <option>Custom Date Range...</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Export Format</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="format" 
                  checked={format === 'PDF'} 
                  onChange={() => setFormat('PDF')}
                  className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-slate-700">PDF Document</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="format" 
                  checked={format === 'CSV'} 
                  onChange={() => setFormat('CSV')}
                  className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-slate-700">CSV Spreadsheet</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onGenerate(reportName, format);
              onClose();
            }}
            className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            Generate & Download
          </button>
        </div>
      </div>
    </div>
  );
}
