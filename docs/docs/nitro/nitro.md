---
title: Nitro 
slug: /nitro
---

Nitro, is the inference engine that powers Jan. Nitro is written in C++, optimized for edge deployment.

⚡ Explore Nitro's codebase: [GitHub](https://github.com/janhq/nitro)

## Dependencies and Acknowledgements:

- [llama.cpp](https://github.com/ggerganov/llama.cpp): Nitro wraps Llama.cpp, which runs Llama models in C++
- [drogon](https://github.com/drogonframework/drogon): Nitro runs Drogon, which is a fast, C++17/20 HTTP application framework.
- (Coming soon) tensorrt-llm support.

## Features

In addition to the above features, Nitro also provides:

- OpenAI compatibility
- HTTP interface with no bindings needed
- Runs as a separate process, not interfering with main app processes
- Multi-threaded server supporting concurrent users
- 1-click install
- No hardware dedendencies
- Ships as a small binary (~3mb compressed on average)
- Runs on Windows, MacOS, and Linux
- Compatible with arm64, x86, and NVIDIA GPUs

## HTTP Interface

Nitro offers a straightforward HTTP interface. With compatibility for multiple standard APIs, including OpenAI formats.

```bash
curl --location 'http://localhost:3928/inferences/llamacpp/chat_completion' \
      --header 'Content-Type: application/json' \
      --header 'Accept: text/event-stream' \
      --header 'Access-Control-Allow-Origin: *' \
      --data '{
         "messages": [
            {"content": "Hello there 👋", "role": "assistant"},
            {"content": "Can you write a long story", "role": "user"}
         ],
         "stream": true,
         "model": "gpt-3.5-turbo",
         "max_tokens": 2000
      }'
```

## Using Nitro

**Step 1: Obtain Nitro**:  
Access Nitro binaries from the release page.  
🔗 [Download Nitro](https://github.com/janhq/nitro/releases)

**Step 2: Source a Model**:  
For those interested in the llama C++ integration, obtain a "GGUF" model from The Bloke's repository.  
🔗 [Download Model](https://huggingface.co/TheBloke)

**Step 3: Initialize Nitro**:  
Launch Nitro and position your model using the following API call:

```bash
curl -X POST 'http://localhost:3928/inferences/llamacpp/loadmodel' \
  -H 'Content-Type: application/json' \
  -d '{
    "llama_model_path": "/path/to/your_model.gguf",
    "ctx_len": 2048,
    "ngl": 100,
    "embedding": true
  }'
```

## Architecture diagram

![Nitro Architecture](../developers/img/architecture.png)
