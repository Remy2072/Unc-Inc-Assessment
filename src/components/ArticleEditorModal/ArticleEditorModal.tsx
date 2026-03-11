import Quill from "quill";
import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
    type ChangeEvent,
    type MouseEvent,
} from "react";
import "quill/dist/quill.snow.css";
import type { Article, ArticleInput } from "../../types/article";
import "./ArticleEditorModal.css";

interface Props {
    isOpen: boolean;
    mode: "create" | "edit";
    article: Article | null;
    onClose: (event?: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
    onSubmit: (article: ArticleInput) => Promise<void>;
}

type ValidationErrors = {
    title?: string;
    description?: string;
    image?: string;
};

const emptyForm = {
    title: "",
    description: "",
};

export function ArticleEditorModal({
    isOpen,
    mode,
    article,
    onClose,
    onSubmit,
}: Props) {
    const editorElementRef = useRef<HTMLDivElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const [formValues, setFormValues] = useState(emptyForm);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setFormValues({
            title: article?.title ?? "",
            description: article?.description ?? "",
        });
        setImagePreview(article?.image ?? null);
        setErrors({});

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }

        if (quillRef.current) {
            quillRef.current.root.innerHTML = article?.content ?? "";
        }
    }, [article, isOpen]);

    if (!isOpen) {
        return null;
    }

    async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            setImagePreview(null);
            return;
        }

        try {
            const reader = new FileReader();
            const image = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(String(reader.result ?? ""));
                reader.onerror = () =>
                    reject(new Error("Afbeelding kon niet worden geladen"));
                reader.readAsDataURL(file);
            });

            setImagePreview(image);
            setErrors((current) => ({ ...current, image: undefined }));
        } catch {
            setImagePreview(null);
            setErrors((current) => ({
                ...current,
                image: "Afbeelding kon niet worden geladen",
            }));
        }
    }

    function handleRemoveImage() {
        setImagePreview(null);
        setErrors((current) => ({
            ...current,
            image: "Afbeelding is verplicht",
        }));

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    }

    function handleFieldChange(field: keyof typeof emptyForm, value: string) {
        setFormValues((current) => ({
            ...current,
            [field]: value,
        }));
        setErrors((current) => ({ ...current, [field]: undefined }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const nextErrors: ValidationErrors = {};

        if (!formValues.title.trim()) {
            nextErrors.title = "Titel is verplicht";
        }

        if (!formValues.description.trim()) {
            nextErrors.description = "Beschrijving is verplicht";
        }

        if (!imagePreview) {
            nextErrors.image = "Afbeelding is verplicht";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                title: formValues.title.trim(),
                description: formValues.description.trim(),
                content: quillRef.current?.root.innerHTML ?? "",
                image: imagePreview ?? "",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="article-editor-modal-backdrop" onClick={onClose}>
            <form
                className="article-editor-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Artikel"
                onClick={(event) => event.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h2 className="article-editor-modal-title">
                    {mode === "create" ? "Nieuw artikel" : "Artikel bewerken"}
                </h2>
                <label className="article-editor-modal-field">
                    <span className="article-editor-modal-label">Titel*</span>
                    <input
                        className="article-editor-modal-input"
                        type="text"
                        value={formValues.title}
                        onChange={(event) =>
                            handleFieldChange("title", event.target.value)
                        }
                    />
                    {errors.title ? (
                        <span className="article-editor-modal-error">
                            {errors.title}
                        </span>
                    ) : null}
                </label>
                <label className="article-editor-modal-field">
                    <span className="article-editor-modal-label">
                        Beschrijving*
                    </span>
                    <input
                        className="article-editor-modal-input"
                        type="text"
                        value={formValues.description}
                        onChange={(event) =>
                            handleFieldChange("description", event.target.value)
                        }
                    />
                    {errors.description ? (
                        <span className="article-editor-modal-error">
                            {errors.description}
                        </span>
                    ) : null}
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
                {errors.image ? (
                    <span className="article-editor-modal-error">
                        {errors.image}
                    </span>
                ) : null}
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
                        type="submit"
                        className="article-editor-modal-button article-editor-modal-button--primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Bezig..."
                            : mode === "create"
                              ? "Publiceren"
                              : "Opslaan"}
                    </button>
                    <button
                        type="button"
                        className="article-editor-modal-button"
                        onClick={onClose}
                    >
                        Annuleer
                    </button>
                </div>
            </form>
        </div>
    );
}
