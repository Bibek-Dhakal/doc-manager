// src/components/Documents.tsx

'use client';

import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

interface Document {
    id: string;
    name: string;
    date: string;
    image?: string;
    text?: string;
}

const Documents: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const storedDocuments = JSON.parse(localStorage.getItem('documents') || '[]') as Document[];
        setDocuments(storedDocuments);
    }, []);

    const handleViewDocument = (id: string) => {
        const document = documents.find(doc => doc.id === id);
        setSelectedDocument(document || null);
        setShowModal(true);
    };

    const handleDeleteDocument = (id: string) => {
        const updatedDocuments = documents.filter((document) => document.id !== id);
        setDocuments(updatedDocuments);
        localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    };

    const filteredDocuments = documents.filter(document =>
        document.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const documentsToBeDisplayed = () => {
        return filteredDocuments.length > 0 ? filteredDocuments : (searchQuery ? [] : documents);
    }

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-1 border-end"></div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <h2>Document List</h2>

                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {documentsToBeDisplayed().length > 0 && documentsToBeDisplayed().map((document) => (
                                <tr key={document.id}>
                                    <td>{document.id}</td>
                                    <td>{document.name}</td>
                                    <td>{document.date}</td>
                                    <td>
                                        <button className="btn btn-primary"
                                                onClick={() => handleViewDocument(document.id)}>
                                            View
                                        </button>
                                        <button className="btn btn-danger ms-2"
                                                onClick={() => handleDeleteDocument(document.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {!(documentsToBeDisplayed().length > 0) && (
                            <span className="text-center mx-auto">No Document Found</span>
                        )}
                    </div>
                </div>
            </div>

            {showModal && selectedDocument && (
                <div className="modal" tabIndex={-1} role="dialog" style={{
                    display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header flex w-full justify-between">
                                <h5 className="modal-title">
                                    {selectedDocument.name}
                                </h5>
                                <button type="button" className="close"
                                        onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {selectedDocument.image && (
                                    <img src={selectedDocument.image} alt="Document" className="img-fluid"/>
                                )}
                                {selectedDocument.text && (
                                    <pre className="mt-4">
                                        <code>{selectedDocument.text}</code>
                                    </pre>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Documents;