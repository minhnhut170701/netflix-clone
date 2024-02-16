"use client";
import React, { useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import { MovieItem } from "~/modules/movieItem.type";

interface UIListMovieProps {
  movieData: Array<MovieItem>;
  title: string;
  lengthList: number;
}

function UIListMovie({ movieData, title, lengthList }: UIListMovieProps) {
  const [movieDetail, setMovieDetail] = useState<MovieItem | null>(null);
  const [positionModal, setPositionModal] = useState({ x: 0, y: 0 });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  function genreConvert(genre: string) {
    return genre.split(", ").map((item, index) => (
      <p key={index} className="flex items-center space-x-2">
        <span className=" text-gray-400">{item}</span>
        {index < genre.split(", ").length - 1 ? (
          <p className="p-1 rounded-full bg-gray-400"></p>
        ) : (
          ""
        )}
      </p>
    ));
  }

  const handlePosition = (
    movie: MovieItem,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setMovieDetail(null);

    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    setPositionModal({ x: rect.left, y: rect.top });
    // add a delay before showing the modal
    const id = setTimeout(() => {
      setMovieDetail(movie);
    }, 700); // adjust the delay as needed

    setTimeoutId(id);
  };

  return (
    <div
      className=" w-full p-8 relative h-[300px] md:h-[250px] lg:h-[200px] "
      onMouseLeave={() => {
        setMovieDetail(null);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }}
    >
      <h3 className="text-white text-xl font-bold uppercase my-4">{title}</h3>
      <div className="w-full">
        <div className={`relative`}>
          <Splide
            hasTrack={false}
            options={{
              rewind: true,
              // perPage: 5,
              // perMove: 2,
              loop: true,
              drag: false,
              gap: "5px",
              width: "100%",
              pagination: false,
              fixedWidth: 210,
              fixedHeight: 180,
            }}
          >
            <SplideTrack>
              {movieData
                .slice(0, lengthList)
                .map((movie: MovieItem, index: number) => (
                  <SplideSlide key={index} className="group cursor-pointer">
                    <div
                      onMouseEnter={(event: any) =>
                        handlePosition(movie, event)
                      }
                    >
                      <Image
                        src={movie.img}
                        alt={movie.name}
                        width={500}
                        height={500}
                        className="transition-all duration-1000 hover:scale-110 w-[33%] "
                      />
                    </div>
                  </SplideSlide>
                ))}
            </SplideTrack>
            <div className="splide__arrows  ">
              <div
                className="absolute bg-gray-50 bg-opacity-40 top-0 -right-[3.1rem] w-[80px] h-[118px] z-40"
                onMouseEnter={() => {
                  setMovieDetail(null);
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }
                }}
              >
                <button className="splide__arrow splide__arrow--next w-full h-full outline-none">
                  Next
                </button>
              </div>
              <div
                className="absolute bg-gray-50 bg-opacity-40  top-0 -left-10 w-[80px] h-[118px] z-40"
                onMouseEnter={() => {
                  setMovieDetail(null);
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }
                }}
              >
                <button className="splide__arrow splide__arrow--prev w-full h-full outline-none">
                  Prev
                </button>
              </div>
            </div>
          </Splide>
          {/* <div
            className="absolute top-0 flex items-center right-0 justify-center w-12 h-full bg-gray-50 bg-opacity-40 text-white cursor-pointer splide__arrows"
            onMouseEnter={(e) => {
              setMovieDetail(null);
              e.stopPropagation();
            }}
          >
            <button
              onClick={() => {
                if (transForm < (lengthList - 7) * 200) {
                  // adjust the number based on your item width and number of items per view
                  setTransForm((prev) => (prev += 200));
                } else {
                  setTransForm(0);
                }
              }}
            >
              Next
            </button>
          </div>
          <div className="absolute bg-gray-50 bg-opacity-40 top-0 -right-[3.1rem] w-[50px] h-full z-40" />
          <div className="absolute bg-gray-50 bg-opacity-40  top-0 -left-10 w-[50px] h-full z-40" /> */}
        </div>

        {movieDetail && (
          <div
            className="absolute scale-125 z-50 w-[200px]  text-white shadow-xl rounded-lg bg-black text-xs"
            style={{
              zIndex: 99999,
              left: positionModal.x - 10, // subtract half the width of the modal
              top: 50, // subtract half the height of the modal
            }}
            onMouseEnter={(event) => {
              event.stopPropagation();
            }}
            onMouseLeave={() => setMovieDetail(null)}
          >
            <Image
              src={movieDetail.img}
              alt={movieDetail.name}
              width={500}
              height={500}
              className="w-full h-full object-contain rounded-ss-lg rounded-se-lg"
            />
            <div className="p-2 w-full flex justify-between items-center relative">
              <p className="flex items-center space-x-2">
                <span>Play</span>
                <span>Save</span>
                <span>Like</span>
              </p>
              <button>More Info</button>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <h4>97% Match</h4>
              <p>13+</p>
              <p>{movieDetail.episode}</p>
              <p>HD</p>
            </div>
            <div className="flex items-center space-x-2 p-2 text-[8px]">
              {genreConvert(movieDetail.genre)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UIListMovie;
