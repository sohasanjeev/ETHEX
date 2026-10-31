const fs = require('fs');
const path = require('path');

const teacherPath = path.join(__dirname, '../app/teacher/page.tsx');
let content = fs.readFileSync(teacherPath, 'utf8');

// 1. Update activeTab type
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'my_tests' | 'templates' | 'question_bank'>('my_tests');",
  "const [activeTab, setActiveTab] = useState<'my_tests' | 'templates' | 'question_bank' | 'sample_papers'>('my_tests');\n  const [selectedClass, setSelectedClass] = useState<string>('class8');\n  const [settings, setSettings] = useState<any>(null);\n  const [uploadingPdf, setUploadingPdf] = useState<boolean>(false);"
);

// 2. Fetch site settings in fetchData
content = content.replace(
  "const [examsRes, tplRes] = await Promise.all([",
  "const [examsRes, tplRes, setRes] = await Promise.all([\n        fetch('/api/site-settings'),"
);
content = content.replace(
  "const examsData = await examsRes.json();\n      const tplData = await tplRes.json();",
  "const setData = await examsRes.json();\n      const examsData = await tplRes.json();\n      const tplData = await setRes.json();\n      if (setData && !setData.error) setSettings(setData);"
);

// 3. Add Tab Button
const tabButton = `            <button
              onClick={() => setActiveTab('sample_papers')}
              className={\`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all \${
                activeTab === 'sample_papers'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }\`}
            >
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>Upload Sample Papers (Classes 8–12)</span>
            </button>`;

if (!content.includes("setActiveTab('sample_papers')")) {
  content = content.replace(
    `</button>\n          </div>\n\n          <div className="pb-2 hidden sm:block">`,
    `</button>\n${tabButton}\n          </div>\n\n          <div className="pb-2 hidden sm:block">`
  );
  content = content.replace(
    `</button>\r\n          </div>\r\n\r\n          <div className="pb-2 hidden sm:block">`,
    `</button>\r\n${tabButton}\r\n          </div>\r\n\r\n          <div className="pb-2 hidden sm:block">`
  );
}

// 4. Add Hero quick button
if (!content.includes("Go to Sample Papers Upload")) {
  content = content.replace(
    `<span>Upload Question Paper PDF</span>\n              </button>`,
    `<span>Upload Question Paper PDF</span>\n              </button>\n              <button\n                onClick={() => setActiveTab('sample_papers')}\n                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 shadow-md"\n              >\n                <FileText className="w-4 h-4" />\n                <span>Upload Class 8–12 Sample Papers</span>\n              </button>`
  );
  content = content.replace(
    `<span>Upload Question Paper PDF</span>\r\n              </button>`,
    `<span>Upload Question Paper PDF</span>\r\n              </button>\r\n              <button\r\n                onClick={() => setActiveTab('sample_papers')}\r\n                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 shadow-md"\r\n              >\r\n                <FileText className="w-4 h-4" />\r\n                <span>Upload Class 8–12 Sample Papers</span>\r\n              </button>`
  );
}

