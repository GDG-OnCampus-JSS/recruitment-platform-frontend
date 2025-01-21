import { Banner } from '@/components/home/Banner';
import { Card } from '@/components/home/Card';
import { JourneyStep } from '@/components/home/JourneySteps';
import ShinyText from '@/components/home/ShinyText';
import VerticalStepper from '@/components/home/VerticalStepper';
import Button from '@/components/home/Button';
import { cardData, journeySteps, stepColors } from '@/constants/homePageConstants';
import { Cursor } from '@/components/common/cursor';
import Image from 'next/image';

// Steps of the Vertical Stepper thing
const currentStep = 3;

export default function Home() {
  return (
    <>
      <section className="relative grid min-h-screen place-content-center overflow-x-hidden bg-home-1 bg-cover bg-no-repeat">
        <div className="group absolute h-screen w-screen bg-slate-100/10 backdrop-blur-lg md:backdrop-blur-none"></div>
        <div className="z-10 mx-auto rounded-3xl border border-main bg-white px-5 py-1">
          <ShinyText text="Google Developer Groups" className="text-[#a50000a4]" />
        </div>
        <Banner className="w-fit" />
        <p className="z-10 mt-10 text-center text-xl text-secondary-foreground">
          Your Journey to GDG begins here!
        </p>
        <Button href="/register" className="z-10">
          <Cursor
            attachToParent
            variants={{
              initial: { scale: 0.3, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.3, opacity: 0 },
            }}
            transition={{
              ease: 'easeInOut',
              duration: 0.15,
            }}
            className="left-14 top-4"
          >
            <div>
              <Image src="/icons/cursor-1.svg" height={30} width={30} alt="cursor" />
              <div className="ml-8 mt-1 rounded-[4px] bg-blue-100/10 px-2 py-1 font-mono text-xs font-normal text-neutral-800 backdrop-blur">
                Register Now! 🥳
              </div>
            </div>
          </Cursor>
          Register
        </Button>
      </section>

      <section className="mt-[3.5rem] grid min-h-screen place-content-center">
        <h1 className="mb-8 text-center text-4xl">
          Our <span className="font-playfair font-medium italic">domains</span>
        </h1>
        <div className="mx-auto flex max-w-[71rem] flex-wrap justify-center gap-5 px-6">
          {cardData.map((card, i) => (
            <Card
              key={i}
              className={card.className}
              descriptionClass={card.descriptionClass}
              title={card.title}
              description={card.description}
              logoImageSrc={card.logoImageSrc}
              decorImageSrc={card.decorImageSrc}
            />
          ))}
        </div>
      </section>

      <section className="relative flex min-h-screen flex-col items-center justify-center gap-y-8 overflow-x-hidden bg-home-2 bg-cover bg-no-repeat">
        <div className="group absolute h-screen w-screen bg-slate-100/10 backdrop-blur-sm md:backdrop-blur-none"></div>
        <h1 className="rounded-2xl bg-blue-100/10 p-3 text-4xl backdrop-blur-sm sm:bg-transparent md:rounded-none md:p-0">
          Journey <span className="font-playfair font-medium italic">steps</span>
        </h1>
        <div className="relative w-full max-w-[52rem] space-y-8 pl-24 pr-4 md:px-10 lg:ml-[11rem]">
          {journeySteps.map((step) => (
            <JourneyStep
              key={step.id}
              title={step.title}
              description={step.description}
              duration={step.duration}
              accentColor={step.accentColor}
              iconSrc={step.iconSrc}
            />
          ))}
          <VerticalStepper
            totalSteps={5}
            currentStep={currentStep}
            className="absolute left-10 top-2 md:-top-4 md:left-[20rem]"
            stepColors={stepColors}
          />
        </div>
      </section>

      <section className="my-[3.12rem] md:px-8">
        <div className="mx-auto grid max-w-[71rem] animate-gradient-1 place-content-center bg-gradient-1 bg-[length:200%_200%] p-10 text-center md:rounded-2xl">
          <h1 className="text-3xl font-medium">Your chance to be a part of extraordinary team!</h1>
          <p className="mt-4 max-w-[56.4rem] text-secondary-foreground">
            Join the recruitment drive at GDG and become part of a dynamic community where you can
            learn, grow, and create. Whether you're a developer, designer, or simply passionate
            about technology, there's a place for you here.
          </p>
          <Button href="/register">
            <Cursor
              attachToParent
              variants={{
                initial: { scale: 0.3, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.3, opacity: 0 },
              }}
              transition={{
                ease: 'easeInOut',
                duration: 0.15,
              }}
              className="left-14 top-4"
            >
              <div>
                <Image src="/icons/cursor-1.svg" height={30} width={30} alt="cursor" />
                <div className="ml-8 mt-1 rounded-[4px] bg-blue-100/30 px-2 py-1 font-mono text-xs font-normal text-neutral-800 backdrop-blur">
                  Register Now! 🥳
                </div>
              </div>
            </Cursor>
            Register
          </Button>
        </div>
      </section>
    </>
  );
}
