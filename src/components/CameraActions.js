import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import RecordButton from './RecordButton'
import StopButton from './StopButton'
import Timer from './Timer'
import Countdown from './Countdown'

const ActionsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CameraActions = ({
  isVideoInputSupported,
  isInlineRecordingSupported,
  thereWasAnError,
  isRecording,
  isCameraOn,
  streamIsReady,
  isConnecting,
  isRunningCountdown,
  isReplayingVideo,
  countdownTime,
  timeLimit,
  showReplayControls,
  replayVideoAutoplayAndLoopOff,
  useVideoInput,
  onTurnOnCamera,
  onTurnOffCamera,
  onOpenVideoInput,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onStopReplaying,
  onConfirm,
  onUploadVideo,
  onCancelClick,
}) => {
  React.useEffect(() => {
    // turns camera on everytime is not replaying video
    if (!isReplayingVideo && !isCameraOn) {
      onTurnOnCamera();
    }
  }, [isCameraOn, isReplayingVideo])

  const renderContent = () => {
    const shouldUseVideoInput = !isInlineRecordingSupported && isVideoInputSupported;

    if (
      (!isInlineRecordingSupported && !isVideoInputSupported) ||
      thereWasAnError ||
      isConnecting ||
      isRunningCountdown
    ) {
      return null
    }

    if (isReplayingVideo) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            type='button'
            variant="contained"
            onClick={onUploadVideo}
            style={{ marginBottom: '8px' }}
          >
            {'upload video'}
          </Button>
          <Button
            type='button'
            variant="contained"
            color="secondary"
            onClick={onStopReplaying}
            data-qa='start-replaying'
          >
            {'Use another video'}
          </Button>
        </div>
      )
    }

    if (isRecording) {
      return (
        <StopButton
          type='button'
          onClick={onStopRecording}
          data-qa='stop-recording'
        />
      )
    }

    if (isCameraOn && streamIsReady) {
      return (
        <RecordButton
          type='button'
          onClick={onStartRecording}
          data-qa='start-recording'
        />
      )
    }

    if (useVideoInput) {
      return (
        <Button type='button' onClick={onOpenVideoInput} data-qa='open-input'>
          {'Upload a video'}
        </Button>
      )
    }

    return shouldUseVideoInput ? (
      <Button type='button' onClick={onOpenVideoInput} data-qa='open-input'>
        {'Record a video'}
      </Button>
    ) : (
      <Button type='button' onClick={onTurnOnCamera} data-qa='turn-on-camera'>
        {'Turn my camera ON'}
      </Button>
    )
  }

  return (
    <div>
      <Button 
        variant="contained"
        color="error"
        style={{ position: 'fixed', top: '8px', right: '8px' }}
        onClick={onCancelClick}
      >
        Cancel
      </Button>
      {isRecording && <Timer timeLimit={timeLimit} />}
      {isRunningCountdown && <Countdown countdownTime={countdownTime} />}
      <ActionsWrapper>{renderContent()}</ActionsWrapper>
    </div>
  )
}

export default CameraActions;