from yandex_cloud_ml_sdk import YCloudML
from fastapi import FastAPI, Request
import subprocess
import httpx
from pydantic import BaseModel
import uvicorn

ai_model_name = "yandexgpt-lite"
ai_temperature = 0.3

def retrieve_folder_id() -> str | None:
    try:
        result = subprocess.run(
            ["yc", "config", "list"],
            capture_output=True,
            text=True,
            check=True
        )
        folder_id_key = "folder-id"
        for line in result.stdout.splitlines():
            parts = line.split(": ", 1)
            if len(parts) == 2 and parts[0] == folder_id_key:
                return parts[1].strip()
        return None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None

def retrieve_token() -> str | None:
    return token
    try:
        result = subprocess.run(
            ["yc", "iam", "create-token"],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None

class PromptRequest(BaseModel):
    system_prompt: str
    user_prompt: str

app = FastAPI()

@app.post("/ask")
async def proxy_yandexgpt(request: PromptRequest):
    messages = [
        {
            "role": "system",
            "text": request.system_prompt,
        },
        {
            "role": "user",
            "text": request.user_prompt,
        },
    ]

    sdk = YCloudML(
        folder_id=folder_id,
        auth=token
    )

    alternatives = (
        sdk.models.completions(ai_model_name).configure(temperature=ai_temperature).run(messages)
    )

    return { "ai_response": alternatives[0].text }


def main():
    folder_id = retrieve_folder_id()
    if not folder_id:
        raise RuntimeError

    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
