import uuid
import time
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as ml_router

# Configure basic logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("app.main")

app = FastAPI(
    title="BugRisk ML Analytics Service",
    description="Core ML service exposing the FP-Growth association rule mining pipeline and module risk calculations.",
    version="1.0.0"
)

# Enable CORS to allow secure requests from Gateway / Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_correlation_id(request: Request, call_next):
    # Extract request ID from header or generate a new one
    request_id = request.headers.get("x-request-id")
    if not request_id:
        request_id = f"REQ-ML-{uuid.uuid4().hex[:8].upper()}"
    
    # Save request ID in request state
    request.state.correlation_id = request_id
    
    logger.info(f"[{request_id}] Incoming request: {request.method} {request.url.path}")
    
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = (time.perf_counter() - start_time) * 1000
    
    logger.info(f"[{request_id}] Finished processing in {process_time:.2f}ms. Status: {response.status_code}")
    
    response.headers["X-Request-Id"] = request_id
    return response

# Include Router
app.include_router(ml_router, prefix="/api/v1/ml", tags=["ML Platform Core"])

@app.get("/health", tags=["Health Status"])
def health(request: Request):
    """
    Service health check endpoint.
    """
    req_id = getattr(request.state, "correlation_id", "HEALTH")
    return {
        "status": "healthy",
        "service": "ml-service",
        "version": "1.0.0",
        "request_id": req_id
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
