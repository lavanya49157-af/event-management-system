import { Download, FileText, Calendar, Filter, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import CustomReportModal from '../../components/common/CustomReportModal';

export default function AdminReports() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reports = [
    { id: 1, title: 'Annual Fest Registration Summary', date: 'Aug 10, 2026', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Department-wise Event Count', date: 'Aug 05, 2026', type: 'CSV', size: '1.1 MB' },
    { id: 3, title: 'Student Participation Metrics Q3', date: 'Jul 28, 2026', type: 'PDF', size: '3.8 MB' },
    { id: 4, title: 'Financial Overview - Tech Symposium', date: 'Jul 15, 2026', type: 'CSV', size: '0.9 MB' },
    { id: 5, title: 'Faculty Coordinator Engagement', date: 'Jul 01, 2026', type: 'PDF', size: '1.5 MB' },
  ];

  const handleDownload = (title: string, type: 'PDF' | 'CSV') => {
    let blob: Blob;

    if (type === 'CSV') {
      const content = 'ID,Name,Date,Status\n1,Demo Item,2026-08-11,Active\n2,Mock Data,2026-08-12,Pending\n';
      blob = new Blob([content], { type: 'text/csv' });
    } else {
      // Minimal valid PDF Base64 string
      const pdfBase64 = "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCgkJPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjggMDAwMDAgbiAKMDAwMDAwMDE2NyAwMDAwMCBuIAowMDAwMDAwMjc1IDAwMDAwIG4gCjAwMDAwMDAzNjAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDU2CiUlRU9GCg==";
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: 'application/pdf' });
    }
      
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${type.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-1">Download and analyze system data and summaries.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
        >
          <FileText className="h-4 w-4 mr-2" /> Generate Custom Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Recent Reports</h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
            {reports.map(report => (
              <div key={report.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                    report.type === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {report.type === 'PDF' ? <FileText className="h-5 w-5" /> : <FileSpreadsheet className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{report.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                      <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> {report.date}</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload(report.title, report.type as 'PDF' | 'CSV')}
                  className="flex items-center justify-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 mr-2" /> Download {report.type}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Export</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleDownload('All Events Data', 'CSV')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-left transition-colors group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-700">All Events Data</div>
                  <div className="text-xs text-slate-500">Export complete event catalog</div>
                </div>
                <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
              </button>
              <button 
                onClick={() => handleDownload('Full Participant List', 'CSV')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-left transition-colors group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-700">Full Participant List</div>
                  <div className="text-xs text-slate-500">Export all registered students</div>
                </div>
                <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
              </button>
              <button 
                onClick={() => handleDownload('Financial Summary', 'PDF')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-left transition-colors group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-700">Financial Summary</div>
                  <div className="text-xs text-slate-500">Export budget and expenses</div>
                </div>
                <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CustomReportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleDownload}
      />
    </div>
  );
}
