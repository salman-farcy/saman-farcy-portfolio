
import { portfolioConfig } from "@/src/config/portfolioConfig";
import { CheckCircle2, Download } from "lucide-react";



const ResumeDownloadButton = ({ downloadComplete, downloading, handleDownload, activeTheme }) => {
     const { file, fileName, buttonText } = portfolioConfig.resume;


     return (
          <a onClick={handleDownload}
               disabled={downloading}
               className="w-full sm:w-auto relative group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-medium text-black text-sm transition-all duration-300 active:scale-95 disabled:opacity-80"
               style={{
                    background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`,
                    boxShadow: `0 4px 20px -5px ${activeTheme.primary}`
               }} href={file}
               target="_blank"
               download={fileName}
               aria-label="Download Resume"
          >
               {downloading ? (
                    <>
                         <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                         <span>Preparing PDF...</span>
                    </>
               ) : downloadComplete ? (
                    <>
                         <CheckCircle2 className="w-4 h-4 text-black" />
                         <span>Downloaded Successfully!</span>
                    </>
               ) : (
                    <>
                         <Download className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
                         <span>{buttonText}</span>
                    </>
               )}
          </a>

     );
};

export default ResumeDownloadButton;