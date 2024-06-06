import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="landing-page">
      <header className="navbar">
        <a href="/" className="logo">
          QuickFill
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#features">Features</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Save your shortcuts and replace them effortlessly in any input field.</h1>
          <p>
            Creating your own shortcuts has never been easier, faster, and more secure. Add, remove,
            edit, and enjoy.
          </p>
          <div>
            <a
              href="https://github.com/atulsmania/quick-fill/releases/tag/v1.0.0"
              className="github-button"
            >
              Download
            </a>
            <a href="https://chrome.google.com/webstore" className="source-button">
              Source Code
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div
            style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '60.352%' }}
          >
            <iframe
              title="demo"
              height="100%"
              src="https://streamable.com/e/h8ia0d?muted=1&nocontrols=1"
              crossorigin="anonymous"
              width="100%"
              style={{
                border: 'none',
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: '0px',
                top: '0px',
                overflow: 'hidden',
              }}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
