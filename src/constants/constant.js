// Custom modal styles

const customStyles = {
  overlay: {
    backgroundColor: '#282c34d9',
  },

  content: {
    position: 'static',
    backgroundColor: '#282c34',
    color: '#fefefe',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    maxWidth: '700px',
    maxHeight: '560px',
    margin: '0 auto',
    width: '96%',
  },
};

const breakDurations = [5, 6, 7, 8, 9, 10, 11, 12];
const sessionDurations = [20, 25, 30, 35, 40, 45, 50, 55, 60];

export default { customStyles, breakDurations, sessionDurations };
