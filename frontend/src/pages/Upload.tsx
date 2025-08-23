import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Upload as UploadIcon, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    );
    setFiles(prev => [...prev, ...validFiles]);
  };

  const processFiles = () => {
    setProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false);
      // Mock results
      setResults([
        {
          event: "Cargo Loading",
          startTime: "2024-08-20 08:00",
          endTime: "2024-08-20 16:30",
          duration: "8h 30m",
          currency: "USD"
        },
        {
          event: "Anchorage",
          startTime: "2024-08-20 17:00",
          endTime: "2024-08-21 06:00",
          duration: "13h 00m",
          currency: "USD"
        },
        {
          event: "Cargo Discharge",
          startTime: "2024-08-21 06:30",
          endTime: "2024-08-21 14:45",
          duration: "8h 15m",
          currency: "USD"
        }
      ]);
    }, 4000);
  };

  const downloadResults = (format: 'json' | 'csv') => {
    const data = format === 'json' 
      ? JSON.stringify(results, null, 2)
      : results.map(r => Object.values(r).join(',')).join('\n');
    
    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sof-results.${format}`;
    a.click();
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Upload Your SoF Documents
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Upload your Statement of Facts documents and let our AI extract all events, timestamps, and calculations automatically
            </p>
          </div>

          {/* Upload Section */}
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
                  dragActive 
                    ? 'border-maritime-primary bg-maritime-light/50' 
                    : 'border-gray-300 hover:border-maritime-primary'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <motion.div
                  animate={{
                    scale: dragActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-xl mb-4 text-maritime-dark">
                    Drag your SoF documents here
                  </p>
                  <p className="text-maritime-muted mb-6">
                    Supports PDF, DOC, and DOCX formats
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="btn-maritime-outline cursor-pointer">
                      Choose Files
                    </Button>
                  </label>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Selected Files ({files.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-maritime-light rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-6 h-6 text-maritime-primary" />
                          <div>
                            <p className="font-medium text-maritime-dark">{file.name}</p>
                            <p className="text-sm text-maritime-muted">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Process Button */}
          {files.length > 0 && !results.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <Button 
                onClick={processFiles}
                disabled={processing}
                className="btn-maritime-primary px-12 py-4 text-lg"
              >
                {processing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      ⚙️
                    </motion.div>
                    Processing Documents...
                  </>
                ) : (
                  "Start AI Processing"
                )}
              </Button>
            </motion.div>
          )}

          {/* Processing Animation */}
          {processing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-6xl"
                >
                  🤖
                </motion.div>
                <p className="text-white text-xl">AI is analyzing your documents...</p>
                <div className="flex justify-center space-x-4 text-blue-200">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }}>Detecting events</motion.span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}>Extracting timestamps</motion.span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>Calculating laytime</motion.span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Extraction Results</span>
                    <div className="space-x-2">
                      <Button onClick={() => downloadResults('json')} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        JSON
                      </Button>
                      <Button onClick={() => downloadResults('csv')} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        CSV
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">Start Time</th>
                          <th className="text-left py-3 px-4">End Time</th>
                          <th className="text-left py-3 px-4">Duration</th>
                          <th className="text-left py-3 px-4">Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b hover:bg-maritime-light/30"
                          >
                            <td className="py-3 px-4 font-medium">{result.event}</td>
                            <td className="py-3 px-4">{result.startTime}</td>
                            <td className="py-3 px-4">{result.endTime}</td>
                            <td className="py-3 px-4">{result.duration}</td>
                            <td className="py-3 px-4">{result.currency}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;