// 5. Add Tab Panel Content
const teacherSamplePapersPanel = `
        {/* Tab 3: Upload Sample Papers by Class (Classes 8 to 12 only - NO SUBJECTS) */}
        {activeTab === 'sample_papers' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <FileText className="w-3 h-3 text-emerald-600" />
                  <span>Teacher Sample Paper Portal</span>
                </div>
                <h2 className="text-xl font-black text-euro-navy mt-1">
                  Upload Official Sample Papers by Class (Classes 8 to 12)
                </h2>
                <p className="text-xs text-slate-500">
                  Select your target class below (<strong>no subjects required</strong>). Upload the PDF, and it will immediately link to the live website so students clicking on that class will view it in a new tab.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/#sample-papers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Preview Student Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Step 1: Choose Class */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Select Target Class (No Subjects)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {[
                  { key: 'class8', label: 'Class 8', tag: 'Foundation' },
                  { key: 'class9', label: 'Class 9', tag: 'Olympiad' },
                  { key: 'class10', label: 'Class 10', tag: 'Boards' },
                  { key: 'jee_class11', label: '11 JEE', tag: 'Main + Adv' },
                  { key: 'neet_class11', label: '11 NEET', tag: 'Medical' },
                  { key: 'jee_class12', label: '12 JEE', tag: 'Main + Adv' },
                  { key: 'neet_class12', label: '12 NEET', tag: 'Medical' },
                ].map((cls) => {
                  const isSelected = selectedClass === cls.key;
                  return (
                    <button
                      key={cls.key}
                      onClick={() => setSelectedClass(cls.key)}
                      className={\`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 \${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 shadow-sm ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }\`}
                    >
                      <span className={\`text-xs font-black \${isSelected ? 'text-emerald-900' : 'text-slate-900'}\`}>
                        {cls.label}
                      </span>
                      <span
                        className={\`text-[9px] font-bold px-1.5 py-0.5 rounded \${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                        }\`}
                      >
                        {cls.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Upload Box */}
            {(() => {
              const activeClassMeta = [
                { key: 'class8', label: 'Class 8', tag: 'Foundation' },
                { key: 'class9', label: 'Class 9', tag: 'Olympiad & Foundation' },
                { key: 'class10', label: 'Class 10', tag: 'Boards & Foundation' },
                { key: 'jee_class11', label: 'Class 11 JEE (Main + Advanced)', tag: 'Engineering' },
                { key: 'neet_class11', label: 'Class 11 NEET', tag: 'Medical' },
                { key: 'jee_class12', label: 'Class 12 JEE (Main + Advanced)', tag: 'Engineering' },
                { key: 'neet_class12', label: 'Class 12 NEET', tag: 'Medical' },
              ].find((c) => c.key === selectedClass) || {
                key: selectedClass,
                label: selectedClass,
                tag: 'General',
              };

              const currentPdfUrl =
                settings?.sample_paper_urls?.[selectedClass] ||
                settings?.syllabus_urls?.[selectedClass] ||
                \`/branding/syllabus/\${selectedClass}.svg\`;

              return (
                <div className="bg-gradient-to-br from-emerald-50/60 to-slate-50 p-6 rounded-3xl border-2 border-emerald-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        Upload Sample Paper
                      </span>
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5">
                        <span>{activeClassMeta.label} ({activeClassMeta.tag})</span>
                      </h3>
                    </div>

                    <a
                      href={currentPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs w-fit"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Preview Current File</span>
                    </a>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>

                    <p className="text-xs text-slate-600">
                      Upload the PDF for <strong>{activeClassMeta.label}</strong>. It updates the live website immediately.
                    </p>

                    <label className="cursor-pointer px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-md transition-all flex items-center gap-2 active:scale-95">
                      <UploadCloud className="w-4 h-4" />
                      <span>{uploadingPdf ? 'Uploading...' : \`Choose \${activeClassMeta.label} PDF\`}</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        disabled={uploadingPdf}
                        onChange={async (e) => {
                          if (!e.target.files?.[0]) return;
                          const file = e.target.files[0];
                          setUploadingPdf(true);
                          showToast(\`Uploading \${file.name} for \${activeClassMeta.label}...\`);
                          try {
                            const fd = new FormData();
                            fd.append('file', file);
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: fd,
                            });
                            const data = await res.json();
                            if (!res.ok || !data.success) {
                              throw new Error(data.error || 'Upload failed');
                            }

                            const updated = {
                              ...(settings?.sample_paper_urls || {}),
                              [selectedClass]: data.url,
                            };

                            setSettings({
                              ...settings,
                              sample_paper_urls: updated,
                            });

                            await fetch('/api/site-settings', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ sample_paper_urls: updated }),
                            });

                            showToast(\`✅ \${activeClassMeta.label} Sample Paper PDF uploaded and published live!\`);
                          } catch (err: any) {
                            showToast(err.message || 'Error uploading file');
                          } finally {
                            setUploadingPdf(false);
                          }
                        }}
                      />
                    </label>

                    <div className="text-[11px] font-mono text-slate-500 truncate max-w-sm">
                      {currentPdfUrl}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
`;

if (!content.includes("activeTab === 'sample_papers'")) {
  content = content.replace(
    "{/* Tab 1: My Examinations */}",
    teacherSamplePapersPanel + "\n        {/* Tab 1: My Examinations */}"
  );
}

fs.writeFileSync(teacherPath, content, 'utf8');
console.log('Successfully updated app/teacher/page.tsx');
