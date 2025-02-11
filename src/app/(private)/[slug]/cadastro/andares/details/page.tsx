"use client";
import React from "react";
import { Wrapper } from "@/components/Wrapper";
import FloorDetails from "@/components/Floor/FloorDetails";

function page() {
  return (
    <Wrapper
      key={"3"}
      title="Andar - INFORMAÇÕES"
      description="Informacoes gerais do andar"
      children={<FloorDetails />}
    ></Wrapper>
  );
}

export default page;
