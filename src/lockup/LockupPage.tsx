import { useReducer } from 'react';
import { reducer } from './useStateMachine';
import { CalibrationInstructionPage } from './CalibrationInstructionPage';
import { WelcomePage } from './WelcomePage';
import { CalibrationReadingPage } from './CalibrationReadingPage';
import { InitialReadingPage } from './InitialReadingPage';
import { ConfigPage } from './ConfigPage';
import { CompletePage } from './CompletePage';
import { CalibrationCompletePage } from './CalibrationCompletePage';
import { InstructionPage } from './InstructionPage';
import { SelfAssessPage } from './SelfAssessPage';

export function LockupPage() {
  const [state, dispatch] = useReducer(reducer, {
    stage: 'welcome',
  });

  switch (state.stage) {
    case 'welcome': {
      return <WelcomePage dispatch={dispatch} />;
    }
    case 'config': {
      return <ConfigPage dispatch={dispatch} />;
    }
    case 'initial-reading': {
      return <InitialReadingPage dispatch={dispatch} state={state} />;
    }
    case 'calibration-instruction': {
      return <CalibrationInstructionPage dispatch={dispatch} />;
    }
    case 'calibration-reading': {
      return <CalibrationReadingPage dispatch={dispatch} state={state} />;
    }
    case 'calibration-complete': {
      return <CalibrationCompletePage dispatch={dispatch} />;
    }
    case 'instruction': {
      return <InstructionPage dispatch={dispatch} state={state} />;
    }
    case 'self-assess': {
      return <SelfAssessPage dispatch={dispatch} />;
    }
    case 'complete': {
      return <CompletePage state={state} />;
    }
    default:
      return <span>{JSON.stringify(state)}</span>;
  }
}
