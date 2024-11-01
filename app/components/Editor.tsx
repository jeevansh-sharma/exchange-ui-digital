"use client";
import { Button } from "@/components/ui/button";
import {Editor, EditorContent,  JSONContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
export const Menu=({editor}:{editor:Editor|null})=>{
    if(!editor){
        return null
    }
    return(
    <div className="flex flex-wrap gap-5" >
        <Button type="button" onClick={()=>editor.chain().focus().toggleHeading({level:1}).run()}
            variant={editor.isActive("heading",{level:1})?"default":"secondary"}
            >
            H1
        </Button>
        <Button type="button" onClick={()=>editor.chain().focus().toggleHeading({level:2}).run()}
            variant={editor.isActive("heading",{level:2})?"default":"secondary"}
            >
            H2
        </Button>
        <Button type="button" onClick={()=>editor.chain().focus().toggleHeading({level:3}).run()}
            variant={editor.isActive("heading",{level:3})?"default":"secondary"}
            >
            H3
        </Button>
        <Button type="button" onClick={()=>editor.chain().focus().toggleBold().run()}
            variant={editor.isActive("bold")?"default":"secondary"}
            >
            BOLD
        </Button>
        <Button type="button" onClick={()=>editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive("italic")?"default":"secondary"}
            >
            ITALIC
        </Button>
        <Button type="button" onClick={()=>editor.chain().focus().toggleStrike().run()}
            variant={editor.isActive("strike")?"default":"secondary"}
            >
            STRIKE
        </Button>

    </div>

    );
}

export function TipTapEditor({setJson,json}:{setJson: any,json: JSONContent| null}){
    const editor=useEditor({
        extensions: [StarterKit],
        content: json??"<p>Hello world</p>",
        editorProps: {
            attributes:{
                class: "focus:outlin-none min-h-[150px] prose prose-sm sm:prose-base"
            }
        },
        onUpdate: ({editor})=>{
            setJson(editor.getJSON());
        },
        immediatelyRender: false,
    })
    return(
        <div className="flex flex-col ">
            <Menu editor={editor}/>
            <EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150px] mt-2"/>
        </div>
    )
}