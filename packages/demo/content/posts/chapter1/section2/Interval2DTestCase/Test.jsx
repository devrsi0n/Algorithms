import React, { Component } from 'react';
import styled from '@emotion/styled';
// import { Interval2D, Interval1D, Counter, StdRandom, Point2D } from 'algs4';

async function testCase(times) {
  const Interval2D = require('algs4/lib/Interval2D').default;
  const Interval1D = require('algs4/lib/Interval1D').default;
  const StdRandom = require('algs4/lib/StdRandom').default;
  const Point2D = require('algs4/lib/Point2D').default;
  const Counter = require('algs4/lib/Counter').default;
  // StdDraw.setCanvasSize(600, 600);
  const xinterval = new Interval1D(100, 400);
  const yinterval = new Interval1D(100, 400);
  const box = new Interval2D(xinterval, yinterval);
  box.draw();

  const counter = new Counter('hits');
  for (let i = 0; i < times; i++) {
    const x = StdRandom.uniform(600);
    const y = StdRandom.uniform(600);
    const p = new Point2D(x, y);
    if (box.contains(p)) {
      counter.increment();
    } else {
      p.draw();
    }
  }
}

export default class Interval2DTestCase extends Component {
  componentDidMount() {
    testCase(100000);
  }

  render() {
    return (
      <Wrap>
        <div id="CanvasContainer" />
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;
