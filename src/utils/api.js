import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:11434/api";

// Custom hook to list local models
export const useListModels = () => {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tags`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setModels(data.models.map((model) => model.name));
      } catch (err) {
        setError(err);
      }
    };

    fetchModels();
  }, []);

  return { models, error };
};

// Custom hook to generate completions
export const useGenerateCompletion = (model, prompt) => {
  const [completion, setCompletion] = useState(null);
  const [error, setError] = useState(null);

  const [modifiedPrompt] = useState(
    `Give response to this prompt in short (within 100 words). Also try to avoid using markdown syntax, emphasis, bold and other stylings; use simple text. Here is the prompt: ${prompt}`
  );
  useEffect(() => {
    if (!model || !prompt) return;

    const generate = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model, modifiedPrompt, stream: false }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCompletion(data.response);
      } catch (err) {
        setError(err);
      }
    };

    generate();
  }, [model, prompt]);

  return { completion, error };
};

export const useGenerateStreamingCompletion = (model, prompt) => {
  const [streamingResponse, setStreamingResponse] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!model || !prompt) return;

    const generateStream = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model, prompt }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let streamingText = "";

        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;
          const chunk = decoder.decode(value, { stream: true });
          try {
            const json = JSON.parse(chunk);
            if (json.response) {
              streamingText += json.response;
              setStreamingResponse(streamingText);
            }
            if (json.done) {
              setDone(true);
              break;
            }
          } catch (err) {
            console.error("Error parsing JSON chunk:", err);
          }
        }
      } catch (err) {
        setError(err);
      }
    };

    generateStream();
  }, [model, prompt]);

  return { streamingResponse, done, error };
};
