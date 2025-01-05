'use client';

import CodeEditor from '@/components/common/code-editor';
import { useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const EditorPage = () => {
  const [code, setCode] = useState<string | undefined>('// some code here');

  const handleOnEditorChange = (value: string | undefined) => {
    console.log(code);
    setCode(value);
  };

  return (
    <>
      <div></div>
      <div className="h-[80vh] w-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-screen rounded-lg border"
        >
          <ResizablePanel defaultSize={38}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={62}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={65}>
                <div className="w-full">
                  <CodeEditor
                    handleOnEditorChange={handleOnEditorChange}
                    defaultCode={code}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={35}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default EditorPage;
