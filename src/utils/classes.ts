import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classes = (props: string[]) => twMerge(clsx([...props]));
