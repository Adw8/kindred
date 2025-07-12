import { useState } from "react";
import { Button } from "@/components/ui/button";

type EditCardProps = {
  input: string;
  onSave?: (newInfo: string) => Promise<void>;
  disabled?: boolean;
}

const EditableCard: React.FC<EditCardProps> = ({ input, onSave, disabled = false }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(input);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!onSave) {
      setEditing(false);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await onSave(text);
      setEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setText(input); // Reset to original value
    setEditing(false);
    setError(null);
  };

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      {editing ? (
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 px-6"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={saving}
        />
      ) : (
        <p className="text-base whitespace-pre-wrap break-words px-6">{text}</p>
      )}

      {error && (
        <div className="px-6">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-3 flex justify-end gap-2 px-6">
        {editing ? (
          <>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              disabled={saving || disabled}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() => setEditing(true)}
            disabled={disabled}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}

export default EditableCard;
