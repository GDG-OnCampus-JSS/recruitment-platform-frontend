import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

function task() {
  return (
    <div className="min-h-screen space-y-6 p-6 pb-[200px] pt-12">
      <div className="w-full bg-white">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="text=[#2F3B00] font-product-sans flex items-center gap-2 rounded-3xl border px-4 py-2 text-[16px] font-normal leading-5"
            >
              <span>←</span> Back
            </Button>
          </Link>
          <h1 className="font-product-sans absolute left-[80%] -translate-x-1/2 transform text-xl font-medium">
            Tasks
          </h1>
          <div className="w-[82px]" />
        </div>
      </div>
      <h2 className="font-product-sans pb-2 text-[28px] font-bold leading-[33.96px] text-[#454545]">
        Do any one of the following
      </h2>

      <div className="mx-auto max-w-[1120px] space-y-8">
        <div className="space-y-6">
          <h3 className="font-product-sans text-[28px] font-medium leading-[33.96px]">
            Frontend (Clone)
          </h3>

          <div className="font-product-sans space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:gap-0">
              <div className="pr-4 text-[16px] font-normal leading-[25.6px] text-[#353535] md:h-[125px]">
                <p>This task will assess your abilities of developing UI.</p>
                <p>
                  You need to navigate to{' '}
                  <Link
                    href="https://slack.com/intl/en-in"
                    className="text-[#6B83FF] underline"
                    target="_blank"
                  >
                    https://slack.com/intl/en-in
                  </Link>{' '}
                  and clone the UI of this page using HTML, CSS and JS.
                </p>
                <p>
                  Your main focus for the task would be on frontend, and it's fine if you don't use
                  any backend or mock the backend data using JSON.
                </p>
              </div>

              <Image
                src="/"
                alt="Slack "
                width={400}
                height={200}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <Card className="bg-custom-card-gradient w-full md:w-[550px]">
              <CardHeader>
                <CardTitle className="text-[20px] font-bold leading-[24.6px] text-[#6B83FF]">
                  Judgement Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc space-y-2 pl-4 text-sm text-[#353535]">
                  <li>Similarities on your developed page with the existing one</li>
                  <li>Responsiveness of the layout</li>
                  <li>Usage of JavaScript (if familiar) for interactivity</li>
                  <li>Code Quality</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-custom-card-gradient w-full md:w-[550px]">
              <CardHeader>
                <CardTitle className="text-[20px] font-bold leading-[24.6px] text-[#6B83FF]">
                  Brownie Points
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc space-y-2 pl-4 text-sm text-[#353535]">
                  <li>Hosted demo would give some extra points</li>
                  <li>Use of Vue.JS or React.JS</li>
                  <li>You can use UI libraries like Bootstrap, Materialize etc</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-center py-6">
          <div className="h-[1px] w-full bg-gray-200"></div>
          <div className="bg-white px-8 text-base font-bold text-[#7D92FE]">OR</div>
          <div className="h-[1px] w-full bg-gray-200"></div>
        </div>

        <div className="space-y-6">
          <h3 className="font-product-sans text-[28px] font-medium leading-[33.96px]">Backend</h3>

          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-[550px]">
                <ol className="font-product-sans list-decimal pl-4 text-[16px] font-normal leading-[25.6px] text-[#353535] md:h-[150px] md:w-[500px]">
                  <li>You have to implement a simple CRUD operation</li>
                  <li>
                    If you are implementing the authentication (Login & signup APIs) will be marked
                    as additional
                  </li>
                  <li>Use database to save the details</li>
                  <li>You can test your APIs in the postman</li>
                  <li>Choose a reliable framework for the task</li>
                </ol>

                <p className="font-product-sans pt-2 text-[16px] font-normal italic leading-[19.6px] text-[#454545]">
                  You can use a JSON file if you don't want to use a database!
                </p>
              </div>

              <div className="font-product-sans mb-6 w-full text-[16px] font-normal leading-[25.6px] md:h-[125px] md:w-[550px]">
                <h3 className="mb-3 text-[#6B83FF]">
                  Some key points to keep in mind while writing code
                </h3>
                <ul className="list-disc space-y-2 pl-4 text-[#353535]">
                  <li>Try to write clean code and have proper comments</li>
                  <li>
                    Split the Code into folders (like controllers, routers, etc) to keep the code
                    modular
                  </li>
                  <li>Use appropriate variable names don't use general names</li>
                </ul>
              </div>
            </div>

            <div className="font-product-sans rounded bg-gray-50 p-4 text-[16px] font-normal leading-[25.6px]">
              <h3 className="mb-2 text-[#6B83FF]">Where to Submit?</h3>
              <p className="text-[#353535]">
                Create a GitHub Repository and push the code to that repository and submit the link
                of the repository.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <Card className="bg-custom-card-gradient w-full md:w-[550px]">
                <CardHeader>
                  <CardTitle className="text-[20px] font-bold leading-[24.6px] text-[#6B83FF]">
                    Judgement Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc space-y-2 pl-4 text-sm text-[#353535]">
                    <li>Similarities on your developed page with the existing one.</li>
                    <li>Responsiveness of the layout.</li>
                    <li>Usage of JavaScript (if familiar) for interactivity.</li>
                    <li>Code Quality</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-custom-card-gradient w-full md:w-[550px]">
                <CardHeader>
                  <CardTitle className="text-[20px] font-bold leading-[24.6px] text-[#6B83FF]">
                    Brownie Points
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc space-y-2 pl-4 text-sm text-[#353535]">
                    <li>Hosted demo would give some extra points.</li>
                    <li>Use of VueJS or ReactJS.</li>
                    <li>You can use UI libraries like Bootstrap, Materialize etc.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default task;
