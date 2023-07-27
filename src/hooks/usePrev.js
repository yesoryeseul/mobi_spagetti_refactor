import { useState } from "react";

const usePrev = () => {
  const [isPrev, setIsPrev] = useState(false);

  const toggle = () => setIsPrev(!isPrev);

  return { isPrev, toggle };
};

export default usePrev;
