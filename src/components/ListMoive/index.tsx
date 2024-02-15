"use client";
import React, { useState } from "react";
import UIListMovie from "../UIListMovie";
import { MovieItem } from "~/modules/movieItem.type";

interface ListMovieProps {
  dataMovie: any;
}

function ListMovie({ dataMovie }: ListMovieProps) {
  const [movieDetail, setMovieDetail] = useState<MovieItem | null>(null);
  return (
    <div className=" pb-32">
      <UIListMovie
        movieData={dataMovie}
        lengthList={7}
        movieDetail={movieDetail}
        setMovieDetail={setMovieDetail}
        title="Popular on Netflix"
      />

      <UIListMovie
        movieData={dataMovie}
        lengthList={7}
        movieDetail={movieDetail}
        setMovieDetail={setMovieDetail}
        title="Because you watched Start-Up"
      />

      <UIListMovie
        movieData={dataMovie}
        lengthList={7}
        movieDetail={movieDetail}
        setMovieDetail={setMovieDetail}
        title="Continue Watching"
      />
      <UIListMovie
        movieData={dataMovie}
        lengthList={7}
        movieDetail={movieDetail}
        setMovieDetail={setMovieDetail}
        title="Asian TV Shows"
      />
    </div>
  );
}

export default ListMovie;
