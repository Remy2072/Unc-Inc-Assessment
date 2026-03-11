import Quill from "quill";
import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type MouseEvent,
} from "react";
import "quill/dist/quill.snow.css";
import "./ArticleEditorModal.css";

interface Props {
    isOpen: boolean;
    mode: "create" | "edit";
    onClose: (event?: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

export function ArticleEditorModal({ isOpen, mode, onClose }: Props) {
    const editorElementRef = useRef<HTMLDivElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    void mode;

    useEffect(() => {
        if (!isOpen || !editorElementRef.current || quillRef.current) {
            return;
        }

        quillRef.current = new Quill(editorElementRef.current, {
            theme: "snow",
            placeholder: "",
            modules: {
                toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                ],
            },
        });

        return () => {
            quillRef.current = null;
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            setImagePreview(null);
            return;
        }

        setImagePreview(URL.createObjectURL(file));
    }

    function handleRemoveImage() {
        setImagePreview(null);

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    }

    return (
        <div className="article-editor-modal-backdrop" onClick={onClose}>
            <div
                className="article-editor-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Artikel"
                onClick={(event) => event.stopPropagation()}
            >
                <label className="article-editor-modal-field">
                    <span className="article-editor-modal-label">Titel*</span>
                    <input className="article-editor-modal-input" type="text" />
                </label>
                <label className="article-editor-modal-field">
                    <span className="article-editor-modal-label">
                        Beschrijving*
                    </span>
                    <input className="article-editor-modal-input" type="text" />
                </label>
                <label className="article-editor-modal-field">
                    <span className="article-editor-modal-label">Tekst</span>
                    <div className="article-editor-modal-editor">
                        <div ref={editorElementRef} />
                    </div>
                </label>
                <label className="article-editor-modal-field">
                    <span className="article-editor-modal-label">
                        Afbeelding*
                    </span>
                </label>
                <input
                    className="article-editor-modal-input"
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imagePreview ? (
                    <>
                        <img
                            className="article-editor-modal-preview"
                            src={imagePreview}
                            alt="Geselecteerde afbeelding"
                        />
                        <button
                            type="button"
                            className="article-editor-modal-remove-image"
                            onClick={handleRemoveImage}
                        >
                            Afbeelding verwijderen
                        </button>
                    </>
                ) : null}
                <div className="article-editor-modal-actions">
                    <button
                        type="button"
                        className="article-editor-modal-button article-editor-modal-button--primary"
                    >
                        Publiceren
                    </button>
                    <button
                        type="button"
                        className="article-editor-modal-button"
                        onClick={onClose}
                    >
                        Annuleer
                    </button>
                </div>
            </div>
        </div>
    );
}
