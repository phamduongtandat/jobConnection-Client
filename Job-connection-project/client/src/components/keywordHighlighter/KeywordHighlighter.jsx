import Highlighter from 'react-highlight-words';

const KeywordHighlighter = ({ searchWords = [], textToHighlight = '' }) => {
  return (
    <Highlighter
      highlightClassName="bg-orange-400 px-0.5"
      searchWords={searchWords}
      textToHighlight={textToHighlight}
      autoEscape
    />
  );
};

export default KeywordHighlighter;
