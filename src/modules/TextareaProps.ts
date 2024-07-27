import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  stopTyping?: () => void;
}
