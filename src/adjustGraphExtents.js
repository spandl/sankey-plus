export function adjustGraphExtents(inputGraph, chartPadding, svgHeight, svgWidth, nodeWidth) {

  let chartHeight = svgHeight - chartPadding - chartPadding;
  let chartWidth = svgWidth - chartPadding - chartPadding;

  let graph = inputGraph;

  let extentCircularY = [
    d3.min(graph.links, function (link) {
      if (link.circular && link.circularLinkType == "top") {
        return link.circularPathData.verticalFullExtent - link.width / 2;
      } else {
        return graph.y0;
      }
    }),
    d3.max(graph.links, function (link) {
      if (link.circular && link.circularLinkType == "bottom") {
        return link.circularPathData.verticalFullExtent + link.width / 2;
      } else {
        return graph.y1;
      }
    })
  ];

  console.log(extentCircularY);

  //positive = space to use
  //negative = out of bounds
  let verticalSpaceTop = extentCircularY[0] - chartPadding;
  let verticalSpaceBottom = chartPadding + chartHeight - extentCircularY[1];

  console.log(verticalSpaceTop);
  console.log(verticalSpaceBottom);

  //if either is out of bounds
  if (verticalSpaceTop < 0 || verticalSpaceBottom < 0) {
    if (verticalSpaceTop < 0 && verticalSpaceBottom < 0) {
      //if both are out of bounds, move both inwards
      console.log("both");
      graph.y0 = graph.y0 + Math.abs(verticalSpaceTop);
      graph.y1 = graph.y1 - Math.abs(verticalSpaceBottom);
    } else if (verticalSpaceTop < 0) {
      //if only top is out of bounds, move down
      console.log("just top");
      graph.y0 = graph.y0 + Math.abs(verticalSpaceTop);
      let y1move = d3.min([Math.abs(verticalSpaceTop), verticalSpaceBottom]);
      graph.y1 = graph.y1 + y1move;
    } else {
      //if only bottom is out of bounds, move up
      console.log("just bottom");
      let y0move = d3.min([verticalSpaceTop /*, Math.abs(verticalSpaceBottom)*/]);
      graph.y0 = graph.y0 - y0move;
      graph.y1 = graph.y1 - Math.abs(verticalSpaceBottom);
    }
  }

  let extentCircularX = [
    d3.min(graph.links, function (link) {
      if (link.circular) {
        return d3.min([
          link.circularPathData.leftFullExtent - link.width / 2,
          chartPadding
        ]);
      }
    }),
    d3.max(graph.links, function (link) {
      //console.log(link)
      if (link.circular) {
        return d3.max([
          link.circularPathData.rightFullExtent + link.width / 2,
          chartWidth + chartPadding
        ]);
      }
    })
  ];

  console.log(extentCircularX);

  let horizontalSpaceLeft = extentCircularX[0] - chartPadding;
  let horizontalSpaceRight = chartWidth + chartPadding - extentCircularX[1];

  console.log(horizontalSpaceLeft);
  console.log(horizontalSpaceRight);

  //if either is out of bounds
  if (horizontalSpaceLeft < 0 || horizontalSpaceRight < 0) {
    if (horizontalSpaceLeft < 0 && horizontalSpaceRight < 0) {
      //if both are out of bounds, move both inwards
      console.log("both");
      graph.x0 = graph.x0 + Math.abs(horizontalSpaceLeft);
      graph.x1 = graph.x1 - Math.abs(horizontalSpaceRight);
    } else if (horizontalSpaceLeft < 0) {
      //if only top is out of bounds, move down
      console.log("left");
      let x0move = Math.abs(horizontalSpaceLeft);
      let x1move = d3.min([chartPadding, Math.abs(horizontalSpaceLeft)]);
      graph.x0 = graph.x0 + x0move;
      graph.x1 = graph.x1 + x1move;
    } else {
      //if only right is out of bounds, move right
      console.log("right");
      let x0move = d3.min([chartPadding, Math.abs(horizontalSpaceRight)]);
      let x1move = Math.abs(horizontalSpaceRight);
      graph.x0 = graph.x0 - x0move;
      graph.x1 = graph.x1 - x1move;
    }

    let maxColumn = d3.max(graph.nodes, function (node) {
      return node.column;
    });

    graph.nodes.forEach(function (node) {
      node.x0 =
        graph.x0 +
        node.column * ((graph.x1 - graph.x0 - nodeWidth) / maxColumn);
      node.x1 = node.x0 + /*nodeWidthFunction(node) */ nodeWidth;
    });
  }

  console.log(graph.x0)
  console.log(graph.x1)
  console.log(graph.y0)
  console.log(graph.y1)


  /*let maxColumn = d3.max(graph.nodes, function (node) {
    return node.column;
  });

  graph.nodes.forEach(function (node) {
    node.x0 =
      graph.x0 + node.column * ((graph.x1 - graph.x0 - nodeWidth) / maxColumn);
    node.x1 = node.x0 + /*nodeWidthFunction(node) nodeWidth;
  });*/

  return graph;
}