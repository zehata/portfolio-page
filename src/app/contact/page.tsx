import SimpleButton from "@/components/common/Button";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";
import React from "react";

const ContactLayout = () => {
  return (
    <>
      <div className="absolute w-full h-full left-[-34vw] top-0 dynamic-background -z-2"></div>
      <div className="absolute top-[calc(50vh-10rem)] right-[calc(max(60vw/3,960vh/27)-min(30vw,12rem))] w-[min(60vw,24rem)] h-[30rem] -z-2 contact-open contact">
        <div className="absolute w-full h-[min(75%,25rem)] flex flex-col justify-end items-end">
          <div className="absolute top-0 left-0 w-full h-full bg-background opacity-80"></div>
          <div className="absolute top-0 left-0 w-full h-full border-white border-4 opacity-100 spiral z-1"></div>
          <div
            id="main-content"
            className="relative w-full h-full z-1 p-4 flex flex-col space-y-4 justify-end text-lg"
            tabIndex={0}
          >
            <section className="text-right">
              <h2 className="text-xl">{`Email`}</h2>
              <div className="flex justify-end items-center space-x-2">
                <span>{`zehata@gmail.com`}</span>
                <Link target="_blank" href="mailto:zehata@gmail.com">
                  <SimpleButton>
                    <Mail />
                  </SimpleButton>
                </Link>
              </div>
            </section>
            <section>
              <h2 className="text-xl">{`Mobile number`}</h2>
              <h2 className="text-xl">{`WhatsApp`}</h2>
              <div className="flex items-center space-x-2">
                <Link href="tel:+6591948901">
                  <SimpleButton>
                    <Phone />
                  </SimpleButton>
                </Link>
                <Link
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=6591948901"
                >
                  <SimpleButton>
                    <MessageCircle />
                  </SimpleButton>
                </Link>
                <span>{`(+65) 9194 8901`}</span>
              </div>
            </section>
            <section>
              <h2 className="text-xl">{`Telegram`}</h2>
              <div className="flex items-center space-x-2">
                <Link target="_blank" href="https://t.me/zehata">
                  <SimpleButton>
                    <Send />
                  </SimpleButton>
                </Link>
                <span>{`@zehata`}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="absolute top-[calc(50vh+12.5rem+max(0.5625vw,1vh))] right-[calc(max(60vw/3,960vh/27)-2px)] w-1 h-[calc(50dvh-15rem-max(6.1875vw,11vh))] bg-white opacity-75 contact-indicator animate-[1s_ease-in-out_wipe-up] -z-2" />
    </>
  );
};

export default ContactLayout;
