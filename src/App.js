import React, { useCallback } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import styled from 'styled-components';
import INPUT from './media/input.mp4';
import OUTPUT from "./media/output.mp4";
import RESID from "./media/resid.mp4";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const App = () => {
  const inputRef = React.createRef();
  const outputRef = React.createRef();
  const residRef = React.createRef();

  const onUpdate = useCallback(({ x, y, scale }) => {

    if (inputRef) {
      const value = make3dTransformValue({ x, y, scale });
      inputRef.current.style.setProperty("transform", value);
    }

    if (outputRef) {
      const value = make3dTransformValue({ x, y, scale });
      outputRef.current.style.setProperty("transform", value);
    }

    if (residRef) {
      const value = make3dTransformValue({ x, y, scale });
      residRef.current.style.setProperty("transform", value);
    }
  }, [inputRef, outputRef, residRef]);

  const onPauseEvent = () => {
    inputRef.current.onPause = () => {};
    outputRef.current.onPause = () => {};
    residRef.current.onPause = () => {};
    inputRef.current.pause();
    outputRef.current.pause();
    residRef.current.pause();
    inputRef.current.onPause = onPauseEvent;
    outputRef.current.onPause = onPauseEvent;
    residRef.current.onPause = onPauseEvent;
  }

  const onPlayEvent = () => {
    inputRef.current.onPlay = () => {};
    outputRef.current.onPlay = () => {};
    residRef.current.onPlay = () => {};
    inputRef.current.play();
    outputRef.current.play();
    residRef.current.play();
    inputRef.current.onPlay = onPlayEvent;
    outputRef.current.onPlay = onPlayEvent;
    residRef.current.onPlay = onPlayEvent;
  }

  return (
    <Container>
      <h1> Zoom Test </h1>
      <QuickPinchZoom onUpdate={onUpdate}>
        <video controls ref={inputRef} onPause={onPauseEvent} onPlay={onPlayEvent}>
          <source src={INPUT} type='video/mp4'/>
        </video>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={onUpdate}>
        <video controls ref={outputRef} onPause={onPauseEvent} onPlay={onPlayEvent}>
          <source src={OUTPUT} type='video/mp4'/>
        </video>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={onUpdate}>
        <video controls ref={residRef} onPause={onPauseEvent} onPlay={onPlayEvent}>
          <source src={RESID} type='video/mp4'/>
        </video>
      </QuickPinchZoom>
    </Container>
  );
};

