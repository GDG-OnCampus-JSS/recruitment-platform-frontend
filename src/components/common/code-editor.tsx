'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  handleOnEditorChange: (value: string | undefined) => void;
  defaultCode?: string;
  defaultLanguage?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  handleOnEditorChange,
  defaultCode = '// some code here',
  defaultLanguage = 'javascript',
}) => {
  return (
    <>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage={defaultLanguage}
        defaultValue={defaultCode}
        options={{
          selectOnLineNumbers: true,
          fontSize: 16,
          minimap: { enabled: false },
        }}
        onChange={handleOnEditorChange}
      />
    </>
  );
};

export default CodeEditor;
