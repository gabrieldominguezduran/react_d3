import { expect, it } from "vitest";
import LineChart from "./LineChart";

it("render LineChart", async () => {
  const result = (
    <LineChart
      width={0}
      height={0}
      top={0}
      right={0}
      bottom={0}
      left={0}
      fill={""}
    />
  );

  await expect(result).toMatchFileSnapshot("./LineChart");
});
