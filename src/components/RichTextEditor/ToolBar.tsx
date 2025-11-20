"use client";

import { useState } from "react";
import {
  Link2,
  List,
  ChevronDown,
  Delete,
  ArrowDownFromLine,
  ArrowRightFromLine,
  Trash2,
} from "lucide-react";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
} from "lucide-react";
import { Table, Table as TableIcon } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function ToolBar({ editor }: { editor: Editor }) {
  const [isHeadingDropdownOpen, setHeadingDropdownOpen] = useState(false);
  const [isAlignDropdownOpen, setAlignDropdownOpen] = useState(false);
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addRow = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const addColumn = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const Options = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => addImage(),
      pressed: editor.isActive("image"),
    },
    {
      icon: <Link2 className="size-4" />,
      onClick: () => addLink(),
      pressed: editor.isActive("link"),
    },
    // {
    //   icon: <Table className="size-4" />,
    //   onClick: () => addTable(),
    //   pressed: false,
    // },
  ];

  return (
    <div className="border rounded-md p-2 mb-2 bg-slate-50 flex flex-wrap space-x-2 sticky top-10 z-50">
      {/* Headings Dropdown */}
      <div className="relative">
        <button
          type="button"
          className="flex items-center px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={() => setHeadingDropdownOpen(!isHeadingDropdownOpen)}
        >
          Headings <ChevronDown className="ml-1 size-4" />
        </button>
        {isHeadingDropdownOpen && (
          <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-md z-10">
            <button
              type="button"
              className="block w-full px-4 py-1 hover:bg-gray-100"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                setHeadingDropdownOpen(false);
              }}
            >
              <Heading1 size={18} className="inline mr-2" />
            </button>
            <button
              type="button"
              className="block w-full px-4 py-1 hover:bg-gray-100"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                setHeadingDropdownOpen(false);
              }}
            >
              <Heading2 size={16} className="inline mr-2" />
            </button>
            <button
              type="button"
              className="block w-full px-4 py-1 hover:bg-gray-100"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                setHeadingDropdownOpen(false);
              }}
            >
              <Heading3 size={14} className="inline mr-2" />
            </button>
          </div>
        )}
      </div>

      {/* Alignment Dropdown */}
      <div className="relative">
        <button
          type="button"
          className="flex items-center px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={() => setAlignDropdownOpen(!isAlignDropdownOpen)}
        >
          Align <ChevronDown className="ml-1 size-4" />
        </button>
        {isAlignDropdownOpen && (
          <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-md z-10">
            <button
              type="button"
              className="block w-full px-2 py-1 hover:bg-gray-100"
              onClick={() => {
                editor.chain().focus().setTextAlign("left").run();
                setAlignDropdownOpen(false);
              }}
            >
              <AlignLeft size={20} className="inline mr-2" />
            </button>
            <button
              type="button"
              className="block w-full px-2 py-1 hover:bg-gray-100"
              onClick={() => {
                editor.chain().focus().setTextAlign("center").run();
                setAlignDropdownOpen(false);
              }}
            >
              <AlignCenter size={20} className="inline mr-2" />
            </button>
            <button
              type="button"
              className="block w-full px-2 py-1 hover:bg-gray-100"
              onClick={() => {
                editor.chain().focus().setTextAlign("right").run();
                setAlignDropdownOpen(false);
              }}
            >
              <AlignRight size={20} className="inline mr-2" />
            </button>
          </div>
        )}
      </div>

      {/* Other Toggles */}
      {Options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
      {/* Alignment Dropdown */}
      <div className="relative">
        <button
          type="button"
          className="flex items-center px-2 py-2  rounded-md  hover:bg-gray-100"
          onClick={() => {
            setIsTableDropdownOpen(!isTableDropdownOpen);
          }}
        >
          <Table className="ml-1 size-4" />
        </button>
        {isTableDropdownOpen && (
          <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-md z-10">
            <button
              type="button"
              className="block w-full px-4 py-1 hover:bg-gray-100"
              onClick={() => {
                addTable();
                setIsTableDropdownOpen(false);
              }}
            >
              <Table className="inline mr-2 size-4" />
            </button>
            <button
              type="button"
              className="block w-full px-4 py-1 hover:bg-gray-100"
              onClick={() => {
                addRow();
                setIsTableDropdownOpen(false);
              }}
            >
              <ArrowDownFromLine size={18} className="inline mr-2" />
            </button>
            <button
              type="button"
              className="block w-full px-4 py-1 hover:bg-gray-100"
              onClick={() => {
                addColumn();
                setIsTableDropdownOpen(false);
              }}
            >
              <ArrowRightFromLine size={18} className="inline mr-2" />
            </button>
            <button
              type="button"
              className="block w-full px-4 py-1 hover:bg-gray-100"
              onClick={() => {
                deleteTable();
                setIsTableDropdownOpen(false);
              }}
            >
              <Trash2 size={18} className="inline mr-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";
// import { Link, Link2, List } from "lucide-react";
// import {
//   Heading1,
//   Heading2,
//   Heading3,
//   Code,
//   Bold,
//   Italic,
//   Strikethrough,
//   AlignCenter,
//   AlignLeft,
//   AlignRight,
//   Highlighter,
//   Upload,
// } from "lucide-react";
// import { Table, Table as TableIcon } from "lucide-react";
// import { ListOrdered } from "lucide-react";
// import { Toggle } from "../ui/toggle";

// import { Editor } from "@tiptap/react";

// export default function ToolBar({ editor }: { editor: Editor }) {
//   if (!editor) return null;
//   const addImage = () => {
//     const url = window.prompt("URL");
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   };

//   const addLink = () => {
//     const url = window.prompt("Enter the URL");
//     if (url) {
//       editor.chain().focus().setLink({ href: url }).run();
//     }
//   };

//   const removeLink = () => {
//     editor.chain().focus().unsetLink().run();
//   };

//   const addTable = () => {
//     editor
//       .chain()
//       .focus()
//       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
//       .run();
//   };

//   const addRow = () => {
//     editor.chain().focus().addRowAfter().run();
//   };

//   const addColumn = () => {
//     editor.chain().focus().addColumnAfter().run();
//   };

//   const deleteTable = () => {
//     editor.chain().focus().deleteTable().run();
//   };

//   const Options = [
//     {
//       icon: <Heading1 className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
//       preesed: editor.isActive("heading", { level: 1 }),
//     },
//     {
//       icon: <Heading2 className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
//       preesed: editor.isActive("heading", { level: 2 }),
//     },
//     {
//       icon: <Heading3 className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
//       preesed: editor.isActive("heading", { level: 3 }),
//     },
//     {
//       icon: <Bold className="size-4" />,
//       onClick: () => editor.chain().focus().toggleBold().run(),
//       preesed: editor.isActive("bold"),
//     },
//     {
//       icon: <Italic className="size-4" />,
//       onClick: () => editor.chain().focus().toggleItalic().run(),
//       preesed: editor.isActive("italic"),
//     },
//     {
//       icon: <Strikethrough className="size-4" />,
//       onClick: () => editor.chain().focus().toggleStrike().run(),
//       preesed: editor.isActive("strike"),
//     },
//     {
//       icon: <AlignLeft className="size-4" />,
//       onClick: () => editor.chain().focus().setTextAlign("left").run(),
//       preesed: editor.isActive({ textAlign: "left" }),
//     },
//     {
//       icon: <AlignCenter className="size-4" />,
//       onClick: () => editor.chain().focus().setTextAlign("center").run(),
//       preesed: editor.isActive({ textAlign: "center" }),
//     },
//     {
//       icon: <AlignRight className="size-4" />,
//       onClick: () => editor.chain().focus().setTextAlign("right").run(),
//       preesed: editor.isActive({ textAlign: "right" }),
//     },
//     {
//       icon: <List className="size-4" />,
//       onClick: () => editor.chain().focus().toggleBulletList().run(),
//       preesed: editor.isActive("bulletList"),
//     },
//     {
//       icon: <ListOrdered className="size-4" />,
//       onClick: () => editor.chain().focus().toggleOrderedList().run(),
//       preesed: editor.isActive("orderedList"),
//     },
//     {
//       icon: <Code className="size-4" />,
//       onClick: () => editor.chain().focus().toggleCodeBlock().run(),
//       preesed: editor.isActive("code"),
//     },
//     {
//       icon: <Highlighter className="size-4" />,
//       onClick: () => editor.chain().focus().toggleHighlight().run(),
//       preesed: editor.isActive("highlight"),
//     },
//     {
//       icon: <Upload className="size-4" />,
//       onClick: () => addImage(),
//       preesed: editor.isActive("image"),
//     },
//     {
//       icon: <Link2 className="size-4" />,
//       onClick: () => addLink(),
//       preesed: editor.isActive("link"),
//     },
//     {
//       icon: <Link className="size-4" />,
//       onClick: () => removeLink(),
//       preesed: false,
//     },
//     {
//       icon: <Table className="size-4" />,
//       onClick: () => addTable(),
//       preesed: false,
//     },
//     {
//       icon: <TableIcon className="size-4" />,
//       onClick: () => addRow(),
//       preesed: false,
//     },
//     {
//       icon: <TableIcon className="size-4" />,
//       onClick: () => addColumn(),
//       preesed: false,
//     },
//     {
//       icon: <Table className="size-4 text-red-500" />, // Red icon for delete
//       onClick: () => deleteTable(),
//       preesed: false,
//     },
//   ];

//   return (
//     <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky  top-10 z-50">
//       {Options.map((option, i) => (
//         <Toggle
//           key={i}
//           size="sm"
//           pressed={option.preesed}
//           onPressedChange={option.onClick}
//         >
//           {option.icon}
//         </Toggle>
//       ))}
//     </div>
//   );
// }
