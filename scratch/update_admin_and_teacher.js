const fs = require('fs');
const path = require('path');

// 1. UPDATE APP/ADMIN/PAGE.TSX
const adminPath = path.join(__dirname, '../app/admin/page.tsx');
let adminContent = fs.readFileSync(adminPath, 'utf8');

// Update activeTab type and state in admin
if (!adminContent.includes("'sample_papers'")) {
  adminContent = adminContent.replace(
    "const [activeTab, setActiveTab] = useState<\n    'settings' | 'results' | 'exams' | 'tests'",
    "const [activeTab, setActiveTab] = useState<\n    'settings' | 'sample_papers' | 'results' | 'exams' | 'tests'"
  );
  adminContent = adminContent.replace(
    "const [activeTab, setActiveTab] = useState<\r\n    'settings' | 'results' | 'exams' | 'tests'",
    "const [activeTab, setActiveTab] = useState<\r\n    'settings' | 'sample_papers' | 'results' | 'exams' | 'tests'"
  );
}

// Add state variables if missing
if (!adminContent.includes('selectedSampleClass')) {
  adminContent = adminContent.replace(
    "const [toastMessage, setToastMessage] = useState<string | null>(null);",
    "const [toastMessage, setToastMessage] = useState<string | null>(null);\n  const [selectedSampleClass, setSelectedSampleClass] = useState<string>('class8');\n  const [uploadingSamplePaper, setUploadingSamplePaper] = useState<boolean>(false);"
  );
}

// Add sidebarTabs item for sample_papers
if (!adminContent.includes("id: 'sample_papers'")) {
  adminContent = adminContent.replace(
    "{ id: 'settings', label: 'Website & CMS', icon: Settings, desc: 'Announcements, Logo & Helpline' },",
    "{ id: 'settings', label: 'Website & CMS', icon: Settings, desc: 'Announcements, Logo & Helpline' },\n    { id: 'sample_papers', label: 'Sample Papers (Class Upload)', icon: FileText, desc: 'Upload Class 8–12 PDFs (No Subjects)' },"
  );
}

// Add quick header button for sample_papers
if (!adminContent.includes("Upload Sample Papers")) {
  adminContent = adminContent.replace(
    `<Link\n            href="/teacher"`,
    `<button\n            onClick={() => setActiveTab('sample_papers')}\n            className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"\n          >\n            <FileText className="w-3.5 h-3.5" />\n            <span>Upload Sample Papers</span>\n          </button>\n          <Link\n            href="/teacher"`
  );
  adminContent = adminContent.replace(
    `<Link\r\n            href="/teacher"`,
    `<button\r\n            onClick={() => setActiveTab('sample_papers')}\r\n            className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"\r\n          >\r\n            <FileText className="w-3.5 h-3.5" />\r\n            <span>Upload Sample Papers</span>\r\n          </button>\r\n          <Link\r\n            href="/teacher"`
  );
}

