export const config = {
  align: "left",
  id: (d) => d.name,
  iterations: 10,
  extent: [
    [0, 0],
    [1, 1],
  ],
  padding: 5,
  width: 500,
  height: 200,
  useManualScale: false,
  // showCanvasBorder: true,
  nodes: {
    data: [],
    width: 10,
    scaleDomain: [0, 100],
    scaleRange: [0, 75],
    padding: 25,
    minPadding: 25,
    virtualPadding: 7,
    sort: null,
    setPositions: false,
  },
  links: {
    data: [],
    circularGap: 5,
    circularLinkPortionTopBottom: 0.4,
    circularLinkPortionLeftRight: 0.1,
    useVirtualRoutes: true,
    baseRadius: 10,
    verticalMargin: 25,
    opacity: 0.5,
    virtualLinkType: "both", // ["both", "bezier", "virtual"]
  },
  arrows: {
    enabled: true,
    color: "DarkSlateGrey",
    length: 10,
    gap: 25,
    headSize: 4,
  },
};
