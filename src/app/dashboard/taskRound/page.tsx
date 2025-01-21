import React from 'react'
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link';

function task() {
  return (
    <div className="min-h-screen  p-6 space-y-6 pt-12 pb-[200px]">
       <div className="w-full bg-white ">
        <div className="max-w-[1120px] mx-auto py-4 px-6 flex justify-between items-center">
          <Link href="/dashboard">
          <Button variant="outline" className="border  rounded-3xl px-4 py-2 flex items-center gap-2 font-sans font-normal text-[16px] leading-5 text=[#2F3B00]">
              <span>←</span> Back
            </Button>
          </Link>
          <h1 className="font-sans text-xl font-medium absolute left-[80%] transform -translate-x-1/2">Tasks</h1>
          <div className="w-[82px]" />
        </div>
      </div>
      <h2 className='font-sans font-bold text-[28px] leading-[33.96px] text-[#454545] pb-2'>Do any one of the following</h2>


      <div className=" max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-6 relative">
        {/* Frontend Task Card */}
        <div className="h-full flex flex-col">
            
          <Card className="flex-1">
            <CardHeader className='font-sans'>
              <CardTitle className='font-medium text-[28px] leading-[33.96px]'>Frontend (Clone)</CardTitle>
              
            </CardHeader>
            <CardContent>
                
              <div className="space-y-4 font-sans ">
             <div className='font-normal text-[16px] leading-[25.6px] text-[#353535]'>
                 <p> This task will assess your abilities of developing UI.</p>
                <p >
                  You need to navigate to{' '}
                  <Link href="/" className="text-[#6B83FF] underline" target="_blank">
                    https://slack.com/intl/en-in
                  </Link>
                  {' '}and clone the UI of this page using HTML, CSS and JS.
                </p>
                <p >
                  Your main focus for the task would be on frontend, and it's fine if you don't use any backend or mock the backend data using JSON.
                </p>
                </div>
                <div className="space-y-4">
                  <Image
                    src="/slack-screenshot.png"
                    alt=" Interface"
                    width={600}
                    height={450}
                    className="rounded-lg shadow-md w-full"
                  />
                  
                  <Card className='bg-custom-card-gradient'>
            <CardHeader>
              <CardTitle className="text-[#6B83FF] text-[20px] leading-[24.6px] font-bold">Judgement Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-4 text-sm text-[#353535] space-y-2">
                <li>Similarities on your developed page with the existing one</li>
                <li>Responsiveness of the layout</li>
                <li>Usage of JavaScript (if familiar) for interactivity</li>
                <li>Code Quality</li>
              </ul>
            </CardContent>
          </Card>

          <Card className='bg-custom-card-gradient'>
            <CardHeader>
              <CardTitle className="text-[#6B83FF] text-[20px] leading-[24.6px] font-bold">Brownie Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-4 text-sm text-[#353535] space-y-2">
                <li>Hosted demo would give some extra points</li>
                <li>Use of Vue.JS or React.JS</li>
                <li>You can use UI libraries like Bootstrap, Materialize etc</li>
              </ul>
            </CardContent>
          </Card>
                </div>
              </div>
            </CardContent>
          </Card> 
        </div>

        <div className="hidden lg:flex items-center justify-center">
  <div className="flex flex-col items-center gap-4">
    <div className="w-[1px] h-[54px] bg-gray-200" />
    <div className="bg-white px-4 py-2 text-[#7D92FE] font-bold text-base ">
      OR
    </div>
    <div className="w-[1px] h-[54px] bg-gray-200" />
  </div>
</div>

        {/* Backend Task Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className='font-medium text-[28px] leading-[33.96px]'>Backend</CardTitle>
              
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-4 text-[16px] font-sans font-normal leading-[25.6px] text-[#353535] space-y-2">
                <li>You have to implement a simple CRUD operation</li>
                <li>If you are implementing the authentication (Login & signup APIs) will be marked as additional</li>
                <li>Use database to save the details</li>
                <li>You can test your APIs in the postman</li>
                <li>Choose a reliable framework for the task</li>
              </ol>
              <p className="text-[16px] leading-[19.6px] font-sans font-normal text-[#353535] italic">
                You can use a JSON file if you don't want to use a database!
              </p>

              <div className="mb-6 font-sans font-normal text-[16px] leading-[25.6px]">
            <h3 className="text-[#6B83FF]  mb-3">Some key points to keep in mind while writing code</h3>
            <ul className="list-disc pl-4  text-[#353535] space-y-2">
              <li>Try to write clean code and have proper comments</li>
              <li>Split the Code into folders (like controllers, routers, etc) to keep the code modular</li>
              <li>Use appropriate variable names don't use general names</li>
            </ul>
          </div>

              <div className="bg-gray-50  font-sans font-normal text-[16px] leading-[25.6px] p-4 rounded">
            <h3 className=" mb-2 text-[#6B83FF]">Where to Submit?</h3>
            <p className=" text-[#353535]">
              Create a GitHub Repository and push the code to that repository and submit the link of the repository.
            </p>
          </div>

              <Card className='bg-custom-card-gradient font-sans'>
            <CardHeader>
              <CardTitle className="text-[#6B83FF] text-[20px]  leading-[24.6px] font-bold">Judgement Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-4 text-sm text-[#353535] font-normal space-y-2">
                <li>Similarities on your developed page with the existing one</li>
                <li>Responsiveness of the layout</li>
                <li>Usage of JavaScript (if familiar) for interactivity</li>
                <li>Code Quality</li>
              </ul>
            </CardContent>
          </Card>

          <Card className='bg-custom-card-gradient'>
            <CardHeader>
              <CardTitle className=" text-[#6B83FF] text-[20px] leading-[24.6px] font-bold">Brownie Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-4 text-sm text-[#353535] font-normal space-y-2">
                <li>Hosted demo would give some extra points</li>
                <li>Use of Vue.JS or React.JS</li>
                <li>You can use UI libraries like Bootstrap, Materialize etc</li>
              </ul>
            </CardContent>
          </Card>
            </CardContent>
          </Card>  
        </div>
      </div> 
    </div>
  )
}


export default task
