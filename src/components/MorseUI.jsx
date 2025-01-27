'use client';

import { Activity, History as HistoryIcon, Radio, Music } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { PresetDropdown } from './PresetDropdown';
import { ControlPanel } from './ControlPanel';
import { QualityControls } from './QualityControls';
import { CharacterDisplay } from './CharacterDisplay';
import { CharacterGrid } from './CharacterGrid';
import { ScoreDisplay } from './ScoreDisplay';
import { History } from './History';
import { PerformanceGraph } from './PerformanceGraph';
import { AvailableChars } from './AvailableChars';
import { InteractiveButton } from './InteractiveButton';

const BetaBanner = () => (
  <div className="fixed top-0 left-0 right-0 bg-yellow-500/90 text-black py-2 px-4 text-center font-semibold z-50">
    BETA - IN DEVELOPMENT 🚧
  </div>
);

const MainButton = ({ isPlaying, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-6 rounded-lg font-semibold text-xl transition-all
      ${isPlaying
        ? 'bg-red-500 hover:bg-red-600'
        : 'bg-green-500 hover:bg-green-600'}`}
  >
    {isPlaying ? 'Stop' : 'Start'}
  </button>
);

const ModeToggle = ({ label, isActive, onToggle }) => (
  <div className="w-full">
    <div className="text-sm mb-2">{label}</div>
    <button
      onClick={onToggle}
      className={`w-full px-4 py-3 rounded transition-colors ${
        isActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
      }`}
    >
      {isActive ? 'On' : 'Off'}
    </button>
  </div>
);

const MorseUI = ({
  isPlaying,
  onTogglePlay,
  currentLevel,
  onLevelChange,
  groupSize,
  onGroupSizeChange,
  frequency,
  onFrequencyChange,
  wpm,
  onWpmChange,
  availableChars,
  consecutiveCorrect,
  userInput,
  currentGroupSize,
  score,
  history,
  maxLevel,
  notification,
  onCharacterInput,
  performanceData,
  headCopyMode,
  onHeadCopyMode,
  hideChars,
  onHideChars,
  showAnswer,
  onShowAnswer,
  currentGroup,
  qsbAmount,
  onQsbChange,
  qrmAmount,
  onQrmChange,
  presets,
  currentPreset,
  onPresetChange,
  advanceThreshold,
  onAdvanceThresholdChange
}) => {
  // Determine which sections to show based on compact mode
  const showTrainingSettings = !hideChars || !isPlaying;
  const showAudioSettings = !hideChars;
  const showPerformance = true;
  const showHistory = !hideChars;
  const showAvailableChars = !hideChars || !isPlaying;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 pb-16">
      <BetaBanner />

      {notification && (
        <div className={`fixed top-14 left-4 right-4 bg-${notification.color}-500
          text-white px-4 py-3 rounded-lg shadow-lg z-40 text-center
          animate-fade-in-down`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Morse Code Trainer</h1>
          <p className="text-gray-400 text-lg">{currentPreset?.name || 'Loading...'}</p>
        </div>

        <div className="space-y-6">
          <MainButton isPlaying={isPlaying} onClick={onTogglePlay} />

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <CharacterDisplay
              headCopyMode={headCopyMode}
              showAnswer={showAnswer}
              userInput={userInput}
              currentGroupSize={currentGroupSize}
              currentGroup={currentGroup}
            />

            {headCopyMode && isPlaying && !showAnswer && (
              <InteractiveButton
                onClick={onShowAnswer}
                className="w-full mt-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-lg"
              >
                Show Answer
              </InteractiveButton>
            )}
          </div>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <CharacterGrid
              availableChars={availableChars}
              onCharacterInput={onCharacterInput}
              currentPreset={currentPreset}
            />
          </div>
          {showTrainingSettings && (
            <AnimatedSection title="Training Settings" icon={<Radio size={20} />} defaultOpen={!isPlaying}>
              <div className="space-y-6">
                <PresetDropdown
                  presets={presets}
                  currentPreset={currentPreset}
                  onPresetChange={onPresetChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ModeToggle
                    label="Head Copy Mode"
                    isActive={headCopyMode}
                    onToggle={onHeadCopyMode}
                  />
                  <ModeToggle
                    label="Compact Mode"
                    isActive={hideChars}
                    onToggle={onHideChars}
                  />
                </div>
              </div>
            </AnimatedSection>
          )}



          {showAudioSettings && (
            <AnimatedSection title="Audio Settings" icon={<Music size={20} />} defaultOpen={false}>
              <div className="space-y-6">
                <ControlPanel
                  currentLevel={currentLevel}
                  onLevelChange={onLevelChange}
                  groupSize={groupSize}
                  onGroupSizeChange={onGroupSizeChange}
                  frequency={frequency}
                  onFrequencyChange={onFrequencyChange}
                  wpm={wpm}
                  onWpmChange={onWpmChange}
                  maxLevel={maxLevel}
                  advanceThreshold={advanceThreshold}
                  onAdvanceThresholdChange={onAdvanceThresholdChange}
                  consecutiveCorrect={consecutiveCorrect}
                />

                <div className="mt-8 mb-4">
                  <QualityControls
                    qsbAmount={qsbAmount}
                    onQsbChange={onQsbChange}
                    qrmAmount={qrmAmount}
                    onQrmChange={onQrmChange}
                  />
                </div>
              </div>
            </AnimatedSection>
          )}



          {showPerformance && (
            <AnimatedSection title="Performance" icon={<Activity size={20} />} defaultOpen={true}>
              <div className="space-y-6">
                <ScoreDisplay score={score} />
                {showAvailableChars && (
                  <AvailableChars
                    availableChars={availableChars}
                    consecutiveCorrect={consecutiveCorrect}
                    advanceThreshold={advanceThreshold}
                  />
                )}
                {performanceData.length > 0 && (
                  <PerformanceGraph performanceData={performanceData} />
                )}
              </div>
            </AnimatedSection>
          )}

          {showHistory && (
            <AnimatedSection title="History" icon={<HistoryIcon size={20} />} defaultOpen={false}>
              <div className="space-y-6">
                <History history={history} />
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default MorseUI;
