import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";
import '../../../css/notes.css'

const Editor = ({ data, onChange, editorblock}) => {
  const ref = useRef();
  //Initialize editorjs
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,

        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(JSON.stringify(data));
        }
      });
      ref.current = editor;
    }

    //Add a return function to handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);
  const handleClear = () => {
    if (ref.current) {
      ref.current.clear();
    }
  };
  return (<>
    <div className="editor-container" id={editorblock}/>
    <button type="button" onClick={handleClear} className="clearBtn">Clear</button>
    </>
  );
};

export default memo(Editor);
