// 'use client';

// import { useEffect, useState } from 'react';
// import { postApi } from '@/api/api';
// import CodeEditor from '@/components/common/code-editor';
// import OptionsSelect from '@/components/common/options-select';
// import { Button } from '@/components/ui/button';
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
// import { statusCode } from '@/constants/apiStatus';
// import { languagesData } from '@/constants/languageData';

// const EditorPage = () => {
//   const [code, setCode] = useState<string>('Select a language to start coding');
//   const [languageSelected, setLanguageSelected] = useState<string | undefined>();
//   const [output, setOutput] = useState<string>('');

//   // Find the selected language object
//   const selectedLanguage = languageSelected
//     ? languagesData.find((lang) => lang.id === parseInt(languageSelected))
//     : undefined;

//   const handleOnEditorChange = (value: string) => {
//     setCode(value);
//   };

//   const submitCode = async () => {
//     if (selectedLanguage) {
//       const { status, data } = await postApi(
//         'http://13.233.100.121:2358/submissions/?base64_encoded=false&wait=true',
//         {
//           source_code: code,
//           language_id: selectedLanguage.id,
//         },
//       );
//       if (status === statusCode.Created201) {
//         setOutput(data.stdout || data.compile_output || data.message || 'No output');
//       }
//     }
//   };

//   useEffect(() => {
//     if (selectedLanguage) {
//       setCode(selectedLanguage.boilerPlateCode || 'Select a language to start coding');
//     }
//   }, [languageSelected]);

//   return (
//     <>
//       <div className="flex items-center justify-between p-4">
//         {/* <OptionsSelect
//           value={languageSelected}
//           // name="language"
//           onSelectionChange={setLanguageSelected}
//           options={languagesData}
//           placeholder={'Select Language'}
//           valueLabel="id"
//           itemLabel="name"
//         /> */}

//         {/* <OptionsSelect
//           name="year"
//           label="Academic Year"
//           placeholder="Select your academic year"
//           isAsterisk
//           options={academicYearOptions}
//         /> */}
//         <Button onClick={submitCode} className="bg-blue-500 text-white">
//           Submit
//         </Button>
//       </div>
//       <div className="h-[80vh] w-full">
//         <ResizablePanelGroup direction="horizontal" className="h-screen rounded-lg border">
//           <ResizablePanel defaultSize={38}>
//             <div className="flex h-full items-center justify-center p-6">
//               <span className="font-semibold">One</span>
//             </div>
//           </ResizablePanel>
//           <ResizableHandle />
//           <ResizablePanel defaultSize={62}>
//             <ResizablePanelGroup direction="vertical">
//               <ResizablePanel defaultSize={65}>
//                 <div className="w-full">
//                   <CodeEditor
//                     handleOnEditorChange={handleOnEditorChange}
//                     code={code}
//                     language={selectedLanguage?.monacoLanguage}
//                   />
//                 </div>
//               </ResizablePanel>
//               <ResizableHandle />
//               <ResizablePanel defaultSize={35}>
//                 <div className="flex h-full items-center justify-center p-6">
//                   <span className="font-semibold">{output}</span>
//                 </div>
//               </ResizablePanel>
//             </ResizablePanelGroup>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </>
//   );
// };

// export default EditorPage;
