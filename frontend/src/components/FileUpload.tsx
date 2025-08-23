import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Download } from "lucide-react";

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = selectedFiles.filter(file => 
      file.type.includes('pdf') || 
      file.type.includes('word') || 
      file.type.includes('document')
    );

    if (validFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid files detected",
        description: "Only PDF and Word documents are supported",
        variant: "destructive"
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type.includes('pdf') || 
      file.type.includes('word') || 
      file.type.includes('document')
    );

    setFiles(prev => [...prev, ...validFiles]);
  };

  const processFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload some SoF documents first",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults = files.map(file => ({
      filename: file.name,
      events: [
        { event: "Berthing", start: "2024-01-15 08:00", end: "2024-01-15 08:30" },
        { event: "Loading Cargo", start: "2024-01-15 09:00", end: "2024-01-15 17:00" },
        { event: "Unberthing", start: "2024-01-15 18:00", end: "2024-01-15 18:30" }
      ]
    }));

    setResults(mockResults);
    setIsProcessing(false);
    
    toast({
      title: "Processing complete!",
      description: `Successfully extracted events from ${files.length} document(s)`,
    });
  };

  const downloadResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'sof-events-extracted.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <section id="upload" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Upload Your SoF Documents
          </h2>
          <p className="text-xl text-muted-foreground">
            Support for PDF and Word formats - Template agnostic extraction
          </p>
        </div>

        <Card className="p-8 glass-effect border-2 border-dashed border-border hover:border-primary transition-colors">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="text-center py-12"
          >
            <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Drop your SoF files here
            </h3>
            <p className="text-muted-foreground mb-6">
              or click to browse files
            </p>
            
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="mb-6"
            >
              Select Files
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4">Selected Files:</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-secondary/20 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process Button */}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={processFiles}
              disabled={isProcessing || files.length === 0}
              className="btn-ocean px-8 py-3 text-lg"
            >
              {isProcessing ? (
                <>Processing... 🤖</>
              ) : (
                <>Extract Events 🚀</>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <Card className="mt-8 p-6 fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Extraction Results
              </h3>
              <Button onClick={downloadResults} className="btn-wave">
                <Download className="w-4 h-4 mr-2" />
                Download JSON
              </Button>
            </div>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3">
                    {result.filename}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Event</th>
                          <th className="text-left p-2">Start Time</th>
                          <th className="text-left p-2">End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.events.map((event: any, i: number) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 font-medium">{event.event}</td>
                            <td className="p-2 text-muted-foreground">{event.start}</td>
                            <td className="p-2 text-muted-foreground">{event.end}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default FileUpload;