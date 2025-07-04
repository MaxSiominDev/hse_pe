from yandex_cloud_ml_sdk import YCloudML
from fastapi import FastAPI, Request
import subprocess
import httpx
from pydantic import BaseModel
import uvicorn
import threading
import time

ai_model_name = "yandexgpt-lite"
ai_temperature = 0.3

_sdk_instance = None
_sdk_lock = threading.Lock()
_sdk_timestamp = 0
_CREDENTIALS_EXPIRY = 1 * 60 * 60 # One hour

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
    
def get_sdk():
    global _sdk_instance, _sdk_timestamp
    current_time = time.time()
    
    if _sdk_instance and (current_time - _sdk_timestamp) < _CREDENTIALS_EXPIRY:
        return _sdk_instance
    
    with _sdk_lock:
        if _sdk_instance and (current_time - _sdk_timestamp) < _CREDENTIALS_EXPIRY:
            return _sdk_instance
        
        token = retrieve_token()
        folder_id = retrieve_folder_id()
        
        if not token or not folder_id:
            if not _sdk_instance:
                raise RuntimeError("Failed to retrieve credentials")
            return _sdk_instance
        
        new_sdk = YCloudML(folder_id=folder_id, auth=token)
        
        _sdk_instance = new_sdk
        _sdk_timestamp = current_time
        return new_sdk

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

    sdk = get_sdk()

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
