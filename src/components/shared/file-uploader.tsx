'use client'

import { IconUpload, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import * as React from 'react'
import Dropzone, {
	type DropzoneProps,
	type FileRejection
} from 'react-dropzone'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useControllableState } from '@/hooks'
import { cn, formatBytes } from '@/lib'

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Значення завантажувача файлів.
	 * @type File[]
	 * @default undefined
	 * @example value={files}
	 */
	value?: (File | any)[]

	/**
	 * Функція, яка викликається при зміні значення.
	 * @type React.Dispatch<React.SetStateAction<File[]>>
	 * @default undefined
	 * @example onValueChange={(files) => setFiles(files)}
	 */
	onValueChange?: React.Dispatch<React.SetStateAction<File[] | any>>

	/**
	 * Функція, яка викликається при завантаженні файлів.
	 * @type (files: File[]) => Promise<void>
	 * @default undefined
	 * @example onUpload={(files) => uploadFiles(files)}
	 */
	onUpload?: (files: File[]) => Promise<void>

	/**
	 * Прогрес завантаження файлів.
	 * @type Record<string, number> | undefined
	 * @default undefined
	 * @example progresses={{ "file1.png": 50 }}
	 */
	progresses?: Record<string, number>

	/**
	 * Прийняті типи файлів для завантаження.
	 * @type { [key: string]: string[]}
	 * @default
	 * ```ts
	 * { "image/*": [] }
	 * ```
	 * @example accept={["image/png", "image/jpeg"]}
	 */
	accept?: DropzoneProps['accept']

	/**
	 * Максимальний розмір файлу для завантаження.
	 * @type number | undefined
	 * @default 1024 * 1024 * 2 // 2MB
	 * @example maxSize={1024 * 1024 * 2} // 2MB
	 */
	maxSize?: DropzoneProps['maxSize']

	/**
	 * Максимальна кількість файлів для завантаження.
	 * @type number | undefined
	 * @default 1
	 * @example maxFiles={5}
	 */
	maxFiles?: DropzoneProps['maxFiles']

	/**
	 * Чи дозволяти завантаження кількох файлів.
	 * @type boolean
	 * @default false
	 * @example multiple
	 */
	multiple?: boolean

	/**
	 * Чи вимкнений завантажувач.
	 * @type boolean
	 * @default false
	 * @example disabled
	 */
	disabled?: boolean
}

