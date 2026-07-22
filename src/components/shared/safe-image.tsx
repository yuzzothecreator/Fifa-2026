"use client";

import * as React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
}

/** Image with automatic fallback when Wikimedia / remote URLs 404. */
export function SafeImage({ src, fallback, alt, ...rest }: Props) {
  const [current, setCurrent] = React.useState(src);
  React.useEffect(() => setCurrent(src), [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={current || fallback}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
