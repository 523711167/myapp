import useMediaQuery from "@hooks/use-media-query"
import createBreakpoints from "@utils/createBreakpoints"

const { up, down, between, only } = createBreakpoints({});


// type Query = 'up' | 'down' | 'between' | 'only';

export function useResponsive(query, start, end) {

  const mediaUp = useMediaQuery(up(start));

  const mediaDown = useMediaQuery(down(start));

  const mediaBetween = useMediaQuery(between(start, end));

  const mediaOnly = useMediaQuery(only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

