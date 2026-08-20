import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkMessage = async () => {
    if (!message.trim()) {
      setResult({
        type: "error",
        text: "Please enter a message first.",
      });
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult({
        type: data.prediction === "Spam Mail" ? "spam" : "ham",
        text: data.prediction,
      });
    } catch (error) {
      setResult({
        type: "error",
        text: "Unable to connect to the backend server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage("");
    setResult("");
  };

  return (
    <main className="app">
      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>

      <section className="container">
        <div className="header">
          <div className="logo">✉</div>
          <h1>Spam Mail Detector</h1>
          <p>
            Enter your email or message and our model will predict whether it is
            <strong> Spam</strong> or <strong> Ham</strong>.
          </p>
        </div>

        <div className="input-section">
          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type or paste your message here..."
            disabled={loading}
          ></textarea>

          <div className="actions">
            <button
              className="check-button"
              onClick={checkMessage}
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Message"}
            </button>

            <button
              className="clear-button"
              onClick={clearMessage}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </div>

        {result && (
          <div className={`result ${result.type}`}>
            <div className="result-icon">
              {result.type === "spam"
                ? "⚠"
                : result.type === "ham"
                ? "✓"
                : "!"}
            </div>

            <div>
              <span>Prediction Result</span>
              <h2>{result.text}</h2>
            </div>
          </div>
        )}

        <div className="footer">
          <span>🤖 Machine Learning Powered</span>
          <span>•</span>
          <span>Spam Classification System</span>
        </div>
      </section>
    </main>
  );
}

export default App;