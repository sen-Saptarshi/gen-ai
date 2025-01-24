import { useState } from "react";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { useListModels, useGenerateStreamingCompletion } from "../../utils/api";
import ToggleButton from "../components/ToggleButton";

function Playground() {
  const [text, setText] = useState("Hello world!");
  const [loading, setLoading] = useState(false);
  const { models, error: modelsError } = useListModels();
  const [selectedModel, setSelectedModel] = useState(null);
  const [streaming, setStreaming] = useState(true);
  const [completion, setCompletion] = useState("");
  const [completionError, setCompletionError] = useState(null);
  const {
    streamingResponse,
    done,
    error: streamingError,
  } = useGenerateStreamingCompletion(
    streaming && selectedModel,
    streaming && text
  );

  const handleModelSelect = (value) => {
    setSelectedModel(value);
  };

  const handleRefactor = async () => {
    if (!selectedModel) {
      alert("Please select a model first!");
      return;
    }

    setLoading(true);
    setCompletion("");
    setCompletionError(null);

    if (streaming) {
      // Streaming logic is already handled by useGenerateStreamingCompletion hook
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          prompt: text,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCompletion(data.response);
    } catch (err) {
      setCompletionError(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="h-screen flex">
      <div className="w-full p-4 bg-gray-900 text-white">
        <h1 className="text-4xl my-4 text-white font-mono tracking-tight">
          Playground
        </h1>
        <div
          contentEditable="true"
          className="p-4 bg-black focus:outline-none"
          onBlur={(e) => setText(e.currentTarget.textContent)}
        >
          {text}
        </div>
        {completionError && (
          <p className="text-red-500 mt-4">Error: {completionError.message}</p>
        )}
        {streamingError && (
          <p className="text-red-500 mt-4">
            Streaming Error: {streamingError.message}
          </p>
        )}
        {(completion || streamingResponse) && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold">Completion:</h2>
            <p>{streaming ? streamingResponse : completion}</p>
          </div>
        )}
        {done && streaming && (
          <p className="text-green-500 mt-4">Streaming completed!</p>
        )}
      </div>
      <div className="w-1/3 p-4 bg-gray-800 flexr flex-col md:w-[300px]">
        <div className="flex justify-center flex-col items-center gap-4 mt-4">
          <Button
            className="w-full"
            onClick={handleRefactor}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refactor"}
          </Button>
        </div>
        <ToggleButton onToggle={setStreaming} />
        {modelsError && <p className="text-red-500">Error loading models</p>}
        <Dropdown buttonLabel="Available models" onSelect={handleModelSelect}>
          {models?.map((model) => (
            <div key={model} value={model}>
              {model}
            </div>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}

export default Playground;
