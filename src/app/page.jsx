"use client";
import React from "react";

function MainComponent() {
  const [inputMessage, setInputMessage] = React.useState("");
  const [imageHistory, setImageHistory] = React.useState([]);
  const [generatedImage, setGeneratedImage] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendMessage = () => {
    if (!inputMessage) return;
    setIsLoading(true);

    fetch(
      `https://www.create.xyz/integrations/stable-diffusion/?prompt=${encodeURIComponent(
        inputMessage
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const newImage = data.data[0];
        setGeneratedImage(newImage);
        setImageHistory([newImage, ...imageHistory]);
        setPrompt(inputMessage);
        setIsLoading(false);
      });

    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#ffffff] to-[#dce9f9] text-[#333333] font-apple px-4 py-8 md:px-20">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          完全無料の画像生成AIサイト
        </h1>

        <div className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-2xl overflow-hidden mb-10">
          <div className="md:w-1/2 p-4 md:p-8">
            <h2 className="font-semibold text-xl mb-4">プロンプト</h2>
            <div className="flex items-center w-full bg-gray-200 rounded-full p-2">
              <input
                type="text"
                name="prompt_input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow bg-transparent p-2 outline-none"
                placeholder="ここにメッセージを入力..."
              />
              <button onClick={handleSendMessage} className="text-blue-600">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>

          <div className="md:w-1/2 p-4 md:p-8 bg-[#f7f7f7]">
            <h2 className="font-semibold text-xl mb-4">生成された画像</h2>
            {isLoading ? (
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full w-1/2"
                  style={{ width: "100%", transition: "width 2s ease" }}
                ></div>
              </div>
            ) : (
              <>
                <img
                  src={generatedImage}
                  alt="Generated image based on prompt"
                  className="w-full h-auto rounded mb-4"
                />
                <div className="flex justify-between">
                  <p className="font-light">
                    画像のプロンプト:{" "}
                    <span className="font-normal">{prompt}</span>
                  </p>
                  <a
                    href={generatedImage}
                    download="generated_image.jpeg"
                    className="text-blue-600 font-semibold"
                  >
                    ダウンロード
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full">
          <h2 className="font-semibold text-xl mb-4">生成画像の履歴</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {imageHistory.map((image, index) => (
              <div key={index} className="rounded overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src={image}
                  alt={`Previously generated image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;