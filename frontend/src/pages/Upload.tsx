import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Upload as UploadIcon, FileText, Download, X } from "lucide-react";
import { Link } from "react-router-dom";

type MlEvent = {
  event: string;
  details?: string[]; // FastAPI returns array of entity strings
};

type MlResult = {
  filename: string;
  preview: string;
  events: MlEvent[];
};

const Upload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<MlResult[]>([]);

  // Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  // File Validation
  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter((file) =>
      ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"].includes(
        file.type || ""
      )
    );
    setFiles((prev) => [...prev, ...validFiles]);
  };

  // 🔥 Backend Processing
  const processFiles = async () => {
    setProcessing(true);
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    console.log("Sending files:", files.map(f => f.name));
    try {
        const res = await fetch("http://127.0.0.1:8000/api/upload", {
            method: "POST",
            body: formData,
        });
        if (!res.ok) {
            console.error("HTTP error:", res.status, await res.text());
            throw new Error(`HTTP error: ${res.status}`);
        }
        const data = await res.json();
        console.log("Backend response:", data);
        setResults(data.results || []);
    } catch (err) {
        console.error("Processing failed:", err);
    } finally {
        setProcessing(false);
    }
  };

  // Download JSON / CSV of whatever ML returned
  const downloadResults = (format: "json" | "csv") => {
    if (!results.length) return;

    let data: string;
    if (format === "json") {
      data = JSON.stringify(results, null, 2);
    } else {
      // CSV: one row per (file,event)
      const rows: string[] = [];
      rows.push(["filename", "event", "details"].join(","));
      results.forEach((r) => {
        (r.events || []).forEach((ev) => {
          rows.push([r.filename, ev.event, (ev.details || []).join(" | ")].map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(","));
        });
      });
      data = rows.join("\n");
    }

    const blob = new Blob([data], { type: format === "json" ? "application/json" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sof-results.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-ocean">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-maritime-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center space-x-2 text-maritime-dark hover:text-maritime-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Upload Your SoF Documents</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Upload your Statement of Facts documents and let our AI extract all events, timestamps, and calculations automatically
            </p>
          </div>

          {/* Upload Box */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UploadIcon className="w-6 h-6" />
                <span>Document Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  dragActive ? "border-maritime-primary bg-maritime-light/50" : "border-gray-300 hover:border-maritime-primary"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <motion.div animate={{ scale: dragActive ? 1.05 : 1 }} transition={{ duration: 0.2 }}>
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-xl mb-4 text-maritime-dark">Drag your SoF documents here</p>
                  <p className="text-maritime-muted mb-6">Supports PDF, DOC, and DOCX formats</p>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) handleFiles(Array.from(e.target.files));
                    }}
                  />
                  <label htmlFor="file-upload">
                    <span className="btn-maritime-outline cursor-pointer">Choose Files</span>
                  </label>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <Card className="mb-8 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Selected Files ({files.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <motion.div
                      key={file.name + index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-maritime-light rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-maritime-primary" />
                        <div>
                          <p className="font-medium text-maritime-dark">{file.name}</p>
                          <p className="text-sm text-maritime-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => setFiles(files.filter((_, i) => i !== index))} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Process Button */}
          {files.length > 0 && !processing && results.length === 0 && (
            <div className="text-center mb-8">
              <Button onClick={processFiles} className="btn-maritime-primary px-12 py-4 text-lg">
                Start AI Processing
              </Button>
            </div>
          )}

          {processing && (
            <div className="text-center mb-8">
              <Button disabled className="btn-maritime-primary px-12 py-4 text-lg">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mr-2 inline-block">
                  ⚙️
                </motion.div>
                Processing Documents...
              </Button>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Extraction Results</span>
                  <div className="space-x-2">
                    <Button onClick={() => downloadResults("json")} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" /> JSON
                    </Button>
                    <Button onClick={() => downloadResults("csv")} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" /> CSV
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Per-file result card */}
                <div className="space-y-8">
                  {results.map((r, i) => (
                    <motion.div key={r.filename + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <div className="mb-2">
                        <p className="text-sm text-maritime-muted">Filename</p>
                        <p className="font-medium text-maritime-dark">{r.filename}</p>
                      </div>

                      {/* Preview */}
                      {r.preview && (
                        <div className="mb-4 p-4 bg-maritime-light rounded-lg">
                          <p className="text-sm text-maritime-muted mb-1">Preview</p>
                          <p className="text-maritime-dark whitespace-pre-wrap">{r.preview}</p>
                        </div>
                      )}

                      {/* Events table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Event</th>
                              <th className="text-left py-3 px-4">Details (Entities)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(r.events || []).map((ev, idx) => (
                              <motion.tr
                                key={ev.event + idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="border-b hover:bg-maritime-light/30"
                              >
                                <td className="py-3 px-4 font-medium">{ev.event}</td>
                                <td className="py-3 px-4">{(ev.details || []).join(", ")}</td>
                              </motion.tr>
                            ))}
                            {(!r.events || r.events.length === 0) && (
                              <tr>
                                <td className="py-3 px-4 text-maritime-muted" colSpan={2}>
                                  No events detected.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
