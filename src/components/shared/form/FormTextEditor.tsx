import { Editor } from '@tinymce/tinymce-react';
// core and theme
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/models/dom';

// plugins
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/fullscreen';

// Skins
import '../../../../public/tinymce-skins/oxide/skin.css';
import { useRef } from 'react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { FieldDescription } from '@/components/ui/field';
import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from 'react-hook-form';

export interface RHFEditorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  description?: string;
}

const FormTextEditor = <T extends FieldValues>({
  name,
  control,
  placeholder,
  onValueChange,
  description,
}: RHFEditorProps<T>) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <div className="editor-wrapper">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Editor
              key={field.value}
              licenseKey="gpl"
              onInit={(_, editor) => (editorRef.current = editor)}
              value={field.value || ''}
              onEditorChange={(content) => {
                field.onChange(content);
                if (onValueChange) {
                  onValueChange(content);
                }
              }}
              init={{
                base_url: '/tinymce',
                placeholder: placeholder || 'Start typing here...',
                suffix: '.min',
                height: 500,
                menubar: false,
                plugins: [
                  'link',
                  'lists',
                  'code',
                  'table',
                  'advlist',
                  'fullscreen',
                ],
                toolbar:
                  'undo redo | styleselect fontselect fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | link | code fullscreen',
                branding: false,
                content_style: `body { font-family: Arial, sans-serif; font-size: 14px;}`,
                font_family_formats:
                  'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Times New Roman=times new roman,times;',
                fontsize_formats: '12px 14px 16px 18px 24px 36px',
                font_size_default: '14px',
              }}
            />
          );
        }}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  );
};
export default FormTextEditor;
