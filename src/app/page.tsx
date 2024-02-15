import Image from "next/image";
import ImgMainBanner from "~/assets/common/img_main_banner.jpg";
import UIListMovie from "~/components/UIListMovie";
import { config } from "~/configs";

const { dataMovie } = config;

export default function Home() {
  return (
    <main className="h-[110vh] max-w-full w-full">
      <div className="w-full relative h-[500px]">
        <div className="w-full h-full bg-[rgba(0,0,0,0.6)] relative ">
          <Image
            src={ImgMainBanner}
            width={500}
            height={500}
            alt="banner"
            className="object-contain w-full h-full"
          />
          <div className="absolute top-1/2 left-20 z-30">
            <h2 className="text-center mb-5 text-3xl uppercase text-white font-semibold">
              Start-Up
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 w-40 h-10 rounded-md bg-white text-black">
                Play
              </button>
              <button
                className="p-2 w-40 h-10 rounded-md  backdrop-blur-sm  text-white "
                style={{ backgroundColor: "rgb(109 109 110 / 70%)" }}
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" pb-32">
        <UIListMovie
          movieData={dataMovie}
          lengthList={7}
          title="Popular on Netflix"
        />

        <UIListMovie
          movieData={dataMovie}
          lengthList={7}
          title="Because you watched Start-Up"
        />

        <UIListMovie
          movieData={dataMovie}
          lengthList={7}
          title="Continue Watching"
        />
        <UIListMovie
          movieData={dataMovie}
          lengthList={7}
          title="Asian TV Shows"
        />
      </div>
    </main>
  );
}
