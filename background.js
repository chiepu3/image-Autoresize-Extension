chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveImage",
    title: "画像を保存する",
    contexts: ["image"],
  });
});

function sanitizeFilename(name) {
  return name.replace(/[/?<>\\:*|"]/g, "_");
}

function generateFilename() {
  const now = new Date();
  const yymmdd =
    now.getFullYear().toString().slice(-2) +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0");
  const timestamp = now.getTime();
  return `${yymmdd}_${timestamp.toString().slice(-6)}`;
}

async function fetchImageAsBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "saveImage") {
    const imageUrl = info.srcUrl;
    const filename = generateFilename() + ".png";

    try {
      // まずサーバーでのダウンロードを試みる
      const serverResponse = await fetch(
        "http://localhost:8020/download-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: imageUrl, filename: filename }),
        }
      );

      if (serverResponse.ok) {
        console.log("Image downloaded successfully on server");
        return;
      }

      // サーバーでダウンロードできない場合、クライアント側で画像を取得
      const base64Data = await fetchImageAsBase64(imageUrl);

      // 取得した画像データをサーバーに送信
      const saveResponse = await fetch("http://localhost:8020/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: filename, imageData: base64Data }),
      });

      if (saveResponse.ok) {
        console.log("Image saved successfully on server");
      } else {
        throw new Error("Failed to save image on server");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      // エラーハンドリング（ユーザーへの通知など）
    }
  }
});
