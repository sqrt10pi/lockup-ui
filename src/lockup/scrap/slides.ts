interface WarningSlide {}
interface InitialReadingSlide {}
interface CalibrateReadingSlide {}
interface CalibrateInstructionSlide {}
interface ConfigSlide {}
interface InstructionSlide {}
interface ResultSlide {}

type Slide =

function getSlide(state: State): Slide {}
