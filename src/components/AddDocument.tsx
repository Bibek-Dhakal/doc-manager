// src/components/AddDocument.tsx

'use client';

import React, {ChangeEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/Navbar';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Document {
    id: number;
    name: string;
    description: string;
    image: string;
    date: string;
    text: string;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

const AddDocument: React.FC = () => {
    const [documentName, setDocumentName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [text, setText] = useState<string>('');

    const handleDocumentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDocumentName(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size > MAX_FILE_SIZE) {
            toast.error('File size exceeds the 1MB limit.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                setImage(reader.result as string);
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleTextFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size > MAX_FILE_SIZE) {
            toast.error('File size exceeds the 1MB limit.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                setText(reader.result as string);
            }
        };
        if (file) {
            reader.readAsText(file);
        }
    };

    const handleAddDocument = () => {
        if (!documentName.trim() || !description.trim()) {
            toast.error('name and description are required');
            return;
        }

        if (!image && !text) {
            toast.error('at least either image or text is required');
            return;
        }

        const currentDate = new Date().toLocaleDateString();
        const existingDocuments: Document[] = JSON.parse(localStorage.getItem('documents') || '[]');
        const newDocument: Document = {
            id: existingDocuments.length + 1,
            name: documentName,
            description: description,
            image: image,
            date: currentDate,
            text: text,
        };
        const updatedDocuments = [...existingDocuments, newDocument];
        localStorage.setItem('documents', JSON.stringify(updatedDocuments));
        setDocumentName('');
        setDescription('');
        setImage('');
        toast.success('Document added successfully.');
    };

    return (
        <>
            <Navbar/>
            <div className="mb-3 container" style={{width: '70%'}}>
                <label htmlFor="documentName" className="form-label">
                    Document Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="documentName"
                    value={documentName}
                    onChange={handleDocumentNameChange}
                />
                <label htmlFor="description" className="form-label mt-3">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <label htmlFor="image" className="form-label mt-3">
                    Select Image
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                <label htmlFor="file" className="form-label mt-3">
                    Select File
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={handleTextFileChange}
                    accept="text/*"
                />
                <button className="btn btn-primary mt-3" onClick={handleAddDocument}>
                    Add Document
                </button>
            </div>
            <ToastContainer/>
        </>
    );
}

export default AddDocument;