import React from "react";

import { getChakras, getShaderForChakra } from "@/features/chakra/queries";
import { ChakraTimeline } from "@/features/chakra/components/chakra-timeline";

export default async function Page() {
  const chakras = await getChakras();
  const shaders = await Promise.all(
    chakras.map((chakra) => getShaderForChakra(chakra.slug)),
  );

  return (
    <React.Fragment>
      <ChakraTimeline chakras={chakras} shaders={shaders} />
    </React.Fragment>
  );
}
