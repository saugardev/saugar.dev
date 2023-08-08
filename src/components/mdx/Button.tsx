'use client';

import { useState } from "react";

export default function Button({ text } : {text : string}){

  const [toggle, setToggle] = useState(false)

  return (
    <button className="rounded-md bg-foreground text-primary-foreground px-4 py-2" onClick={() => setToggle(!toggle)}>
      {toggle ? text : "Click Me"}
    </button>
  )
}