export function FileUploader(props: FileUploaderProps) {
	const {
		value: valueProp,
		onValueChange,
		onUpload,
		progresses,
		accept = { 'image/*': [] },
		maxSize = 1024 * 1024 * 2,
		maxFiles = 1,
		multiple = false,
		disabled = false,
		className,
		...dropzoneProps
	} = props

	const [files, setFiles] = useControllableState({
		prop: valueProp,
		onChange: onValueChange
	})

	const onDrop = React.useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
				toast.error(
					'Неможливо завантажити більше одного файлу одночасно'
				)
				return
			}

			if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
				toast.error(
					`Неможливо завантажити більше ${maxFiles} файлів`
				)
				return
			}

			const newFiles = acceptedFiles.map(file =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			)

			const updatedFiles = files
				? [...files, ...newFiles]
				: newFiles

			setFiles(updatedFiles)

			if (rejectedFiles.length > 0) {
				rejectedFiles.forEach(({ file }) => {
					toast.error(`Файл ${file.name} відхилено`)
				})
			}

			if (
				onUpload &&
				updatedFiles.length > 0 &&
				updatedFiles.length <= maxFiles
			) {
				const target =
					updatedFiles.length > 0
						? `${updatedFiles.length} файли`
						: `файл`

				toast.promise(onUpload(updatedFiles), {
					loading: `Завантаження ${target}...`,
					success: () => {
						setFiles([])
						return `${target} завантажено`
					},
					error: `Не вдалося завантажити ${target}`
				})
			}
		},

		[files, maxFiles, multiple, onUpload, setFiles]
	)

	function onRemove(index: number) {
		if (!files) return
		const newFiles = files.filter((_, i) => i !== index)
		setFiles(newFiles)
		onValueChange?.(newFiles)
	}

	// Відкликати preview URL при демонтажі компонента
	React.useEffect(() => {
		return () => {
			if (!files) return
			files.forEach(file => {
				if (isFileWithPreview(file)) {
					URL.revokeObjectURL(file.preview)
				}
			})
		}
	}, [])

	const isDisabled = disabled || (files?.length ?? 0) >= maxFiles

	return (
		<div className='relative flex flex-col gap-6 overflow-hidden'>
			<Dropzone
				onDrop={onDrop}
				accept={accept}
				maxSize={maxSize}
				maxFiles={maxFiles}
				multiple={maxFiles > 1 || multiple}
				disabled={isDisabled}
			>
				{({ getRootProps, getInputProps, isDragActive }) => (
					<div
						{...getRootProps()}
						className={cn(
							'group border-muted-foreground/25 hover:bg-muted/25 relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition',
							'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
							isDragActive &&
								'border-muted-foreground/50',
							isDisabled &&
								'pointer-events-none opacity-60',
							className
						)}
						{...dropzoneProps}
					>
						<input {...getInputProps()} />
						{isDragActive ? (
							<div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
								<div className='rounded-full border border-dashed p-3'>
									<IconUpload
										className='text-muted-foreground size-7'
										aria-hidden='true'
									/>
								</div>
								<p className='text-muted-foreground font-medium'>
									Перетягніть файли сюди
								</p>
							</div>
						) : (
							<div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
								<div className='rounded-full border border-dashed p-3'>
									<IconUpload
										className='text-muted-foreground size-7'
										aria-hidden='true'
									/>
								</div>
								<div className='space-y-px'>
									<p className='text-muted-foreground font-medium'>
										Перетягніть файли
										сюди або натисніть
										для вибору
									</p>
									<p className='text-muted-foreground/70 text-sm'>
										Ви можете
										завантажити
										{maxFiles > 1
											? ` ${maxFiles === Infinity ? 'кілька файлів' : maxFiles} файлів (до ${formatBytes(maxSize)} кожен)`
											: ` один файл розміром до ${formatBytes(maxSize)}`}
									</p>
								</div>
							</div>
						)}
					</div>
				)}
			</Dropzone>
			{files?.length ? (
				<ScrollArea className='h-fit w-full px-3'>
					<div className='max-h-48 space-y-4'>
						{files?.map((file, index) => (
							<FileCard
								key={index}
								file={file}
								onRemove={() => onRemove(index)}
								progress={
									progresses?.[file.name]
								}
							/>
						))}
					</div>
				</ScrollArea>
			) : null}
		</div>
	)
}

interface FileCardProps {
	file: File | string
	onRemove: () => void
	progress?: number
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
	const isFile = file instanceof File
	const preview = isFile
		? isFileWithPreview(file)
			? file.preview
			: ''
		: (file as string)

	return (
		<div className='relative flex items-center space-x-4'>
			<div className='flex flex-1 space-x-4'>
				{preview ? (
					<Image
						src={preview}
						alt={isFile ? file.name : 'uploaded'}
						width={48}
						height={48}
						loading='lazy'
						className='aspect-square shrink-0 rounded-md object-cover'
					/>
				) : null}

				<div className='flex w-full flex-col gap-2'>
					<div className='space-y-px'>
						<p className='text-foreground/80 line-clamp-1 text-sm font-medium'>
							{isFile ? file.name : preview}
						</p>
						{isFile ? (
							<p className='text-muted-foreground text-xs'>
								{formatBytes(file.size)}
							</p>
						) : null}
					</div>
					{progress ? <Progress value={progress} /> : null}
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<Button
					type='button'
					variant='ghost'
					size='icon'
					onClick={onRemove}
					disabled={
						progress !== undefined && progress < 100
					}
					className='size-8 rounded-full'
				>
					<IconX className='text-muted-foreground' />
					<span className='sr-only'>Видалити файл</span>
				</Button>
			</div>
		</div>
	)
}

function isFileWithPreview(file: unknown): file is File & { preview: string } {
	if (typeof file === 'string') return false
	return typeof file === 'object' && file !== null && 'preview' in file
}
