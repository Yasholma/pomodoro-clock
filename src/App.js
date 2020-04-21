import React from "react";
import logo from "./logo.png";
import "./App.css";

function App() {
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    let [timeLeft, setTimeLeft] = React.useState(sessionLength * 60);
    let [isPaused, setIsPaused] = React.useState(false);
    let [timer, setTimer] = React.useState(undefined);
    const [currentSession, setCurrentSession] = React.useState("Session");

    const update = (field, callback, action, val) => {
        if (action === "dec") {
            field > 1 && callback((field -= 1));
        }
        if (action === "inc") {
            field < 60 && callback((field += 1));
        }
        if (val === "sessionLength") {
            setTimeLeft(field * 60);
        }
    };

    const convertToTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = (time % 60).toString().padStart(2, 0);
        return `${minutes}:${seconds}`;
    };

    const reset = () => {
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(25 * 60);
        clearInterval(timer);
        setIsPaused(false);
    };

    const begin = () => {
        if (isPaused) {
            clearInterval(timer);
            setIsPaused(false);
        } else {
            setIsPaused(true);
            setTimer(
                setInterval(() => {
                    if (timeLeft === 0) {
                        setCurrentSession("Break");
                        setTimeLeft((timeLeft = breakLength * 60));
                    } else {
                        setTimeLeft((timeLeft -= 1));
                    }
                }, 1000),
            );
        }
    };

    return (
        <div className="App">
            <header>
                <img src={logo} alt="Logo" />
                <h2>Pomodoro Clock</h2>
            </header>
            <div className="pomodoro">
                <div className="break">
                    <h2 id="break-label">Break Length</h2>
                    <div className="control">
                        <button
                            disabled={isPaused}
                            id="break-decrement"
                            onClick={() =>
                                update(breakLength, setBreakLength, "dec")
                            }
                        >
                            &darr;
                        </button>
                        <h3 id="break-length">{breakLength}</h3>
                        <button
                            disabled={isPaused}
                            id="break-increment"
                            onClick={() =>
                                update(breakLength, setBreakLength, "inc")
                            }
                        >
                            &uarr;
                        </button>
                    </div>
                </div>
                <div className="session">
                    <h2 id="session-label">Session Length</h2>
                    <div className="control">
                        <button
                            disabled={isPaused}
                            id="session-decrement"
                            onClick={() =>
                                update(
                                    sessionLength,
                                    setSessionLength,
                                    "dec",
                                    "sessionLength",
                                )
                            }
                        >
                            &darr;
                        </button>
                        <h3 id="session-length">{sessionLength}</h3>
                        <button
                            disabled={isPaused}
                            id="session-increment"
                            onClick={() =>
                                update(
                                    sessionLength,
                                    setSessionLength,
                                    "inc",
                                    "sessionLength",
                                )
                            }
                        >
                            &uarr;
                        </button>
                    </div>
                </div>

                <div className="timer">
                    <h4 id="timer-label">{currentSession}</h4>
                    <p id="time-left">{convertToTime(timeLeft)}</p>
                </div>
                <div className="controls">
                    <button
                        id="start_stop"
                        className="start"
                        onClick={() => begin()}
                        dangerouslySetInnerHTML={{
                            __html: isPaused ? "&#10072; &#10072;" : "&#9654;",
                        }}
                    />
                    <button
                        id="reset"
                        className="reset"
                        onClick={() => reset()}
                    >
                        &#8634;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