// Add the dedicated sample_papers tab panel
const samplePapersSection = `
          {/* TAB: DEDICATED SAMPLE PAPERS UPLOAD (CLASSES 8 TO 12 ONLY, NO SUBJECTS) */}
          {activeTab === 'sample_papers' && settings && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <FileText className="w-3 h-3 text-emerald-600" />
                    <span>Official Sample Papers Studio</span>
                  </div>
                  <h2 className="text-xl font-black text-euro-navy mt-1">
                    Upload Sample Papers by Class (Classes 8 to 12)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Strictly organized by class — <strong>no subjects needed!</strong> Select the class, pick your PDF file, and students clicking on that class on the website will instantly open your document.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/#sample-papers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>View on Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 1. CLASS SELECTOR (ONLY CLASS OPTION, ZERO SUBJECTS!) */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Step 1: Choose Target Class
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
                    const isSelected = selectedSampleClass === cls.key;
                    return (
                      <button
                        key={cls.key}
                        onClick={() => setSelectedSampleClass(cls.key)}
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

              {/* 2. ACTIVE UPLOAD BOX FOR SELECTED CLASS */}
              {(() => {
                const activeClassMeta = [
                  { key: 'class8', label: 'Class 8', tag: 'Foundation (Science, Math & Mental Ability)' },
                  { key: 'class9', label: 'Class 9', tag: 'Olympiad & Foundation' },
                  { key: 'class10', label: 'Class 10', tag: 'Boards & Foundation' },
                  { key: 'jee_class11', label: 'Class 11 JEE (Main + Advanced)', tag: 'Engineering (PCM)' },
                  { key: 'neet_class11', label: 'Class 11 NEET', tag: 'Medical (PCB)' },
                  { key: 'jee_class12', label: 'Class 12 JEE (Main + Advanced)', tag: 'Engineering (PCM)' },
                  { key: 'neet_class12', label: 'Class 12 NEET', tag: 'Medical (PCB)' },
                ].find((c) => c.key === selectedSampleClass) || {
                  key: selectedSampleClass,
                  label: selectedSampleClass,
                  tag: 'Standard',
                };

                const currentFileUrl =
                  settings?.sample_paper_urls?.[selectedSampleClass] ||
                  settings?.syllabus_urls?.[selectedSampleClass] ||
                  \`/branding/syllabus/\${selectedSampleClass}.svg\`;

                const isPdf = currentFileUrl.toLowerCase().endsWith('.pdf');

                return (
                  <div className="bg-gradient-to-br from-emerald-50/60 to-slate-50 p-6 rounded-3xl border-2 border-emerald-200/80 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                          Step 2: Upload Document
                        </span>
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5">
                          <span>{activeClassMeta.label} Sample Paper PDF</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {activeClassMeta.tag}
                          </span>
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={currentFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span>View Current PDF</span>
                        </a>
                      </div>
                    </div>

                    {/* Big Drag & Drop / Direct File Upload Card */}
                    <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center text-center space-y-3 hover:border-emerald-500 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                        <UploadCloud className="w-7 h-7" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-900">
                          Upload {activeClassMeta.label} Sample Paper (PDF)
                        </h4>
                        <p className="text-xs text-slate-500 max-w-md">
                          Click below to select the PDF from your device. Once selected, it saves automatically and updates the website live.
                        </p>
                      </div>

                      <label className="cursor-pointer px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95">
                        <Upload className="w-4 h-4" />
                        <span>{uploadingSamplePaper ? 'Uploading...' : \`Select \${activeClassMeta.label} PDF from Device\`}</span>
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          className="hidden"
                          disabled={uploadingSamplePaper}
                          onChange={async (e) => {
                            if (!e.target.files?.[0]) return;
                            const file = e.target.files[0];
                            setUploadingSamplePaper(true);
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

                              const newUrl = data.url;
                              const updatedSampleUrls = {
                                ...(settings?.sample_paper_urls || {}),
                                [selectedSampleClass]: newUrl,
                              };

                              setSettings({
                                ...settings,
                                sample_paper_urls: updatedSampleUrls,
                              });

                              // Persist immediately to API
                              await fetch('/api/site-settings', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  sample_paper_urls: updatedSampleUrls,
                                }),
                              });

                              showToast(\`✅ \${activeClassMeta.label} Sample Paper PDF uploaded and published live!\`);
                            } catch (err: any) {
                              showToast(err.message || 'Error uploading file');
                            } finally {
                              setUploadingSamplePaper(false);
                            }
                          }}
                        />
                      </label>

                      {/* Current Active File Info */}
                      <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
                        <span className="font-semibold text-slate-400">Current Linked File:</span>
                        <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 max-w-xs truncate">
                          {currentFileUrl}
                        </span>
                        {isPdf && (
                          <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                            PDF DOCUMENT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 3. ALL 7 CLASSES OVERVIEW TABLE */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Step 3: All Classes Sample Paper Status (Quick Overview)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { key: 'class8', label: 'Class 8', tag: 'Foundation' },
                    { key: 'class9', label: 'Class 9', tag: 'Olympiad & Foundation' },
                    { key: 'class10', label: 'Class 10', tag: 'Boards & Foundation' },
                    { key: 'jee_class11', label: 'Class 11 JEE (Main + Adv)', tag: 'Engineering' },
                    { key: 'neet_class11', label: 'Class 11 NEET', tag: 'Medical' },
                    { key: 'jee_class12', label: 'Class 12 JEE (Main + Adv)', tag: 'Engineering' },
                    { key: 'neet_class12', label: 'Class 12 NEET', tag: 'Medical' },
                  ].map((cls) => {
                    const sampleUrl =
                      settings?.sample_paper_urls?.[cls.key] ||
                      settings?.syllabus_urls?.[cls.key] ||
                      \`/branding/syllabus/\${cls.key}.svg\`;
                    const hasPdf = sampleUrl.toLowerCase().endsWith('.pdf');

                    return (
                      <div
                        key={cls.key}
                        className={\`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 \${
                          selectedSampleClass === cls.key
                            ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }\`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-black text-sm text-slate-900 block">{cls.label}</span>
                            <span className="text-[10px] font-bold text-slate-500">{cls.tag}</span>
                          </div>
                          <span
                            className={\`text-[10px] font-bold px-2 py-0.5 rounded-full \${
                              hasPdf
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }\`}
                          >
                            {hasPdf ? 'PDF Linked' : 'Active'}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-slate-500 truncate bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          {sampleUrl}
                        </div>

                        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                          <label className="flex-1 cursor-pointer py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 shadow-2xs">
                            <Upload className="w-3 h-3" />
                            <span>Upload PDF</span>
                            <input
                              type="file"
                              accept="application/pdf,image/*"
                              className="hidden"
                              onChange={async (e) => {
                                if (!e.target.files?.[0]) return;
                                const file = e.target.files[0];
                                showToast(\`Uploading \${file.name} for \${cls.label}...\`);
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
                                    [cls.key]: data.url,
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

                                  setSelectedSampleClass(cls.key);
                                  showToast(\`✅ \${cls.label} sample paper updated live!\`);
                                } catch (err: any) {
                                  showToast(err.message || 'Error uploading file');
                                }
                              }}
                            />
                          </label>

                          <a
                            href={sampleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] flex items-center gap-1"
                            title="Open in new tab"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Test</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
`;

if (!adminContent.includes("activeTab === 'sample_papers'")) {
  adminContent = adminContent.replace(
    "{activeTab === 'settings' && settings && (",
    samplePapersSection + "\n\n          {activeTab === 'settings' && settings && ("
  );
}

fs.writeFileSync(adminPath, adminContent, 'utf8');
console.log('Successfully updated app/admin/page.tsx');
