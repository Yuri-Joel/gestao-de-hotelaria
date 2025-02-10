"use client";
import React from "react";
import { Wrapper } from "@/components/Wrapper";
import FloorEditModal from "@/components/Floor/FloorEditModal";

function page() {

  return (
      <Wrapper
        key={"3"}
        title="Andar - INFORMAÇÕES"
        description="Informacoes gerais do andar"
        children={ <FloorEditModal /> }
      ></Wrapper>
  );
}

export default page;