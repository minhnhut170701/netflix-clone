"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MovieItem } from "~/modules/movieItem.type";

interface UIListMovieProps {
  movieData: Array<MovieItem>;
  title: string;
  lengthList: number;
}

function UIListMovie({ movieData, title, lengthList }: UIListMovieProps) {
  const [transForm, setTransForm] = useState(0);
  const [titleCheck, setTitleCheck] = useState(title);
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
    }, 500); // adjust the delay as needed

    setTimeoutId(id);
  };

  useEffect(() => {
    // add a mousemove event listener when the component mounts
    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // check if the mouse is over the component
      if (!target.closest(".ui-list-movie")) {
        setMovieDetail(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="max-w-full w-screen p-8 relative"
      onMouseLeave={() => setMovieDetail(null)}
    >
      <h3 className="text-white text-xl font-bold uppercase my-4">{title}</h3>
      <div className="w-full">
        <div
          className={`flex space-x-1 w-full`}
          style={{ transform: `translateX(${transForm}px)` }}
        >
          {movieData
            .slice(0, lengthList)
            .map((movie: MovieItem, index: number) => (
              <div
                key={index}
                className="group w-[25%] lg:w-[33%] cursor-pointer h-[100px] overflow-hidden"
                onMouseEnter={(event) => handlePosition(movie, event)}
                onMouseLeave={() => setMovieDetail(null)}
              >
                <Image
                  src={movie.img}
                  alt={movie.name}
                  width={500}
                  height={500}
                  className="transition-all duration-500  w-full"
                />
              </div>
            ))}
        </div>
        {movieDetail && (
          <div
            className="absolute scale-125 z-50 w-[200px]  text-white shadow-xl rounded-lg bg-black text-xs transition-all duration-500 delay-200 "
            style={{
              zIndex: 99999,
              left: positionModal.x - 10, // subtract half the width of the modal
              top: 50, // subtract half the height of the modal
            }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              setMovieDetail(movieDetail);
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

        {/* <div className="absolute top-0 flex items-center right-0 w-30 h-full bg-black text-white">
          <button onClick={() => setTransForm((prev) => (prev += 20))}>
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default UIListMovie;
