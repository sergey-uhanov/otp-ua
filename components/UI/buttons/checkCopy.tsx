import React from 'react';
import styled from 'styled-components';
interface CardProps {
  link: string;
  copyToClipboard: () => void;
}
const Card = ({ link, copyToClipboard }: CardProps) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="wrap">
          <div className="terminal">
            <hgroup className="head">
              <p className="title">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  height="16px"
                  width="16px"
                >
                  <path
                    style={{ color: '#fff' }}
                    d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                  />
                </svg>
                Посиллання на тест
              </p>

              <button
                type="button"
                tabIndex={-1}
                className="copy_toggle"
                onClick={() => {
                  copyToClipboard();
                }}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  height="16px"
                  width="16px"
                >
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                </svg>
              </button>
            </hgroup>

            <div className="body">
              <pre className="pre">
                {' '}
                <code>-&nbsp;</code>
                <code data-cmd={link} className="cmd" />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    padding: 0.75rem;
    overflow: hidden;
    border: 0.25px solid var(--border-color);
    border-radius: var(--border-radius);
    //  background-color: navy;
    backdrop-filter: blur(800px);
    //  box-shadow: 0 0 40px 15px blue;
    width: 344px;
  }
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    z-index: 10;
    border: 0.5px solid #525252;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  .terminal {
    display: flex;
    flex-direction: column;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    min-height: 40px;
    padding-inline: 12px;

    background-color: var(--alt-background-color);
  }
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 2.5rem;
    user-select: none;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-fill-link);
  }
  .title > svg {
    height: 18px;
    width: 18px;
    margin-top: 2px;
    color: #006adc;
  }
  .copy_toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    border: 0.65px solid darkgrey;
    margin-left: auto;
    border-radius: var(--border-radius);
    background-color: #202425;
    color: #8e8e8e;
    cursor: pointer;
    box-shadow: 0 0 15px deepskyblue;
  }
  .copy_toggle > svg {
    width: 15px;
    height: 15px;
    box-shadow: 0 0 40px 2.5px blue;
    animation: bounce;
  }
  .copy_toggle:active > svg > path,
  .copy_toggle:focus-within > svg > path {
    animation: clipboard-check 5000ms linear forwards;
  }
  .body {
    display: flex;
    flex-direction: column;
    position: relative;
    //  border-bottom-right-radius: 15px;
    //  border-bottom-left-radius: 15px;
    overflow-x: auto;
    padding: 1rem;
    line-height: 20px;
    color: white;
    background-color: var(--secondary-background-color);
    white-space: nowrap;
  }
  .pre {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-wrap: nowrap;
    white-space: pre;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 16px;
  }
  .pre code:nth-child(1) {
    color: #575757;
  }
  .pre code:nth-child(2) {
    color: #e34ba9;
  }
  .cmd {
    height: 19px;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  .cmd::before {
    content: attr(data-cmd);
    position: relative;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    background-color: transparent;
    animation: inputs 8s steps(22) infinite;
  }
  .cmd::after {
    content: '_';
    position: relative;
    display: block;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
    border-right: 0.15em solid #e34ba9;
    animation: cursor 0.5s step-end infinite alternate, blinking 0.4s infinite;
  }

  @keyframes blinking {
    20%,
    80% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0);
    }
  }
  @keyframes cursor {
    50% {
      border-right-color: transparent;
    }
  }
  @keyframes inputs {
    0%,
    100% {
      width: 0;
    }
    10%,
    90% {
      width: 100px;
    }
    30%,
    70% {
      width: 500px;
      max-width: max-content;
    }
  }
  @keyframes clipboard-check {
    100% {
      color: deepskyblue;
      d: path(
        'M 9 5 H 7 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 10 a 2 2 0 0 0 2 -2 V 7 a 2 2 0 0 0 -2 -2 h -2 M 9 5 a 2 2 0 0 0 2 2 h 2 a 2 2 0 0 0 2 -2 M 9 5 a 2 2 0 0 1 2 -2 h 2 a 2 2 0 0 1 2 2 m -6 9 l 2 2 l 4 -4'
      );
    }
  }
`;

export default Card;
