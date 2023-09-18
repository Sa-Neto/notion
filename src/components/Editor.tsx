import { useEditor, EditorContent,BubbleMenu, FloatingMenu} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowLight from '@tiptap/extension-code-block-lowlight'
import { initialContent } from './initialContent';
import js from 'highlight.js/lib/languages/javascript';
import { lowlight } from 'lowlight';
import {
    RxFontBold,
    RxFontItalic,
    RxStrikethrough,
    RxCode,
    RxChatBubble,
    RxChevronDown,
} from 'react-icons/rx';

import 'highlight.js/styles/tokyo-night-dark.css'
import { BubbleButton } from './BubbleButton';

lowlight.registerLanguage('js', js)

export function Editor() {

const editor = useEditor({ 
        extensions : [StarterKit,
        CodeBlockLowLight.configure({
            lowlight,
        }),
    ],
        content : initialContent,
        editorProps:{
            attributes:{
                class:'outline-none',
            }
        }
    })
    
    return (
        <>
            <EditorContent
            className='max-w-[700px] mx-auto pt-16 prose prose-invert prose-violet'
            editor={editor}
        />
        {editor && (
            <FloatingMenu
                className='bg-zinc-700 py-2 px-1 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col '
                editor={editor}
                shouldShow={({state}) => {
                    const {$from} = state.selection
                    const currentLineText = $from.nodeBefore?.textContent
                    
                    return currentLineText === '/'          
                }}
            >
                <button className='flex items-center gap-2 p-1 rounded min-2-[200px] houver:bg-zinc-600'>
                    <img
                        src='http://www.notion.so/images/blocks/text/en-US.png'
                        alt='Text'
                    />
                    <div className='flex flex-col text-left'>
                        <p className='text-white text-sm'>Text</p>
                        <span className='text-white text-xs'>Just start writing with plain text.</span>
                    </div>
                </button>
            </FloatingMenu>
        )}
        {editor && (
            <BubbleMenu className='bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-x-zinc-600' editor={editor}>
                <BubbleButton>
                    Text
                    <RxChevronDown className="w-4 h-4" />
                </BubbleButton>
                <BubbleButton>
                    <RxChatBubble className="w-4 h-4" />
                    Comment
                </BubbleButton>

                <div className="flex items-center">
                <BubbleButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-active={editor.isActive('bold')}   
                >
                    <RxFontBold className="w-4 h-4" />
                </BubbleButton>
                <BubbleButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    data-active={editor.isActive('italic')}
                >
                    <RxFontItalic className="w-4 h-4" />
                </BubbleButton>
                <BubbleButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    data-active={editor.isActive('strike')}
                >
                    <RxStrikethrough className="w-4 h-4" />
                </BubbleButton>
                <BubbleButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    data-active={editor.isActive('code')}
                >
                    <RxCode className="w-4 h-4" />
                </BubbleButton>
                </div>
            </BubbleMenu>

        )}
        </>
    )
}