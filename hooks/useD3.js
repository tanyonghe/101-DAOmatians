import { useEffect, useRef } from "react";
import * as d3 from "d3";

// renderChartFn: fn to execute D3 code
// dependencies: array for useEffect hook dependencies
const useD3 = (renderChartFn, dependencies) => {
  const ref = useRef();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
};

export default useD3;
