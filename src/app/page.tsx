'use client';
// import { Analytics } from '@vercel/analytics/react';
import { useScroll, useTransform, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import Header from '@/components/common/header-landing';
import PrimaryButton from '@/components/common/primary-button';
import Footer from '@/components/dashboardlayout/footer';
import { Banner, CTA, Logo } from '@/components/home/Banner';
import { Card } from '@/components/home/Card';
import { JourneyStep } from '@/components/home/JourneySteps';
import VerticalStepper from '@/components/home/VerticalStepper';
import { cardData, journeySteps, stepColors } from '@/constants/homePageConstants';
import { isRegistrationDisabled } from '@/constants/registration';
import useUserStore from '@/stores/userStore';

const currentStep = 4;

export default function Home() {
  const { user } = useUserStore();
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker Registered:', registration);
        })
        .catch((err) => {
          console.error('Service Worker Registration Failed:', err);
        });
    }
  }, []);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      <Header />
      {/* <SmoothScroll> */}
      <section className="will-change-opacity sticky top-0 grid h-full min-h-screen w-full place-content-center overflow-hidden bg-[url('/home/bg-1.png')] bg-cover bg-no-repeat leading-[1em] contain-strict">
        <div className="group absolute h-screen w-screen bg-slate-100/10 backdrop-blur-lg md:backdrop-blur-none"></div>
        <motion.div style={{ opacity }} className="relative z-10">
          <motion.div style={{ scale }}>
            <div className="group absolute h-screen w-screen bg-slate-100/10 will-change-transform"></div>
            <Logo />
            <Banner className="w-fit" />
            <CTA />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative grid min-h-screen place-content-center rounded-t-[3rem] border-t-8 bg-white pb-28 pt-10 xl:mb-0">
        <h1 className="mb-12 text-center text-4xl">
          Our <span className="font-playfair font-medium italic">domains</span>
        </h1>
        <div className="mx-auto flex max-w-[73rem] flex-wrap justify-center gap-5 px-6">
          {cardData.map((card, i) => {
            return (
              <Card
                key={i}
                className={card.className}
                descriptionClass={card.descriptionClass}
                title={card.title}
                description={card.description}
                decorComponent={<card.decorComponent />}
                logoComponent={<card.logoComponent />}
              />
            );
          })}
        </div>
      </section>

      <section className="relative flex min-h-screen flex-col items-center justify-center gap-y-8 overflow-x-hidden bg-white bg-home-2 bg-cover bg-no-repeat">
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
            totalSteps={6}
            currentStep={currentStep}
            className="absolute left-10 top-2 md:-top-4 md:left-[20rem]"
            stepColors={stepColors}
          />
        </div>
      </section>

      <section className="relative bg-white py-[3.12rem] md:px-8">
        <div className="mx-auto grid max-w-[70rem] place-content-center bg-gradient-1 p-10 text-center md:rounded-2xl">
          <h1 className="text-3xl font-medium">
            Your chance to be a part of an extraordinary team!
          </h1>
          <p className="mt-4 max-w-[56.4rem] text-secondary-foreground">
            Join the recruitment drive at GDG and become part of a dynamic community where you can
            learn, grow, and create. Whether you're a developer, designer, or simply passionate
            about technology, there's a place for you here.
          </p>
          {user ? (
            <PrimaryButton href="/dashboard" className="mx-auto mt-4 w-fit">
              Dashboard
            </PrimaryButton>
          ) : (
            <PrimaryButton
              href="/register"
              className="mx-auto mt-4 w-fit"
              disabled={isRegistrationDisabled}
            >
              Register
            </PrimaryButton>
          )}
        </div>
      </section>

      <section className="relative bg-white">
        <Footer />
      </section>
      {/* </SmoothScroll> */}
    </>
  );
}
