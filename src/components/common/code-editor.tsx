'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  handleOnEditorChange: (value: string) => void;
  code?: string;
  language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  handleOnEditorChange,
  code = 'Select a language to start coding',
  language = 'plaintext',
}) => {
  return (
    <Editor
      height={'100vh'}
      theme="vs-dark"
      language={language}
      value={code}
      options={{
        selectOnLineNumbers: true,
        fontSize: 16,
        minimap: { enabled: false },
      }}
      onChange={(value) => handleOnEditorChange(value || '')}
    />
  );
};

export default CodeEditor;
