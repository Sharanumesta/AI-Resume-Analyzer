import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const maxFileSize = 20 * 1024 * 1024;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        acceptedFiles
    } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    });

    const selectedFile = acceptedFiles[0] || null;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    {
                        selectedFile ? (
                            <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                                <img src='/images/pdf.png' alt="pdf" className="size-10"/>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <p className="text-sm text-gray-700 font-medium max-w-xs truncate">{selectedFile.name}</p>
                                        <p className="text-sm text-gray-500">{formatSize(selectedFile.size)}</p>
                                    </div>
                                </div>
                                <button className="p-2 cursor-pointer" onClick={(e)=> {
                                    onFileSelect?.(null);
                                }}>
                                    <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="mx-auto w-16 h-16  items-center justify-center">
                                    <img
                                        src="/icons/info.svg"
                                        alt="upload icon"
                                        className="size-20"
                                    />
                                </div>
                                <div className="text-center mt-2">
                                    <p className="text-lg text-gray-500">
                                        <span className="font-semibold">Click to Upload</span> or Drag files here
                                    </p>
                                    <p className="text-lg text-gray-500">
                                        &nbsp;PDF (max {formatSize(maxFileSize)})
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
